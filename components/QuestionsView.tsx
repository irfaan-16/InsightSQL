import { getQuestions } from "@/utils/dbfunctions";
import QuestionsList from "./QuestionsList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NextRequest, NextResponse } from "next/server";

const QuestionsView = async () => {
  let res, req;
  // const questions = await getQuestions();
  const response = await import("../app/api/questions/route");
  const { questions } = await (await response.GET(req, res)).json();

  return (
    <main className="flex flex-col items-center gap-4 p-4 md:gap-8 md:p-10 dark bg-zinc-950 min-h-screen">
      <div>
        <div className="max-w-4xl w-full flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-300">Problems</h1>
          <p className="text-center text-gray-300 dark:text-gray-400">
            Solve the following problems to test your skills. You can filter by
            difficulty or category.
          </p>
        </div>
        <div className="flex w-full items-center gap-4">
          <form className="flex-1">
            <Input className="w-full" placeholder="Search problems..." />
            <Button className="sr-only" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
      <QuestionsList questions={[...questions]} />
    </main>
  );
};

export default QuestionsView;
