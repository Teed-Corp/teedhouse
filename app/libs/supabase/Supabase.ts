import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://skqxzdzkhlqixrlbtkqq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcXh6ZHpraGxxaXhybGJ0a3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNTM3MTQsImV4cCI6MjAyNTcyOTcxNH0.5vI0t8JuwmkpxAe1hzvJj0SiY4uAbGKyImkO0ownUfM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
