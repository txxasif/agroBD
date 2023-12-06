import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="container flex items-center justify-center  max-w-full space-x-4 space-y-4">
      <div className=" md:gap-5 flex flex-col md:flex-row border  ">
        <Skeleton className="w-[500px] h-[420px]" />
        <div className="space-y-2">
          <Skeleton className="h-[50px] w-[250px]" />
          <Skeleton className="h-[50px] w-[200px]" />
          <Skeleton className="h-[50px] w-[250px]" />
          <Skeleton className="h-[50px] w-[200px]" />
        </div>
      </div>
    </div>
  );
}
