export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function safeNumber(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
