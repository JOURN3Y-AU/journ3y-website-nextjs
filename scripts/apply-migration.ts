// Run with: npx tsx scripts/apply-migration.ts
// Applies the SMB migration using Supabase REST API

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function applyMigration() {
  console.log('📦 Applying SMB migration...\n');

  const migrationPath = path.join(__dirname, '../supabase/migrations/20251216000000_smb_industries.sql');
  const sql = fs.readFileSync(migrationPath, 'utf-8');

  // Use the PostgREST RPC endpoint to execute SQL
  // This requires creating an exec_sql function first, OR we use the pg_dump approach

  // Actually, let's use the Supabase SQL API directly
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
    },
    body: JSON.stringify({ sql_query: sql }),
  });

  if (!response.ok) {
    const text = await response.text();
    if (text.includes('function') && text.includes('does not exist')) {
      console.log('⚠️  The exec_sql function does not exist in your database.');
      console.log('\nYou have two options:\n');
      console.log('Option 1: Run "supabase login" then I can use the CLI');
      console.log('Option 2: Copy the SQL below and paste it into Supabase Dashboard → SQL Editor:\n');
      console.log('─'.repeat(60));
      console.log(sql);
      console.log('─'.repeat(60));
      console.log('\nFile location: supabase/migrations/20251216000000_smb_industries.sql');
      return;
    }
    console.error('Error applying migration:', text);
    return;
  }

  console.log('✅ Migration applied successfully!');
}

applyMigration().catch(console.error);
