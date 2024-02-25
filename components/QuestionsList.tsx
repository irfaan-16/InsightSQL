import QuestionTile from "./QuestionTile";

export default async function QuestionsList({ questions }) {
  return (
    <div className="grid w-full gap-4 max-w-4xl">
      {questions?.map((question) => (
        <QuestionTile
          key={question.id}
          title={question.title}
          description={question.description}
          difficulty={question.difficulty}
          id={question.id}
        />
      ))}
    </div>
  );
}
