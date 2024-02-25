import { FileBarChart, History } from "lucide-react";

const Tab = ({ title }) => {
  return (
    <div className="flex gap-2 items-center">
      {title === "Description" ? (
        <FileBarChart stroke="#25C244" size={20} />
      ) : (
        <History stroke="#25C244" size={20} />
      )}
      <h3>{title}</h3>
    </div>
  );
};

export default Tab;
