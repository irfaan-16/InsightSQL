import { NextRequest, NextResponse } from "next/server";
import Submission from "@/lib/models/Submission";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userMongoDbID, questionId } = await req.json();

  //   return new Response(JSON.stringify({ data: [] }), { status: 200 });
  try {
    const submissions = await Submission.findOne(
      { userId: userMongoDbID, "submissions.questionId": questionId },
      {
        _id: 0,
        userId: userMongoDbID,
        submissions: {
          $elemMatch: {
            questionId,
          },
        },
      }
    );
    return new Response(JSON.stringify({ success: true, submissions }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, submissions: false }),
      { status: 404 }
    );
  }
}
