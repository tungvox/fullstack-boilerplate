"use client";

import { Button, type ButtonProps } from "@mantine/core";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export type LinkButtonProps = PropsWithChildren<
  Omit<ButtonProps, "component"> & { href: string }
>;

export function LinkButton({ href, ...props }: LinkButtonProps) {
  return <Button component={Link} href={href} {...props} />;
}
