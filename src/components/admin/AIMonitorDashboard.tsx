'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useAIMonitor } from '@/hooks/useAIMonitor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  ArrowLeft,
  Play,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Eye,
  LogOut
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import type { AIMonitorRunWithResponses } from '@/types/aiMonitor'

interface AIMonitorDashboardProps {
  onLogout: () => void
}

export default function AIMonitorDashboard({ onLogout }: AIMonitorDashboardProps) {
  const {
    questionGroups,
    questions,
    runs,
    stats,
    loading,
    runningMonitor,
    createQuestionGroup,
    updateQuestionGroup,
    deleteQuestionGroup,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    triggerRun,
    refetch
  } = useAIMonitor()

  const [activeTab, setActiveTab] = useState('overview')
  const [chartGroupFilter, setChartGroupFilter] = useState<string>('all')
  const [chartTopN, setChartTopN] = useState<number>(5)
  const [chartViewMode, setChartViewMode] = useState<'daily' | 'all'>('daily')

  // Form states
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupDescription, setNewGroupDescription] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false)

  // Get all competitors with counts (for the dropdown and chart)
  const allCompetitorsRanked = useMemo(() => {
    const competitorCounts: Record<string, number> = {}
    runs.forEach(run => {
      run.responses.forEach(r => {
        if (r.competitors_mentioned && Array.isArray(r.competitors_mentioned)) {
          r.competitors_mentioned.forEach(c => {
            competitorCounts[c.name] = (competitorCounts[c.name] || 0) + 1
          })
        }
      })
    })
    return Object.entries(competitorCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  }, [runs])

  // Build trend chart data from runs
  const trendChartData = useMemo(() => {
    if (runs.length === 0) return []

    // Sort runs by date (oldest first for chart)
    const sortedRuns = [...runs].sort((a, b) =>
      new Date(a.started_at).getTime() - new Date(b.started_at).getTime()
    )

    // Get top N competitors
    const topCompetitors = allCompetitorsRanked.slice(0, chartTopN).map(c => c.name)

    // Helper to process a run's responses
    const processResponses = (responses: typeof sortedRuns[0]['responses']) => {
      // Filter responses by group if needed
      if (chartGroupFilter !== 'all') {
        responses = responses.filter(r => r.question?.group?.id === chartGroupFilter)
      }

      // Count JOURN3Y mentions
      const journ3yMentions = responses.filter(r => r.journ3y_mentioned).length

      // Count competitor mentions
      const competitorMentions: Record<string, number> = {}
      topCompetitors.forEach(name => { competitorMentions[name] = 0 })

      responses.forEach(r => {
        if (r.competitors_mentioned && Array.isArray(r.competitors_mentioned)) {
          r.competitors_mentioned.forEach(c => {
            if (topCompetitors.includes(c.name)) {
              competitorMentions[c.name] = (competitorMentions[c.name] || 0) + 1
            }
          })
        }
      })

      return { journ3yMentions, competitorMentions }
    }

    if (chartViewMode === 'daily') {
      // Group runs by date and take max mentions per brand per day
      const dailyData: Record<string, { JOURN3Y: number; [key: string]: number }> = {}

      sortedRuns.forEach(run => {
        const dateKey = new Date(run.started_at).toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'short'
        })

        const { journ3yMentions, competitorMentions } = processResponses(run.responses)

        if (!dailyData[dateKey]) {
          dailyData[dateKey] = { JOURN3Y: 0 }
          topCompetitors.forEach(name => { dailyData[dateKey][name] = 0 })
        }

        // Take max value for each brand
        dailyData[dateKey].JOURN3Y = Math.max(dailyData[dateKey].JOURN3Y, journ3yMentions)
        topCompetitors.forEach(name => {
          dailyData[dateKey][name] = Math.max(dailyData[dateKey][name], competitorMentions[name] || 0)
        })
      })

      return Object.entries(dailyData).map(([date, data]) => ({
        date,
        ...data
      }))
    } else {
      // Show all runs individually
      return sortedRuns.map(run => {
        const { journ3yMentions, competitorMentions } = processResponses(run.responses)

        return {
          date: new Date(run.started_at).toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          }),
          JOURN3Y: journ3yMentions,
          ...competitorMentions
        }
      })
    }
  }, [runs, chartGroupFilter, chartTopN, allCompetitorsRanked, chartViewMode])

  // Get unique competitor names for chart lines
  const chartCompetitors = useMemo(() => {
    if (trendChartData.length === 0) return []
    const firstDataPoint = trendChartData[0]
    return Object.keys(firstDataPoint).filter(key => key !== 'date' && key !== 'JOURN3Y')
  }, [trendChartData])

  // Generate colors dynamically for any competitor
  const generateColor = (index: number): string => {
    const colors = [
      '#ef4444', '#22c55e', '#f97316', '#3b82f6', '#eab308',
      '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
      '#6366f1', '#14b8a6', '#f43f5e', '#84cc16', '#a855f7',
      '#0ea5e9', '#d946ef', '#fb923c', '#4ade80', '#facc15'
    ]
    return colors[index % colors.length]
  }

  // Chart colors - JOURN3Y is always purple, competitors get dynamic colors
  const getChartColor = (name: string, index: number): string => {
    if (name === 'JOURN3Y') return '#9b87f5'
    return generateColor(index)
  }

  const handleAddGroup = async () => {
    if (!newGroupName.trim()) return
    const success = await createQuestionGroup({
      name: newGroupName,
      description: newGroupDescription,
      is_active: true
    })
    if (success) {
      setNewGroupName('')
      setNewGroupDescription('')
      setIsAddGroupOpen(false)
    }
  }

  const handleAddQuestion = async () => {
    if (!newQuestion.trim() || !selectedGroupId) return
    const success = await createQuestion({
      group_id: selectedGroupId,
      question: newQuestion,
      is_active: true
    })
    if (success) {
      setNewQuestion('')
      setIsAddQuestionOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-journey-purple"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">AI Visibility Monitor</h1>
              <p className="text-sm text-gray-500">Track JOURN3Y mentions across ChatGPT & Claude</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refetch}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={triggerRun}
              disabled={runningMonitor}
              className="bg-gradient-to-r from-journey-purple to-journey-blue"
            >
              {runningMonitor ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Monitor
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Run History</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Runs</CardDescription>
                  <CardTitle className="text-3xl">{stats?.totalRuns || 0}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>JOURN3Y Mention Rate</CardDescription>
                  <CardTitle className="text-3xl text-journey-purple">
                    {stats?.journ3yMentionRate.toFixed(1) || 0}%
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>ChatGPT Mentions</CardDescription>
                  <CardTitle className="text-3xl">
                    {stats?.mentionsByPlatform.chatgpt.mentioned || 0}/{stats?.mentionsByPlatform.chatgpt.total || 0}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Claude Mentions</CardDescription>
                  <CardTitle className="text-3xl">
                    {stats?.mentionsByPlatform.claude.mentioned || 0}/{stats?.mentionsByPlatform.claude.total || 0}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Trend Chart */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mention Trends</CardTitle>
                    <CardDescription>JOURN3Y vs competitors over time</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                      <Button
                        variant={chartViewMode === 'daily' ? 'default' : 'ghost'}
                        size="sm"
                        className={chartViewMode === 'daily' ? 'bg-white shadow-sm' : ''}
                        onClick={() => setChartViewMode('daily')}
                      >
                        Daily
                      </Button>
                      <Button
                        variant={chartViewMode === 'all' ? 'default' : 'ghost'}
                        size="sm"
                        className={chartViewMode === 'all' ? 'bg-white shadow-sm' : ''}
                        onClick={() => setChartViewMode('all')}
                      >
                        All Runs
                      </Button>
                    </div>
                    <Select value={chartTopN.toString()} onValueChange={(val) => setChartTopN(val === 'all' ? allCompetitorsRanked.length : parseInt(val))}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Top brands" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Top 5</SelectItem>
                        <SelectItem value="10">Top 10</SelectItem>
                        <SelectItem value="15">Top 15</SelectItem>
                        <SelectItem value="all">All ({allCompetitorsRanked.length})</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={chartGroupFilter} onValueChange={setChartGroupFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Groups</SelectItem>
                        {questionGroups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {trendChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={trendChartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="JOURN3Y"
                        stroke={getChartColor('JOURN3Y', 0)}
                        strokeWidth={3}
                        dot={{ fill: getChartColor('JOURN3Y', 0), strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      {chartCompetitors.map((competitor, index) => (
                        <Line
                          key={competitor}
                          type="monotone"
                          dataKey={competitor}
                          stroke={getChartColor(competitor, index)}
                          strokeWidth={2}
                          dot={{ fill: getChartColor(competitor, index), strokeWidth: 1, r: 3 }}
                          strokeDasharray="5 5"
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[350px] flex items-center justify-center text-gray-500">
                    <p>Run the monitor multiple times to see trends</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mention by Group */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Mentions by Question Group</CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.mentionsByGroup && stats.mentionsByGroup.length > 0 ? (
                  <div className="space-y-4">
                    {stats.mentionsByGroup.map((group) => (
                      <div key={group.groupName} className="flex items-center gap-4">
                        <div className="w-32 font-medium">{group.groupName}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-journey-purple to-journey-blue h-full rounded-full"
                            style={{
                              width: `${group.total > 0 ? (group.mentioned / group.total) * 100 : 0}%`
                            }}
                          />
                        </div>
                        <div className="w-20 text-sm text-gray-600">
                          {group.mentioned}/{group.total}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No data yet. Run the monitor to see results.</p>
                )}
              </CardContent>
            </Card>

            {/* Latest Run Results */}
            {runs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Latest Run Results</CardTitle>
                  <CardDescription>
                    {new Date(runs[0].started_at).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {runs[0].responses.map((response) => (
                      <div key={response.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={response.platform === 'chatgpt' ? 'default' : 'secondary'}>
                              {response.platform === 'chatgpt' ? 'ChatGPT' : 'Claude'}
                            </Badge>
                            {response.journ3y_mentioned ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Mentioned
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-gray-500">
                                <XCircle className="w-3 h-3 mr-1" />
                                Not Mentioned
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium mb-1">
                            {response.question?.question}
                          </p>
                          {response.competitors_mentioned && response.competitors_mentioned.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {response.competitors_mentioned.map((c, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {c.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Full Response</DialogTitle>
                              <DialogDescription>
                                {response.platform === 'chatgpt' ? 'ChatGPT' : 'Claude'} response to: {response.question?.question}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap text-sm">
                              {response.response_text || 'No response recorded'}
                            </div>
                            {response.error_message && (
                              <div className="mt-2 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                                Error: {response.error_message}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Run History</CardTitle>
                <CardDescription>Previous monitoring runs and their results</CardDescription>
              </CardHeader>
              <CardContent>
                {runs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {runs.map((run) => {
                      const mentionedCount = run.responses.filter(r => r.journ3y_mentioned).length
                      const totalResponses = run.responses.length

                      return (
                        <AccordionItem key={run.id} value={run.id}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-4 w-full pr-4">
                              <div className="flex items-center gap-2">
                                {run.status === 'completed' ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : run.status === 'failed' ? (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                ) : (
                                  <Clock className="w-4 h-4 text-yellow-600 animate-spin" />
                                )}
                                <span className="font-medium">
                                  {new Date(run.started_at).toLocaleDateString()}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  {new Date(run.started_at).toLocaleTimeString()}
                                </span>
                              </div>
                              <div className="flex-1" />
                              <Badge variant="outline">
                                {mentionedCount}/{totalResponses} mentions
                              </Badge>
                              <Badge variant={run.triggered_by === 'cron' ? 'secondary' : 'default'}>
                                {run.triggered_by}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 pt-4">
                              {run.responses.map((response) => (
                                <div
                                  key={response.id}
                                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                                >
                                  <Badge variant={response.platform === 'chatgpt' ? 'default' : 'secondary'}>
                                    {response.platform === 'chatgpt' ? 'GPT' : 'Claude'}
                                  </Badge>
                                  <div className="flex-1 text-sm">
                                    {response.question?.question}
                                  </div>
                                  {response.journ3y_mentioned ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                ) : (
                  <p className="text-gray-500 text-center py-8">No runs yet. Click "Run Monitor" to start.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions">
            <div className="flex justify-end gap-2 mb-4">
              <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Question Group</DialogTitle>
                    <DialogDescription>
                      Create a new category for monitoring questions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="groupName">Group Name</Label>
                      <Input
                        id="groupName"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="e.g., Industry-Specific AI"
                      />
                    </div>
                    <div>
                      <Label htmlFor="groupDescription">Description</Label>
                      <Textarea
                        id="groupDescription"
                        value={newGroupDescription}
                        onChange={(e) => setNewGroupDescription(e.target.value)}
                        placeholder="Optional description"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddGroupOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddGroup}>Create Group</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-journey-purple to-journey-blue">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Question</DialogTitle>
                    <DialogDescription>
                      Add a new question to monitor across AI platforms
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="questionGroup">Question Group</Label>
                      <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                        <SelectContent>
                          {questionGroups.map((group) => (
                            <SelectItem key={group.id} value={group.id}>
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="question">Question</Label>
                      <Textarea
                        id="question"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="e.g., Who is the best AI consultant in Sydney?"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddQuestionOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddQuestion}>Add Question</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-6">
              {questionGroups.map((group) => {
                const groupQuestions = questions.filter((q) => q.group_id === group.id)

                return (
                  <Card key={group.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {group.name}
                            {!group.is_active && (
                              <Badge variant="outline" className="text-gray-500">
                                Inactive
                              </Badge>
                            )}
                          </CardTitle>
                          {group.description && (
                            <CardDescription>{group.description}</CardDescription>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={group.is_active}
                            onCheckedChange={(checked) =>
                              updateQuestionGroup(group.id, { is_active: checked })
                            }
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              if (confirm('Delete this group and all its questions?')) {
                                deleteQuestionGroup(group.id)
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {groupQuestions.length > 0 ? (
                        <div className="space-y-2">
                          {groupQuestions.map((question) => (
                            <div
                              key={question.id}
                              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">{question.question}</div>
                              <Switch
                                checked={question.is_active}
                                onCheckedChange={(checked) =>
                                  updateQuestion(question.id, { is_active: checked })
                                }
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => {
                                  if (confirm('Delete this question?')) {
                                    deleteQuestion(question.id)
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">
                          No questions in this group yet.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}

              {questionGroups.length === 0 && (
                <Card>
                  <CardContent className="py-8">
                    <p className="text-gray-500 text-center">
                      No question groups yet. Create one to get started.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Competitors Tab */}
          <TabsContent value="competitors">
            <Card>
              <CardHeader>
                <CardTitle>Competitor Mentions</CardTitle>
                <CardDescription>
                  Companies mentioned alongside queries about your services
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats?.topCompetitors && stats.topCompetitors.length > 0 ? (
                  <div className="space-y-4">
                    {stats.topCompetitors.map((competitor, index) => (
                      <div key={competitor.name} className="flex items-center gap-4">
                        <div className="w-8 text-center font-bold text-gray-400">
                          {index + 1}
                        </div>
                        <div className="w-40 font-medium">{competitor.name}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-gray-500 h-full rounded-full"
                            style={{
                              width: `${(competitor.count / stats.topCompetitors[0].count) * 100}%`
                            }}
                          />
                        </div>
                        <div className="w-16 text-sm text-gray-600 text-right">
                          {competitor.count} mentions
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No competitor data yet. Run the monitor to see results.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
