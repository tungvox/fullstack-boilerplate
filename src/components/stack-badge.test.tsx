import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StackBadge } from "./stack-badge";

describe("StackBadge", () => {
  it("renders stack label", () => {
    render(<StackBadge />);
    expect(screen.getByTestId("stack-badge")).toHaveTextContent(
      "Next.js + Supabase + Vercel",
    );
  });
});
