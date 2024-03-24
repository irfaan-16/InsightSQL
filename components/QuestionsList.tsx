import Link from "next/link";
import QuestionTile from "./QuestionTile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default async function QuestionsList({ questions }) {
  return (
    <Table className="max-w-[90%] m-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Difficulty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions?.map((question) => (
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
}
