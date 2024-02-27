import QuestionDetails from "@/components/QuestionDetails";
import { getQuestionById } from "@/utils/dbfunctions";

const page = async ({ params }) => {
  const question = await getQuestionById(params.id);
  return <QuestionDetails question={question} />;
};

export default page;
