import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)
}

// publishable key is safe to expose to the client — access control is enforced by
// Row Level Security policies in Supabase, not by hiding this key.
export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  : null
