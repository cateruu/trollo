import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.PUBLIC_NEXT_SUPABASE_URL!,
  process.env.PUBLIC_NEXT_SUPABASE_ANON!
);
