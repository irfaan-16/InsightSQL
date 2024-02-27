import QuestionDetails from "@/components/QuestionDetails";
import Question from "@/lib/models/Question";

const page = async ({ params }) => {
  const question = await Question.findById(params.id);
  return <QuestionDetails question={question} />;
};

export default page;
