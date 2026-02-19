import type { Metadata } from "next";
import ProductsClient from "./ui/ProductsClient";

export const metadata: Metadata = {
  title: "Produtos | Innovation Brindes",
  description: "Listagem de produtos com busca, favoritos e quick view.",
};

export default function ProdutosPage() {
  return <ProductsClient />;
}
