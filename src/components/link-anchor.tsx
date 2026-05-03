"use client";

import { Anchor, type AnchorProps } from "@mantine/core";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export type LinkAnchorProps = PropsWithChildren<
  Omit<AnchorProps, "component"> & { href: string }
>;

export function LinkAnchor({ href, ...props }: LinkAnchorProps) {
  return <Anchor component={Link} href={href} {...props} />;
}
