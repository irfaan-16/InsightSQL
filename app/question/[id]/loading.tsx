import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 flex gap-3 animate-pulse">
      <Skeleton className="min-h-screen flex-[1]" />
      <Skeleton className="min-h-screen flex-[2]" />
    </div>
  );
}
