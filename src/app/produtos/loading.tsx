import { ProductSkeleton } from "@/features/products/ProductSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="h-14 bg-brand-500" />
      <div className="mx-auto max-w-6xl p-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
