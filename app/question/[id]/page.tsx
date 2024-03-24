"use client";
import QuestionDetails from "@/components/QuestionDetails";
import { useEffect, useState } from "react";
const page = ({ params }) => {
  const [question, setQuestion] = useState<Document | null>(null);

  useEffect(() => {
    async function getQuestion() {
      const response = await fetch(`/api/getquestion?questionId=${params.id}`);
      const { question } = await response.json();
      setQuestion(question);
    }

    getQuestion();
  }, []);
  return <QuestionDetails question={question} />;
};

export default page;
