"use client";
import QuestionsList from "./QuestionsList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const QuestionsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <main className="flex flex-col items-center gap-4 p-4 md:gap-8 md:p-10 dark bg-zinc-950 min-h-screen">
      <div>
        <div className="max-w-4xl w-full flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-300">Problems</h1>
          <p className="text-center text-gray-300 dark:text-gray-400">
            Solve the following problems to test your skills.
          </p>
        </div>
        <div className="flex w-full items-center gap-4">
          <form className="flex-1">
            <Input
              className="w-full"
              placeholder="Search problems..."
              onChange={(ev) => setSearchQuery(ev.target.value)}
            />
            <Button className="sr-only" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
      <QuestionsList searchQuery={searchQuery} />
    </main>
  );
};

export default QuestionsView;
