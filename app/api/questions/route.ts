import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { questions as localQuestions } from "@/lib/questions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic      = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");
  const examType   = searchParams.get("examType");
  const limit      = searchParams.get("limit");

  const supabase = await createClient();

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

  let query = supabase
    .from("questions")
    .select("*")
    .eq("is_published", true);

  if (topic && topic !== "all") query = query.eq("topic", topic);
  if (topic && topic !== "all") query = query.eq("topic", topic);
  if (difficulty && difficulty !== "all") query = query.eq("difficulty", difficulty);
  if (examType && examType !== "all") query = query.eq("exam_type", examType);
  if (limit) query = query.limit(Number(limit));

  const { data, error } = await query;

  if (!error && data && data.length > 0) {
    return NextResponse.json({ questions: data, total: data.length, source: "supabase" });
  }

  let filtered: any[] = localQuestions;
  if (examType && examType !== "all") filtered = filtered.filter(q => q.examType === examType);
  if (topic && topic !== "all") filtered = filtered.filter(q => q.topic === topic);
  if (difficulty && difficulty !== "all") filtered = filtered.filter(q => q.difficulty === difficulty);
  if (limit) filtered = filtered.slice(0, Number(limit));

  return NextResponse.json({ questions: filtered, total: filtered.length, source: "local" });
}