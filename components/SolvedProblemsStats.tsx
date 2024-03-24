import Question from "@/lib/models/Question";
import Submission from "@/lib/models/Submission";
import mongoose from "mongoose";
import { Progress } from "@/components/ui/progress";

const SolvedProblemsStats = async ({ showFullStats, userId }) => {
  const id = new mongoose.Types.ObjectId(userId);

  const questiondPipleLine = [
    { $group: { _id: "$difficulty", count: { $sum: 1 } } },
    { $group: { _id: null, result: { $push: { k: "$_id", v: "$count" } } } },
    { $replaceRoot: { newRoot: { $arrayToObject: "$result" } } },
  ];
  const submissionsPipleline = [
    { $match: { userId: id } },
    { $unwind: "$submissions" },
    {
      $lookup: {
        from: "questions",
        localField: "submissions.questionId",
        foreignField: "_id",
        as: "questionDetails",
      },
    },
    { $unwind: "$questionDetails" },
    { $match: { "submissions.submittedQueries.status": "Accepted" } },

    {
      $group: {
        _id: "$_id",
        acceptedCount: { $sum: 1 },
        easySolved: {
          $sum: {
            $cond: [{ $eq: ["$questionDetails.difficulty", "Easy"] }, 1, 0],
          },
        },
        mediumSolved: {
          $sum: {
            $cond: [{ $eq: ["$questionDetails.difficulty", "Medium"] }, 1, 0],
          },
        },
        hardSolved: {
          $sum: {
            $cond: [{ $eq: ["$questionDetails.difficulty", "Hard"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalSolved: "$acceptedCount",
        easySolved: 1,
        mediumSolved: 1,
        hardSolved: 1,
      },
    },
  ];

  const questions = await Question.aggregate(questiondPipleLine);

  const userSubmission = await Submission.aggregate(submissionsPipleline);
  console.log(userSubmission, "subs");

  const solvedQuestions = userSubmission[0]?.totalSolved || 0;

  const totalQuestions =
    questions[0].Easy + questions[0].Medium + questions[0].Hard;
  const percentage = (solvedQuestions / totalQuestions) * 100;
  const circumference = 2 * Math.PI * 46; //46 is the radius of the circle
  const dash = circumference * (percentage / 100) + " " + circumference;

  return (
    <div className="flex items-center gap-6 bg-zinc-950 shadow-sm select-none min-w-96 max-w-max py-4 px-8 rounded-md ">
      <div className="border-r-2 border-green-700 pr-5">
        <h3 className="mb-3 text-xl font-bold">Solved Problems</h3>
        <div className="relative max-w-max">
          <svg
            className="h-28 w-28 origin-center -rotate-90 transform"
            viewBox="0 0 100 100"
          >
            <circle
              fill="none"
              cx="50px"
              cy="50px"
              r="46"
              strokeWidth="2"
              strokeLinecap="round"
              stroke="currentColor"
              className="text-gray-4 w-[100px]"
            ></circle>
            <circle
              fill="none"
              cx="50px"
              cy="50px"
              r="46"
              strokeWidth="6"
              strokeLinecap="round"
              stroke="#ffa116"
              className="cursor-pointer drop-shadow-[0_2px_4px_rgba(255,161,22,0.2)]"
              strokeDasharray={dash}
              strokeDashoffset="0"
            ></circle>
          </svg>
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-16">
            <div className="border-b-[3px] border-gray-500 w-full pb-2">
              <h4 className="text-2xl text-center text-green-500">
                {solvedQuestions}
              </h4>
            </div>
            <div className="pt-2">
              <h4 className="text-2xl text-center">{totalQuestions}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-56 max-w-56 flex flex-col gap-4">
        <div>
          <div className="flex justify-between">
            <span className="mb-2 block">Easy</span>
            <div>
              <span className="">{userSubmission[0]?.easySolved || 0} / </span>
              <span>{questions[0].Easy}</span>
            </div>
          </div>
          <Progress
            value={
              (userSubmission.length === 0
                ? 0
                : userSubmission[0]?.easySolved / questions[0].Easy) * 100
            }
            datatype="easy"
            className="bg-green-900"
          />
        </div>

        <div>
          <div className="flex justify-between">
            <span className="mb-2 block">Medium</span>
            <div>
              <span>{userSubmission[0]?.mediumSolved || 0} / </span>
              <span>{questions[0].Medium}</span>
            </div>
          </div>

          <Progress
            value={
              (userSubmission.length === 0
                ? 0
                : userSubmission[0]?.mediumSolved / questions[0].Medium) * 100
            }
            datatype="medium"
            className="bg-orange-900"
          />
        </div>

        <div>
          <div className="flex justify-between">
            <span className="mb-2 block">Hard</span>
            <div>
              <span>{userSubmission[0]?.hardSolved || 0} / </span>
              <span>{questions[0].Hard}</span>
            </div>
          </div>

          <Progress
            value={
              (userSubmission.length === 0
                ? 0
                : userSubmission[0]?.hardSolved / questions[0].Hard) * 100
            }
            datatype="hard"
            className="bg-red-900"
          />
        </div>
      </div>
    </div>
  );
};

export default SolvedProblemsStats;
