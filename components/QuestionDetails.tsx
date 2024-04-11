import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "./ui/resizable";
import CodeSpace from "./CodeSpace";
import EditorSideView from "./EditorSideView";

const QuestionDetails = ({ question }) => {
  return (
    <div className="bg-zinc-950 max-h-[calc(100vh-100px)] p-8 overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="overflow-auto min-h-[calc(100vh-100px)]"
      >
        <ResizablePanel
          className="max-h-[calc(100vh-116px)] pe-4 overflow-auto mr-2"
          defaultSize={65}
          minSize={30}
          style={{ overflow: "auto" }}
        >
          <EditorSideView question={question} />
        </ResizablePanel>
        <ResizableHandle withHandle className="border-2 border-zinc-800 " />

        <ResizablePanel defaultSize={35} minSize={25}>
          <CodeSpace
            ans={question?.ans}
            questionId={JSON.stringify(question?._id)}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default QuestionDetails;
