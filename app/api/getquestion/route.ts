import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/database/mongo";
import Question, { QuestionDocument } from "@/lib/models/Question";

export async function GET(req: NextRequest, res: NextResponse) {
  connect();

  const { searchParams } = new URL(req.url);
  const questionId = searchParams.get("questionId");
  let questionToBeReturned: QuestionDocument | null;
  try {
    const question = await Question.findById(questionId);
    questionToBeReturned = question;
  } catch (err) {
    console.log(err);
    questionToBeReturned = null;
  }
  return new Response(JSON.stringify({ question: questionToBeReturned }));
}
