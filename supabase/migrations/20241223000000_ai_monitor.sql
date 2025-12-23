-- AI Monitor Tables for tracking LLM visibility
-- Run this in your Supabase SQL editor

-- Question Groups (e.g., "Glean", "Small Business AI")
CREATE TABLE IF NOT EXISTS ai_monitor_question_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions to monitor
CREATE TABLE IF NOT EXISTS ai_monitor_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES ai_monitor_question_groups(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Monitor runs (each time we query the LLMs)
CREATE TABLE IF NOT EXISTS ai_monitor_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  error_message TEXT,
  triggered_by TEXT DEFAULT 'manual' CHECK (triggered_by IN ('manual', 'cron'))
);

-- Individual responses from LLMs
CREATE TABLE IF NOT EXISTS ai_monitor_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id UUID REFERENCES ai_monitor_runs(id) ON DELETE CASCADE,
  question_id UUID REFERENCES ai_monitor_questions(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('chatgpt', 'claude', 'perplexity')),
  response_text TEXT,
  journ3y_mentioned BOOLEAN DEFAULT false,
  journ3y_position INTEGER, -- 1st, 2nd, 3rd mention position, null if not mentioned
  competitors_mentioned JSONB DEFAULT '[]'::jsonb, -- Array of {name, context}
  response_time_ms INTEGER,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_ai_monitor_responses_run_id ON ai_monitor_responses(run_id);
CREATE INDEX IF NOT EXISTS idx_ai_monitor_responses_question_id ON ai_monitor_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_ai_monitor_responses_platform ON ai_monitor_responses(platform);
CREATE INDEX IF NOT EXISTS idx_ai_monitor_responses_created_at ON ai_monitor_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_monitor_runs_started_at ON ai_monitor_runs(started_at DESC);

-- Enable RLS
ALTER TABLE ai_monitor_question_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_monitor_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_monitor_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_monitor_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allow authenticated users full access for admin)
CREATE POLICY "Allow authenticated read on question_groups" ON ai_monitor_question_groups
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert on question_groups" ON ai_monitor_question_groups
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on question_groups" ON ai_monitor_question_groups
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on question_groups" ON ai_monitor_question_groups
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read on questions" ON ai_monitor_questions
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert on questions" ON ai_monitor_questions
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on questions" ON ai_monitor_questions
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on questions" ON ai_monitor_questions
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read on runs" ON ai_monitor_runs
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert on runs" ON ai_monitor_runs
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on runs" ON ai_monitor_runs
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated read on responses" ON ai_monitor_responses
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert on responses" ON ai_monitor_responses
  FOR INSERT TO authenticated WITH CHECK (true);

-- Also allow service role for edge functions
CREATE POLICY "Allow service role on question_groups" ON ai_monitor_question_groups
  FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service role on questions" ON ai_monitor_questions
  FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service role on runs" ON ai_monitor_runs
  FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service role on responses" ON ai_monitor_responses
  FOR ALL TO service_role USING (true);

-- Insert default question groups
INSERT INTO ai_monitor_question_groups (name, description, display_order) VALUES
  ('Glean Enterprise', 'Questions about Glean implementation and enterprise search', 1),
  ('Small Business AI', 'Questions about AI solutions for small businesses in Australia', 2);

-- Insert default questions for Glean
INSERT INTO ai_monitor_questions (group_id, question, display_order)
SELECT id, question, display_order FROM ai_monitor_question_groups,
  (VALUES
    ('Who is the best Glean implementation partner in Australia?', 1),
    ('Which companies implement Glean in Australia?', 2),
    ('Who can help deploy Glean enterprise search?', 3),
    ('Glean partners Australia', 4)
  ) AS q(question, display_order)
WHERE name = 'Glean Enterprise';

-- Insert default questions for Small Business AI
INSERT INTO ai_monitor_questions (group_id, question, display_order)
SELECT id, question, display_order FROM ai_monitor_question_groups,
  (VALUES
    ('Who offers AI consulting for small businesses in Australia?', 1),
    ('Best AI solutions for Australian small businesses', 2),
    ('AI automation for tradies Australia', 3),
    ('AI tools for real estate agents Australia', 4)
  ) AS q(question, display_order)
WHERE name = 'Small Business AI';
