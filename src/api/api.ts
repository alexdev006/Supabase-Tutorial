import supabase from "../config/supabaseClient";

export const getSmoothies = (orderBy: string) =>
  supabase.from("smoothies").select().order(orderBy, { ascending: false });

export const deleteSmoothy = (id: string) =>
  supabase.from("smoothies").delete().eq("id", id).select();
