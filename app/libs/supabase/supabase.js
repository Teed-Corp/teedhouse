import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://obylktnpyqmjrdotwpsy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ieWxrdG5weXFtanJkb3R3cHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzMDIwNjYsImV4cCI6MjAyNDg3ODA2Nn0.0pGF6s0P-CV1ZTBVqYb0vZKYm8lRL43j6fJw9_LfAY4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
