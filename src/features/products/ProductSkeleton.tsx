export function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="p-3">
        <div className="mx-auto h-4 w-24 rounded bg-neutral-200" />
        <div className="mx-auto mt-2 h-3 w-16 rounded bg-neutral-200" />
        <div className="mx-auto mt-4 h-40 w-full rounded bg-neutral-100" />
        <div className="mt-4 h-3 w-full rounded bg-neutral-200" />
        <div className="mt-2 h-3 w-5/6 rounded bg-neutral-200" />
        <div className="mt-4 h-8 w-full rounded bg-neutral-100" />
      </div>
      <div className="h-10 w-full bg-neutral-200" />
    </div>
  );
}
