import { Skeleton } from "../ui/skeleton";
export function LoadingSkeleton() {
  return (
    <div className="mx-auto w-fit">
      <Skeleton className="h-[250px] w-1/3" />
    </div>
  );
}
