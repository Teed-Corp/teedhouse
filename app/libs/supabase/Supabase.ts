import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sspqinaqwwlwjnkijchb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcHFpbmFxd3dsd2pua2lqY2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4ODY0OTIsImV4cCI6MjAyOTQ2MjQ5Mn0.Vg8UWweCrQkmWJqyhpyou3rK9XuTMZfseoeDqDaAk64";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
