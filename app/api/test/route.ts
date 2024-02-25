import { NextRequest, NextResponse } from "next/server";
import Submission from "@/lib/models/Submission";

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId, questionId, submittedQuery, status } = await req.json();

  try {
    const subExists = await Submission.findOne({ userId });

    if (!subExists) {
      //no previous submission is present for any question
      const newSubmission = await Submission.create({
        userId,
        submissions: [
          {
            questionId,
            submittedQueries: [{ status: status, query: submittedQuery }],
          },
        ],
      });
    } else {
      const subExistsWithSameQuestion = await Submission.findOne({
        //having earlier submissions for the same question
        userId,
        "submissions.questionId": questionId,
      });

      if (subExistsWithSameQuestion) {
        const updatedSubmission = await Submission.findOneAndUpdate(
          {
            userId,
            "submissions.questionId": questionId,
          },
          {
            $push: {
              "submissions.$.submittedQueries": {
                status: status,
                query: submittedQuery,
              },
            },
          },
          { new: true }
        );
        console.log(`userId:${userId}\tquestionId:${questionId}`);
        console.log(updatedSubmission);
      } else {
        const sub = await Submission.findOneAndUpdate(
          {
            userId,
          },
          {
            $push: {
              submissions: {
                questionId,
                submittedQueries: [{ status: status, query: submittedQuery }],
              },
            },
          },
          { new: true }
        );
        console.log(sub);
      }
    }
  } catch (err) {
    console.log(err);
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
