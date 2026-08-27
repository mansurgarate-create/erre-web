import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://xqhveefwucsiuqppnrrw.supabase.co',
  'sb_publishable_BpuXySQyP6HHZ2NSvalwdw_xrsqB_UL',
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  }
)
