import SingleQuestionView from "@/components/SingleQuestionView";
const page = ({ params }) => {
  return <SingleQuestionView questionId={params.id} />;
};

export default page;
