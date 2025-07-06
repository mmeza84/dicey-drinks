import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error("Missing VITE_SUPABASE_URL environment variable");
}

if (!supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_ANON_KEY environment variable");
}

console.log(
  "Initializing Supabase with URL:",
  supabaseUrl,
  "and Anon Key:",
  supabaseAnonKey
);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
