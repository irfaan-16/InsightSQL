import QuestionDetails from "@/components/QuestionDetails";
import Question from "@/lib/models/Question";
import connect from "@/lib/database/mongo";
const page = async ({ params }) => {
  // const getQuestion = async () => {
  //   const questionResponse = await fetch("/api/getquestion", {
  //     body: JSON.stringify({ questionId: params.id }),
  //   });
  //   const question = await questionResponse.json();
  //   return question;
  // };
  async function getQuestion() {
    "use server";
    await connect();
    const question = await Question.findById(params.id);
    return question;
  }

  const question = await getQuestion();
  console.log(question);

  // return <h1>AHAHAHAH{question?.title}</h1>;
  return <QuestionDetails question={question} />;
};

export default page;
