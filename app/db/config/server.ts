import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from '@/app/constants'

export const supabaseServiceClient = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {}
)
