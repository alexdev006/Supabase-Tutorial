import supabase from "../config/supabaseClient";

export const getSmoothies = (orderBy) =>
  supabase.from("smoothies").select().order(orderBy, { ascending: false });

export const deleteSmoothy = (id) =>
  supabase.from("smoothies").delete().eq("id", id).select();
