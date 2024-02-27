"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SubmissionsTile from "./SubmissionTile";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";

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

interface Submission {
  query: string;
  status: string;
  _id: string;
}
const SubmissionsList = ({ questionId }) => {
  console.log(questionId);
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);
  const sessionData = useSession();
  const session: Session | null = sessionData.data as Session | null;
  const userMongoDbID = session?.user?.mongoDbId;
  const toggleSortMode = () => {
    const currentOrder =
      submissions?.[0]?.status === "Accepted" ? "asc" : "desc";
    const newOrder = currentOrder === "asc" ? "desc" : "asc";

    sortList(newOrder);
  };
  const sortList = (order: string) => {
    const sortedArr = [...(submissions || [])]?.sort((a, b) => {
      return order === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    });
    setSubmissions(sortedArr);
  };
  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch("/api/submissions", {
        method: "POST",
        body: JSON.stringify({
          userMongoDbID,
          questionId: JSON.parse(questionId),
        }),
      });
      const { submissions } = await res.json();

      setSubmissions(submissions?.submissions?.[0]?.submittedQueries);
      console.log(submissions?.submissions?.[0]?.submittedQueries);
    };
    fetchSubmissions();
  }, [questionId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-zinc-900 p-2 mb-2">
        <p
          className="flex items-center gap-2 bg-zinc-800 p-2 w-fit rounded-sm cursor-pointer text-[14px] hover:bg-zinc-950 transition-colors select-none"
          onClick={() => toggleSortMode()}
        >
          Status <ArrowDownUp size={16} />
        </p>
      </div>
      {submissions === null ? (
        <>
          <Skeleton className="h-8 mb-2" />
          <Skeleton className="h-8 mb-2" />
          <Skeleton className="h-8 mb-2" />
          <Skeleton className="h-8 mb-2" />
        </>
      ) : submissions === undefined ? (
        <h1 className="text-center text-2xl font-bold mt-5">
          There are no Submisions
        </h1>
      ) : (
        submissions?.map((sub, idx) => {
          return <SubmissionsTile key={sub._id} submission={sub} idx={idx} />;
        })
      )}
    </motion.div>
  );
};

export default SubmissionsList;
