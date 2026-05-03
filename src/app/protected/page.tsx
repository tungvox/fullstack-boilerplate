import { Anchor, Stack, Text, Title } from "@mantine/core";
import { LinkAnchor } from "@/components/link-anchor";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Protected",
};

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/protected");
  }

  return (
    <Stack maw={720} mx="auto" px="md" py="xl" gap="md">
      <Title order={1}>Protected page</Title>
      <Text size="sm" c="dimmed">
        You are signed in as{" "}
        <Text span ff="monospace" c="text">
          {user.email ?? user.id}
        </Text>
        . Session cookies were refreshed in middleware.
      </Text>
      <Stack gap={4}>
        <LinkAnchor href="/billing">Billing</LinkAnchor>
        <LinkAnchor href="/premium">Premium (gated)</LinkAnchor>
      </Stack>
      <form action="/auth/signout" method="post">
        <Anchor component="button" type="submit">
          Sign out
        </Anchor>
      </form>
      <LinkAnchor href="/">← Home</LinkAnchor>
    </Stack>
  );
}
