"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface Question {
  _id: string;
  title: string;
  task: string;
  description: [{}];
  difficulty: string;
  examples: [{}];
}
const QuestionsList = ({ searchQuery }) => {
  const [questions, setQuestions] = useState<[Question] | []>([]);
  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch("/api/questions");
      const { questions } = await response.json();
      setQuestions(questions);
    };
    getQuestions();
  }, []);

  return (
    <Table className="max-w-[90%] m-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Difficulty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions
          .filter((question) =>
            question.title
              .toLocaleLowerCase()
              .includes(searchQuery.toLowerCase())
          )
          .map((question) => (
            <TableRow className="py-4" key={question._id}>
              <Link href={`/question/${question._id}`} className="contents">
                <TableCell>{question.title}</TableCell>
                <TableCell
                  className={`${
                    question.difficulty === "Easy"
                      ? "text-green-400"
                      : question.difficulty === "Medium"
                      ? "text-orange-400"
                      : "text-red-400"
                  }`}
                >
                  {question.difficulty}
                </TableCell>
              </Link>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default QuestionsList;
