import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex gap-2 min-h-screen p-2 w-full">
      <Skeleton className="w-1/4 h-[480px]" />
      <Skeleton className="w-3/4 h-[480px]" />
    </div>
  );
};
export default loading;
