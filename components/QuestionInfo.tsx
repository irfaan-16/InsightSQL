import { Badge } from "./ui/badge";

const QuestionInfo = ({ question }) => {
  return (
    <div className="overflow-auto">
      <div className="flex gap-2 items-center mb-4">
        <h1 className="text-3xl font-bold text-zinc-50">{question.title}</h1>
        <Badge className="text-[#25C244]">{question.difficulty}</Badge>
      </div>

      <div className="p-4">
        {question.description.map((group) => {
          return (
            <div key={group._id}>
              <Badge className="p-2 mb-4 rounded-2xl bg-zinc-300">
                {group.groupTitle}
              </Badge>

              <div className="border-x-2 border-purple-800 p-6 mb-6 bg-zinc-900 rounded-md">
                <pre className="text-zinc-400">{group.groupTable}</pre>
                <p className="text-zinc-400">{group.groupDesc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-white">{question.task}</div>

      <div className="px-4">
        {question.examples.map((example, idx) => {
          return (
            <div
              key={example._id}
              className="border-x-2 border-purple-800 p-6 mb-6 bg-zinc-900 rounded-md mt-10"
            >
              <span className="font-bold text-white block mb-4">
                Example {idx + 1}:
              </span>

              <div>
                <Badge className="p-2 mb-4 rounded-2xl bg-zinc-300 min-w-16 justify-center">
                  Input
                </Badge>
                {example.input.map((input) => {
                  return (
                    <div key={input._id}>
                      <Badge className="text-zinc-200 font-bold p-2 bg-zinc-800 rounded-2xl hover:bg-zinc-950">
                        {input.tableName}
                      </Badge>
                      <pre className="text-zinc-400">{input.table}</pre>
                    </div>
                  );
                })}
              </div>
              <div>
                <Badge className="p-2 mb-4 rounded-2xl bg-zinc-300 min-w-16 justify-center">
                  Output
                </Badge>
                <div>
                  <pre className="text-zinc-400">{example.output}</pre>
                </div>
                <div>
                  <p className="text-zinc-400">{example.explanation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionInfo;
