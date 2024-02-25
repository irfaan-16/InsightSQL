import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/database/mongo";
import Question from "@/lib/models/Question";

export async function GET(req: NextRequest, res: NextResponse) {
  await connect();

  const questions = await Question.find({});
  return new Response(JSON.stringify({ questions }), { status: 200 });
}
