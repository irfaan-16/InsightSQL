"use client";
import { useEffect, useState } from "react";
import QuestionsView from "./QuestionsView";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch("/api/questions");
      const { questions } = await response.json();
      setQuestions(questions);
    };
    getQuestions();
  }, []);

  return (
    <main>
      <QuestionsView questions={questions} />
    </main>
  );
};

export default HomePage;
