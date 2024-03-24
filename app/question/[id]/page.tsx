import QuestionDetails from "@/components/QuestionDetails";
import Question from "@/lib/models/Question";

const page = async ({ params }) => {
  async function getQuestion() {
    "use server";
    const question = await Question.findById(params.id);
    return question;
  }

  const question = await getQuestion();
  return <QuestionDetails question={question} />;
};

export default page;
