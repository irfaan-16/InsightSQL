import { Cpu } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "./ui/resizable";
import CodeSpace from "./CodeSpace";
import EditorSideView from "./EditorSideView";

const QuestionDetails = async ({ question }) => {
  return (
    <main className="bg-zinc-950 max-h-[calc(100vh-100px)] p-8 overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="overflow-auto min-h-[calc(100vh-100px)]"
      >
        <ResizablePanel
          className="max-h-[calc(100vh-116px)] pe-4 overflow-auto mr-2"
          defaultSize={65}
          style={{ overflow: "auto" }}
        >
          <EditorSideView question={question} />
        </ResizablePanel>
        <ResizableHandle withHandle className="border-2 border-zinc-800 " />

        <ResizablePanel defaultSize={35}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={40}>
              <CodeSpace
                ans={question.ans}
                questionId={JSON.stringify(question._id)}
              />
            </ResizablePanel>
            <ResizableHandle withHandle className="border-2 border-zinc-800" />
            <ResizablePanel className="p-6" defaultSize={60}>
              <div className="bg-zinc-900 p-2 mb-2 rounded-md flex gap-2">
                <Cpu stroke="#25C244" strokeWidth={2} />
                <h3 className="text-white font-bold">Execution</h3>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};
export default QuestionDetails;
