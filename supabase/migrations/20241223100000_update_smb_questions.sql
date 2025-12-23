-- Update Small Business AI questions with more natural language
-- Deactivate old questions and add new ones that reflect how small business owners actually search

-- Deactivate old Small Business AI questions
UPDATE ai_monitor_questions
SET is_active = false, updated_at = NOW()
WHERE group_id = (SELECT id FROM ai_monitor_question_groups WHERE name = 'Small Business AI');

-- Insert new questions for Small Business AI
INSERT INTO ai_monitor_questions (group_id, question, display_order, is_active)
SELECT id, question, display_order, true FROM ai_monitor_question_groups,
  (VALUES
    ('How do I use AI in my small business?', 1),
    ('Who can help me set up AI for my business in Australia?', 2),
    ('Best AI tools for small business owners', 3),
    ('How can a tradie use AI to save time?', 4),
    ('Best AI consultants in Australia', 5),
    ('Companies that help businesses implement AI', 6),
    ('AI tools for builders Australia', 7),
    ('How can recruiters use AI?', 8),
    ('AI for small business Australia', 9)
  ) AS q(question, display_order)
WHERE name = 'Small Business AI';
