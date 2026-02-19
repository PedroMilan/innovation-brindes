"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen">
      <div className="h-14 bg-brand-500" />
      <div className="mx-auto max-w-3xl p-6">
        <h2 className="text-lg font-semibold">Ocorreu um erro ao carregar produtos</h2>
        <p className="mt-2 text-sm text-neutral-600">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-4 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
