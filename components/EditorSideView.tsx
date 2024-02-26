import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Tab from "./Tab";
import QuestionInfo from "./QuestionInfo";
import SubmissionsList from "./SubmissionsList";

const EditorSideView = ({ question }) => {
  return (
    <Tabs defaultValue="description">
      <TabsList className="py-6 px-2 w-full bg-zinc-900 sticky top-0 flex gap-3">
        <TabsTrigger value="description" className="py-2 hover:bg-zinc-800">
          <Tab title="Description" />
        </TabsTrigger>
        <TabsTrigger value="submissions" className="py-2 hover:bg-zinc-800">
          <Tab title="Submissions" />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <QuestionInfo question={question} />
      </TabsContent>
      <TabsContent value="submissions">
        <SubmissionsList questionId={JSON.stringify(question._id)} />
      </TabsContent>
    </Tabs>
  );
};

export default EditorSideView;
