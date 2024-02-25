import { getQuestions } from "@/utils/dbfunctions";
import QuestionsList from "./QuestionsList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const QuestionsView = async () => {
  const questions = await getQuestions();
  
  //   const questions = [
  //     // {
  //     //   title: "Two sum",
  //     //   description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they
  //     //             add up to target.`,
  //     //   difficulty: "Easy",
  //     // },
  //     {
  //       title: "Duplicate Email",
  //       description: [
  //         {
  //           groupTitle: "Person Table",
  //           groupTable: ` +-------------+---------+
  // | Column Name | Type    |
  // +-------------+---------+
  // | id          | int     |
  // | email       | varchar |
  // +-------------+---------+`,
  //           groupDesc:
  //             "id is the primary key (column with unique values) for this table.Each row of this table contains an email. The emails will not contain uppercase letters.",
  //         },
  //       ],
  //       task: `Write a solution to report all the duplicate emails.
  //              Note that it's guaranteed that the email field is not NULL.
  //             Return the result table in any order. The result format is in the following example.`,
  //       difficulty: "Easy",
  //       examples: [
  //         {
  //           input: [
  //             {
  //               tableName: "Person",
  //               table: `+----+---------+
  // | id | email   |
  // +----+---------+
  // | 1  | a@b.com |
  // | 2  | c@d.com |
  // +----+---------+`,
  //             },
  //           ],
  //           output: `+---------+
  // | email   |
  // +---------+
  // | a@b.com |
  // +---------+`,
  //           explanation:
  //             "this is a random explanation for this question because i'm too busy procrastinating bahahahaahahahah!",
  //         },
  //       ],
  //     },
  //     // {
  //     //   title: "Reverse Integer",
  //     //   description: `Given a signed 32-bit integer x, return x with its digits reversed.`,
  //     //   difficulty: "Easy",
  //     // },

  //     // {
  //     //   title: "Valid Parentheses",
  //     //   description: ` Given a string s containing just the characters '(', ')', ', ', '[' and ']', determine if the input
  //     //             string is valid. An input string is valid if:`,
  //     //   difficulty: "Easy",
  //     // },

  //     // {
  //     //   title: "Longest Substring Without Repeating Characters",
  //     //   description: `Given a string s, find the length of the longest substring without repeating characters.`,
  //     //   difficulty: "Medium",
  //     // },
  //   ];

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
