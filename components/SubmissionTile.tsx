import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
const SubmissionsTile = ({ submission, idx }) => {
  return (
    <motion.div
      className="bg-zinc-900 py-2 px-4 rounded-sm mb-2 cursor-pointer flex gap-3 items-center"
      initial={{ y: "100px", scale: 0.5, visibility: "hidden", opacity: 0 }}
      animate={{ y: "0", scale: 1, visibility: "visible", opacity: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <Badge
        className={`${
          submission.status === "Accepted" ? "bg-[#25C244]" : "bg-red-700"
        }  text-zinc-200 hover:bg-zinc-700`}
      >
        {submission.status}
      </Badge>
      <h3>{submission.query}</h3>
    </motion.div>
  );
};

export default SubmissionsTile;
