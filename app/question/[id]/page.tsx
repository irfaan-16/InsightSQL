import QuestionDetails from "@/components/QuestionDetails";
import { getQuestionById } from "@/utils/dbfunctions";

const page = async ({ params }) => {
  console.log("PARAMS IN [id]", params);
  const question = await getQuestionById(params.id);
  
  const execute = async () => {
    const query1 = "select id,name from student;";
    const query2 = "select * from student;";

    console.log("Executing Your Queries");
    const result = await fetch("/api/comparequeries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query1, query2 }),
    });
    const a = await result.json();
    console.log(a);
  };

  return <QuestionDetails question={question} />;
};

export default page;
