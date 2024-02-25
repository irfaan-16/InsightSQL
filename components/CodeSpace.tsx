"use client";
import { Play, Terminal, UploadCloud } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { toast } from "react-toastify";
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
  ];

  const inputRef = useRef<HTMLTextAreaElement>(null);
  let correctOutput = null; //to cache the correct output
  const sessionData = useSession();
  const session: Session | null = sessionData.data as Session | null;

  console.log(ans);
  const evaluateResult = async (toToSubmitted: boolean) => {
    const toastId = toast.loading("Executing your Query...⌛");
    const userQuery = inputRef.current?.value;
    if (userQuery?.trim().length === 0) {
      toast.update(toastId, {
        render: "Query cannot be empty!",
        type: "warning",
        isLoading: false,
        autoClose: 5000,
      });
      return;
    }
    if (containsRestrictedWords(userQuery!, restrictedCommands)) {
      toast.update(toastId, {
        render: "Restricted Command Usage!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      return;
    }
    const response = await fetch("/api/evaluateresult", {
      method: "POST",
      body: JSON.stringify({ query1: ans, query2: userQuery }),
    });

    const { result } = await response.json();

    if (toToSubmitted) {
      const response = await fetch("/api/test", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user?.mongoDbId,
          questionId,
          submittedQuery: inputRef?.current?.value,
          status: result ? "Accepted" : "Rejected",
        }),
      });
    }

    if (result) {
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
  };

  return (
    <div className="px-4">
      <div className="bg-zinc-900 p-2 mb-2 rounded-md flex gap-2 items-center justify-between">
        <div className="flex gap-2">
          <Terminal strokeWidth={2} stroke="#25C244" />
          <h3 className="text-white font-bold">Code</h3>
        </div>
        {session?.user && (
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              className="text-[#25C244] font-bold bg-zinc-800"
              onClick={() => evaluateResult(false)}
            >
              <Play size={18} className="mr-2" />
              Run
            </Button>
            <Button
              variant="ghost"
              className="text-[#25C244] font-bold bg-zinc-800"
              onClick={() => evaluateResult(true)}
            >
              <UploadCloud stroke="#25C244" strokeWidth={2} className="mr-2" />
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
  );
};

export default CodeSpace;
