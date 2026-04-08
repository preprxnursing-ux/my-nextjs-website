import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const topic      = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");
  const examType   = searchParams.get("examType");
  const limit      = searchParams.get("limit");
  const access     = searchParams.get("access");

  const supabase = await createClient();

  // Check if user is premium
  const { data: { user } } = await supabase.auth.getUser();
  let userRole = "free";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    userRole = profile?.role ?? "free";
  }

  // Build query
  let query = supabase
    .from("questions")
    .select("*")
    .eq("is_published", true);

  // Free users only get free questions
  if (userRole === "free") {
    query = query.eq("access_level", "free");
  }

  // Optional filters
  if (topic && topic !== "all") {
    query = query.eq("topic", topic);
  }

  if (difficulty && difficulty !== "all") {
    query = query.eq("difficulty", difficulty);
  }

  if (examType && examType !== "all") {
    query = query.eq("exam_type", examType);
  }

  // Limit number of questions
  if (limit) {
    query = query.limit(Number(limit));
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ questions: data, total: data?.length ?? 0 });
}