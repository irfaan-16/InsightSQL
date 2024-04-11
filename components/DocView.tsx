import Topic from "@/lib/models/Topic";
import { highlight } from "sql-highlight";

const DocView = async ({ language, topic }) => {
  const pipleline = [
    {
      $match: {
        language,
        name: topic,
      },
    },
    {
      $lookup: {
        from: "sections",
        localField: "sections",
        foreignField: "_id",
        as: "sections",
      },
    },
    {
      $unwind: "$sections",
    },
    {
      $replaceRoot: { newRoot: "$sections" },
    },
  ];
  const sections = await Topic.aggregate(pipleline);

  return (
    <div className="px-4 w-full">
      {sections?.map((section) => {
        return (
          <div key={section._id} className="mb-2 border-b-2 py-8 pl-4">
            <h2 className="text-3xl mb-4">{section.title}</h2>
            <p className="mb-3">{section.desc}</p>
            {(section.snippet ||
              section.snippetTitle ||
              section.snippetDesc) && (
              <div className="p-4  rounded-md shadow-snippet border-[#ffffff08] border-[1px]">
                <h3 className="text-2xl mb-3">{section.snippetTitle}</h3>
                <p className="mb-3">{section.snippetDesc}</p>
                {section.snippet && (
                  <div
                    className="p-4 rounded-md bg-[#15202B]"
                    dangerouslySetInnerHTML={{
                      __html: highlight(section.snippet, {
                        html: true,
                      }),
                    }}
                  ></div>
                )}
              </div>
            )}

            {section.note && (
              <p className="mt-6">
                <span className="text-yellow-500">NOTE :</span> {section.note}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default DocView;
