import connect from "@/lib/database/mongo";
import QuestionDetails from "./QuestionDetails";
import Question from "@/lib/models/Question";

async function getQuestion(questionId) {
  await connect();
  const question = await Question.findById(questionId);
  return question;
}

const SingleQuestionView = async ({ questionId }) => {
  const question = await getQuestion(questionId);
  return <QuestionDetails question={question} />;
};

export default SingleQuestionView;
