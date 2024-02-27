"use client";
import { Cpu, Loader, Play, Terminal, UploadCloud } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Execution from "./Execution";

import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "./ui/resizable";

interface User {
  name: string;
  email: string;
  avatar: string;
  mongoDbId: string;
}

interface Session {
  user: User;
  expires: string;
}

interface Result {
  columns: [string];
  output: [{}];
}
const containsRestrictedWords = (query: string, restrictedWords: string[]) => {
  const containsRestrictedWord = restrictedWords.some((word) => {
    if (query.toLowerCase().includes(word.toLowerCase())) {
      return true;
    }
    return false;
  });

  return containsRestrictedWord;
};

const CodeSpace = ({ ans, questionId }) => {
  const restrictedCommands = [
    "update",
    "delete",
    "drop",
    "insert",
    "alter",
    "modify",
    "create",
    "rollback",
    "show",
  ];

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [expectedResult, setExpectedResult] = useState<Result | null>(null);
  const [actualResult, setActualResult] = useState<Result | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionData = useSession();
  const session: Session | null = sessionData.data as Session | null;

  const evaluateResult = async (toToSubmitted: boolean) => {
    const toastId = toast.loading("Executing your Query...⌛");
    setIsExecuting(true);

    const userQuery = inputRef.current?.value;
    if (userQuery?.trim().length === 0) {
      toast.update(toastId, {
        render: "Query cannot be empty!",
        type: "warning",
        isLoading: false,
        autoClose: 5000,
      });
      setIsExecuting(false);
      return;
    }
    if (containsRestrictedWords(userQuery!, restrictedCommands)) {
      toast.update(toastId, {
        render: "Restricted Command Usage!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setIsExecuting(false);
      return;
    }
    const response = await fetch("/api/evaluateresult", {
      method: "POST",
      body: JSON.stringify({ query1: ans, query2: userQuery }),
    });

    const { expected, result, isCorrectQuery } = await response.json();
    setExpectedResult(expected);
    setActualResult(result);
    console.log(`Expected:${{ ...expected }}\tResult:${{ ...result }}`);
    console.log(expected);

    if (toToSubmitted) {
      const response = await fetch("/api/test", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user?.mongoDbId,
          questionId: JSON.parse(questionId),
          submittedQuery: inputRef?.current?.value,
          status: isCorrectQuery ? "Accepted" : "Rejected",
        }),
      });
    }

    if (isCorrectQuery) {
      toast.update(toastId, {
        render: `Query ${
          toToSubmitted ? "Submitted" : "Executed"
        } Successfully`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } else {
      toast.update(toastId, {
        render: "Wrong Query",
        type: "error",
        autoClose: 5000,
        isLoading: false,
      });
    }

    setIsExecuting(false);
  };

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={35}>
        <div className="mb-3 px-4">
          <div className="bg-zinc-900 p-2 mb-2 rounded-md flex gap-2 items-center justify-between">
            <div className="flex gap-2">
              <Terminal strokeWidth={2} stroke="#25C244" />
              <h3 className="text-white font-bold">Code</h3>
            </div>
            {session?.user && (
              <div className="flex gap-2 items-center">
                <Button
                  disabled={isExecuting}
                  variant="ghost"
                  className="text-[#25C244] font-bold bg-zinc-800"
                  onClick={() => evaluateResult(false)}
                >
                  {isExecuting ? (
                    <Loader className="animate-spin mr-2" />
                  ) : (
                    <Play size={18} className="mr-2" />
                  )}
                  Run
                </Button>
                <Button
                  disabled={isExecuting}
                  variant="ghost"
                  className="text-[#25C244] font-bold bg-zinc-800"
                  onClick={() => evaluateResult(true)}
                >
                  {isExecuting ? (
                    <Loader className="animate-spin mr-2" />
                  ) : (
                    <UploadCloud stroke="#25C244" className="mr-2" />
                  )}
                  Submit
                </Button>
              </div>
            )}
          </div>
          <Textarea
            ref={inputRef}
            className="min-h-[100px] text-green-500 font-bold outline-none border-none bg-zinc-900 max-h-[150px]"
            id="answer"
            placeholder="Write your MySQL query statement here."
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="border-2 border-zinc-800" />
      <ResizablePanel defaultSize={65}>
        <Execution
          expectedResult={expectedResult}
          actualResult={actualResult}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CodeSpace;
