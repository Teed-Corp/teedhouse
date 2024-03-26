import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://txcvsebaiugmykgejloe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4Y3ZzZWJhaXVnbXlrZ2VqbG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNDc3NzYsImV4cCI6MjAyNTcyMzc3Nn0.mxwJZ3ucSeNhSeRBzQNEavr9oqUEaRdXxxZ9GV8CnJU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
