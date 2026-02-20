import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// Mock do next/image para o jsdom
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt ?? ""} />;
  },
}));
