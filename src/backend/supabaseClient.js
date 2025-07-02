const { createClient } = require('@supabase/supabase-js');

// Replace with your actual Supabase URL and Anon Key
const supabaseUrl = process.env.SUPABASE_URL || process.env.YOUR_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.YOUR_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === process.env.YOUR_SUPABASE_URL) {
  console.warn("Supabase URL is not set or is using a placeholder. Please set SUPABASE_URL environment variable.");
}

if (!supabaseAnonKey || supabaseAnonKey === process.env.YOUR_SUPABASE_ANON_KEY) {
  console.warn("Supabase Anon Key is not set or is using a placeholder. Please set SUPABASE_ANON_KEY environment variable.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
