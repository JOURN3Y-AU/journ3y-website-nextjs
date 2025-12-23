export interface AIMonitorQuestionGroup {
  id: string
  name: string
  description: string | null
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface AIMonitorQuestion {
  id: string
  group_id: string
  question: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
  // Joined data
  group?: AIMonitorQuestionGroup
}

export interface AIMonitorRun {
  id: string
  started_at: string
  completed_at: string | null
  status: 'running' | 'completed' | 'failed'
  error_message: string | null
  triggered_by: 'manual' | 'cron'
}

export interface CompetitorMention {
  name: string
  context: string
}

export interface AIMonitorResponse {
  id: string
  run_id: string
  question_id: string
  platform: 'chatgpt' | 'claude' | 'perplexity'
  response_text: string | null
  journ3y_mentioned: boolean
  journ3y_position: number | null
  competitors_mentioned: CompetitorMention[]
  response_time_ms: number | null
  error_message: string | null
  created_at: string
  // Joined data
  question?: AIMonitorQuestion
}

export interface AIMonitorRunWithResponses extends AIMonitorRun {
  responses: AIMonitorResponse[]
}

// Form data types
export interface QuestionGroupFormData {
  name: string
  description: string
  is_active: boolean
}

export interface QuestionFormData {
  group_id: string
  question: string
  is_active: boolean
}

// Summary stats for dashboard
export interface AIMonitorStats {
  totalRuns: number
  lastRunAt: string | null
  journ3yMentionRate: number // percentage
  topCompetitors: { name: string; count: number }[]
  mentionsByPlatform: {
    chatgpt: { mentioned: number; total: number }
    claude: { mentioned: number; total: number }
  }
  mentionsByGroup: {
    groupName: string
    mentioned: number
    total: number
  }[]
}
