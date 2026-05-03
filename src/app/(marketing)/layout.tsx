import { Box } from "@mantine/core";
import type { ReactNode } from "react";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Box mih="100vh">{children}</Box>;
}
