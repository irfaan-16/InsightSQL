import Topic from "@/lib/models/Topic";
import connect from "@/lib/database/mongo";
import DocView from "@/components/DocView";
import Link from "next/link";

const page = async ({ params }) => {
  connect();
  const language = params.language;
  const topics = await Topic.find({ language });
  console.log(topics);

  return (
    <section className="flex gap-4 p-4 max-h-[calc(100vh-90px)] overflow-y-scroll">
      {topics.length > 0 ? (
        <>
          <div className="sticky top-0 overflow-y-auto min-w-60 pr-2">
            <h2 className="p-2 bg-zinc-900 rounded-md sticky top-0 font-bold">
              {language.toUpperCase()} Tutorial
            </h2>
            <div className="mt-2 w-full">
              {topics.map((topic, idx) => (
                <Link href={`/docs/${language}/${topic.name}`} key={idx}>
                  <h4
                    className={`cursor-pointer bg-zinc-900 p-2 rounded-sm mb-1 text-sm`}
                  >
                    {topic.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
          <DocView language={language} topic={params.topic} />
        </>
      ) : (
        <h1 className="margin-auto text-4xl">Resource Not Found</h1>
      )}
    </section>
  );
};

export default page;
