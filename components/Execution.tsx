import { Cpu } from "lucide-react";
import Table from "./Table";

const Execution = ({ expectedResult, actualResult }) => {
  return (
    <div className="px-4 mt-4">
      <div className="bg-zinc-900 p-2 mb-2 rounded-md flex gap-2 ">
        <Cpu stroke="#25C244" strokeWidth={2} />
        <h3 className="text-white font-bold">Execution</h3>
      </div>

      <div className="flex flex-wrap gap-10 px-3 overflow-scroll max-h-[250px]">
        {expectedResult && (
          <Table table={expectedResult} title="Expected Output" />
        )}
        {actualResult && <Table table={actualResult} title="Your Output" />}
      </div>
    </div>
  );
};

export default Execution;
