import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

const QuestionTile = ({ title, description, difficulty, id }) => {
  return (
    <Link href={`/question/${id}`}>
      <Card className="cursor-pointer">
        <CardHeader className="flex flex-row items-center gap-4 ">
          <div className="grid gap-1">
            <CardTitle>{title}</CardTitle>
            {/* <CardDescription>{description}</CardDescription> */}
          </div>
          <Badge className="ms-auto">{difficulty}</Badge>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default QuestionTile;
