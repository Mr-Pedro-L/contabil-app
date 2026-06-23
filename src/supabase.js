import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jibvmeipxgmsficqkexz.supabase.co";
const supabaseKey = "sb_publishable_8DRiv1WS-F4u59dZHGtUWw_DpqejlSI";

export const supabase = createClient(supabaseUrl, supabaseKey);
