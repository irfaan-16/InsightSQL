"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SubmissionsTile from "./SubmissionTile";

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
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);
  const sessionData = useSession();
  const session: Session | null = sessionData.data as Session | null;
  const userMongoDbID = session?.user?.mongoDbId;

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch("/api/submissions", {
        method: "POST",
        body: JSON.stringify({ userMongoDbID, questionId }),
      });
      const { submissions } = await res.json();

      setSubmissions(submissions?.submissions?.[0]?.submittedQueries);
      console.log(submissions?.submissions?.[0]?.submittedQueries);
    };
    fetchSubmissions();
  }, [questionId]);

  return (
    <div>
      {submissions === undefined ? (
        <h1 className="text-center text-2xl font-bold mt-5">
          There are no Submisions
        </h1>
      ) : (
        submissions?.map((sub) => {
          return <SubmissionsTile key={sub._id} submission={sub} />;
        })
      )}
    </div>
  );
};

export default SubmissionsList;
