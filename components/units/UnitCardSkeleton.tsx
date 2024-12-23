import { Skeleton } from "@/components/ui/skeleton";

export default function UnitCardSkeleton() {
  return (
    <div className="bg-primaryDark w-fit min-w-[250px] p-4 rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24 bg-white/20" />
        <Skeleton className="h-4 w-16 bg-white/20" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-4 w-32 bg-white/20" />
        <Skeleton className="h-4 w-28 bg-white/20" />
      </div>
      <Skeleton className="h-9 w-full bg-white/20" />
    </div>
  );
}
