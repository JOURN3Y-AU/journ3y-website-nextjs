'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase as supabaseClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import type {
  AIMonitorQuestionGroup,
  AIMonitorQuestion,
  AIMonitorRunWithResponses,
  AIMonitorStats,
  QuestionGroupFormData,
  QuestionFormData
} from '@/types/aiMonitor'

// Type bypass for new tables not yet in generated types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabase = supabaseClient as any

export function useAIMonitor() {
  const [questionGroups, setQuestionGroups] = useState<AIMonitorQuestionGroup[]>([])
  const [questions, setQuestions] = useState<AIMonitorQuestion[]>([])
  const [runs, setRuns] = useState<AIMonitorRunWithResponses[]>([])
  const [stats, setStats] = useState<AIMonitorStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [runningMonitor, setRunningMonitor] = useState(false)
  const { toast } = useToast()

  // Fetch question groups
  const fetchQuestionGroups = useCallback(async () => {
    const { data, error } = await supabase
      .from('ai_monitor_question_groups')
      .select('*')
      .order('display_order')

    if (error) {
      console.error('Error fetching question groups:', error)
      return
    }
    setQuestionGroups(data || [])
  }, [])

  // Fetch questions with their groups
  const fetchQuestions = useCallback(async () => {
    const { data, error } = await supabase
      .from('ai_monitor_questions')
      .select(`
        *,
        group:ai_monitor_question_groups(*)
      `)
      .order('display_order')

    if (error) {
      console.error('Error fetching questions:', error)
      return
    }
    setQuestions(data || [])
  }, [])

  // Fetch recent runs with responses
  const fetchRuns = useCallback(async (limit = 10) => {
    const { data: runsData, error: runsError } = await supabase
      .from('ai_monitor_runs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(limit)

    if (runsError) {
      console.error('Error fetching runs:', runsError)
      return
    }

    if (!runsData || runsData.length === 0) {
      setRuns([])
      return
    }

    // Fetch responses for these runs
    const runIds = runsData.map(r => r.id)
    const { data: responsesData, error: responsesError } = await supabase
      .from('ai_monitor_responses')
      .select(`
        *,
        question:ai_monitor_questions(
          *,
          group:ai_monitor_question_groups(*)
        )
      `)
      .in('run_id', runIds)

    if (responsesError) {
      console.error('Error fetching responses:', responsesError)
      return
    }

    // Combine runs with their responses
    const runsWithResponses: AIMonitorRunWithResponses[] = runsData.map(run => ({
      ...run,
      responses: (responsesData || []).filter(r => r.run_id === run.id)
    }))

    setRuns(runsWithResponses)
  }, [])

  // Calculate stats from runs
  const calculateStats = useCallback(() => {
    if (runs.length === 0) {
      setStats(null)
      return
    }

    const allResponses = runs.flatMap(r => r.responses)
    const totalResponses = allResponses.length
    const mentionedResponses = allResponses.filter(r => r.journ3y_mentioned).length

    // Count competitors
    const competitorCounts: Record<string, number> = {}
    allResponses.forEach(r => {
      if (r.competitors_mentioned && Array.isArray(r.competitors_mentioned)) {
        r.competitors_mentioned.forEach(c => {
          competitorCounts[c.name] = (competitorCounts[c.name] || 0) + 1
        })
      }
    })

    const topCompetitors = Object.entries(competitorCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Mentions by platform
    const chatgptResponses = allResponses.filter(r => r.platform === 'chatgpt')
    const claudeResponses = allResponses.filter(r => r.platform === 'claude')

    // Mentions by group
    const groupStats: Record<string, { mentioned: number; total: number; groupName: string }> = {}
    allResponses.forEach(r => {
      const groupName = r.question?.group?.name || 'Unknown'
      if (!groupStats[groupName]) {
        groupStats[groupName] = { mentioned: 0, total: 0, groupName: groupName }
      }
      groupStats[groupName].total++
      if (r.journ3y_mentioned) {
        groupStats[groupName].mentioned++
      }
    })

    setStats({
      totalRuns: runs.length,
      lastRunAt: runs[0]?.started_at || null,
      journ3yMentionRate: totalResponses > 0 ? (mentionedResponses / totalResponses) * 100 : 0,
      topCompetitors,
      mentionsByPlatform: {
        chatgpt: {
          mentioned: chatgptResponses.filter(r => r.journ3y_mentioned).length,
          total: chatgptResponses.length
        },
        claude: {
          mentioned: claudeResponses.filter(r => r.journ3y_mentioned).length,
          total: claudeResponses.length
        }
      },
      mentionsByGroup: Object.values(groupStats)
    })
  }, [runs])

  // Initial fetch
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      await Promise.all([fetchQuestionGroups(), fetchQuestions(), fetchRuns()])
      setLoading(false)
    }
    fetchAll()
  }, [fetchQuestionGroups, fetchQuestions, fetchRuns])

  // Recalculate stats when runs change
  useEffect(() => {
    calculateStats()
  }, [runs, calculateStats])

  // CRUD for Question Groups
  const createQuestionGroup = async (data: QuestionGroupFormData) => {
    const { error } = await supabase
      .from('ai_monitor_question_groups')
      .insert({
        name: data.name,
        description: data.description || null,
        is_active: data.is_active,
        display_order: questionGroups.length
      })

    if (error) {
      toast({ title: 'Error', description: 'Failed to create question group', variant: 'destructive' })
      return false
    }

    toast({ title: 'Success', description: 'Question group created' })
    await fetchQuestionGroups()
    return true
  }

  const updateQuestionGroup = async (id: string, data: Partial<QuestionGroupFormData>) => {
    const { error } = await supabase
      .from('ai_monitor_question_groups')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      toast({ title: 'Error', description: 'Failed to update question group', variant: 'destructive' })
      return false
    }

    toast({ title: 'Success', description: 'Question group updated' })
    await fetchQuestionGroups()
    return true
  }

  const deleteQuestionGroup = async (id: string) => {
    const { error } = await supabase
      .from('ai_monitor_question_groups')
      .delete()
      .eq('id', id)

    if (error) {
      toast({ title: 'Error', description: 'Failed to delete question group', variant: 'destructive' })
      return false
    }

    toast({ title: 'Success', description: 'Question group deleted' })
    await Promise.all([fetchQuestionGroups(), fetchQuestions()])
    return true
  }

  // CRUD for Questions
  const createQuestion = async (data: QuestionFormData) => {
    const groupQuestions = questions.filter(q => q.group_id === data.group_id)
    const { error } = await supabase
      .from('ai_monitor_questions')
      .insert({
        group_id: data.group_id,
        question: data.question,
        is_active: data.is_active,
        display_order: groupQuestions.length
      })

    if (error) {
      toast({ title: 'Error', description: 'Failed to create question', variant: 'destructive' })
      return false
    }

    toast({ title: 'Success', description: 'Question created' })
    await fetchQuestions()
    return true
  }

  const updateQuestion = async (id: string, data: Partial<QuestionFormData>) => {
    const { error } = await supabase
      .from('ai_monitor_questions')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      toast({ title: 'Error', description: 'Failed to update question', variant: 'destructive' })
      return false
    }

    toast({ title: 'Success', description: 'Question updated' })
    await fetchQuestions()
    return true
  }

  const deleteQuestion = async (id: string) => {
    const { error } = await supabase
      .from('ai_monitor_questions')
      .delete()
      .eq('id', id)

    if (error) {
      toast({ title: 'Error', description: 'Failed to delete question', variant: 'destructive' })
      return false
    }

    toast({ title: 'Success', description: 'Question deleted' })
    await fetchQuestions()
    return true
  }

  // Trigger a monitor run
  const triggerRun = async () => {
    setRunningMonitor(true)
    try {
      const response = await fetch('/api/ai-monitor/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) {
        throw new Error('Failed to trigger monitor run')
      }

      const result = await response.json()
      toast({ title: 'Success', description: 'Monitor run started' })

      // Poll for completion
      const pollInterval = setInterval(async () => {
        await fetchRuns()
        const latestRun = runs[0]
        if (latestRun && latestRun.status !== 'running') {
          clearInterval(pollInterval)
          setRunningMonitor(false)
        }
      }, 5000)

      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(pollInterval)
        setRunningMonitor(false)
      }, 300000)

      return result
    } catch (error) {
      console.error('Error triggering run:', error)
      toast({ title: 'Error', description: 'Failed to start monitor run', variant: 'destructive' })
      setRunningMonitor(false)
      return null
    }
  }

  const refetch = async () => {
    setLoading(true)
    await Promise.all([fetchQuestionGroups(), fetchQuestions(), fetchRuns()])
    setLoading(false)
  }

  return {
    // Data
    questionGroups,
    questions,
    runs,
    stats,
    loading,
    runningMonitor,
    // Question Group operations
    createQuestionGroup,
    updateQuestionGroup,
    deleteQuestionGroup,
    // Question operations
    createQuestion,
    updateQuestion,
    deleteQuestion,
    // Run operations
    triggerRun,
    refetch
  }
}
