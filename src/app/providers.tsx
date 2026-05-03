"use client";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
  );
}
