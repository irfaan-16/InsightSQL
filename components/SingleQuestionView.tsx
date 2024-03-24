"use client";
import { useState, useEffect } from "react";
import QuestionDetails from "./QuestionDetails";
const SingleQuestionView = ({ questionId }) => {
  const [question, setQuestion] = useState<Document | null>(null);

  useEffect(() => {
    async function getQuestion() {
      const response = await fetch(
        `/api/getquestion?questionId=${questionId.id}`
      );
      const { question } = await response.json();
      setQuestion(question);
    }

    getQuestion();
  }, []);
  return <QuestionDetails question={question} />;
};

export default SingleQuestionView;
