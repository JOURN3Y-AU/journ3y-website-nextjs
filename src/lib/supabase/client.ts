import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/integrations/supabase/types'

// Create a singleton instance for client-side usage
let supabaseInstance: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  if (supabaseInstance) return supabaseInstance

  supabaseInstance = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return supabaseInstance
}

// Export a convenience singleton for components
export const supabase = createClient()
