import { Stack, Text, Title } from "@mantine/core";
import { LinkAnchor } from "@/components/link-anchor";
import { getEntitlements } from "@/lib/entitlements";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Premium",
};

export default async function PremiumPage() {
  const entitlements = await getEntitlements();

  if (!entitlements.authenticated) {
    redirect("/login?next=/premium");
  }

  if (!entitlements.isPro) {
    redirect("/billing?reason=premium");
  }

  return (
    <Stack maw={720} mx="auto" px="md" py="xl" gap="md">
      <Title order={1}>Premium</Title>
      <Text size="sm" c="dimmed">
        You have an active or trialing subscription (
        <Text span ff="monospace" c="text">
          {entitlements.status}
        </Text>
        ). Replace this page with your paid product surface.
      </Text>
      <Stack gap={6}>
        <LinkAnchor href="/billing">Manage billing</LinkAnchor>
        <LinkAnchor href="/protected">← Protected demo</LinkAnchor>
      </Stack>
    </Stack>
  );
}
