import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/shared/types/product";
import { vi } from "vitest";

describe("ProductCard", () => {
  it("renderiza nome/código e chama onQuickView ao clicar em CONFIRA", async () => {
    const user = userEvent.setup();

    const product: Product = {
      codigo: "3419",
      nome: "COPO PLÁSTICO 700ML",
      referencia: "10151373419",
      codigo_categoria: "1015137",
      imagem: "https://example.com/image.jpg",
      preco: "4.59",
      descricao: "copo plástico 700ml",
    };

    const onQuickView = vi.fn();
    const onToggleFavorite = vi.fn();

    render(
      <ProductCard
        product={product}
        onQuickView={onQuickView}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    expect(screen.getByText("COPO PLÁSTICO 700ML")).toBeInTheDocument();
    expect(screen.getByText("3419")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /confira/i });
    await user.click(button);

    expect(onQuickView).toHaveBeenCalledTimes(1);
    expect(onQuickView).toHaveBeenCalledWith(product);
  });
});
