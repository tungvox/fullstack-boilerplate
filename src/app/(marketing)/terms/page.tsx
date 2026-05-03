import { Alert, Stack, Text, Title } from "@mantine/core";
import { LinkAnchor } from "@/components/link-anchor";

export const metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <Stack maw={900} mx="auto" px="md" py="xl" gap="md">
      <Title order={1}>Terms of service (placeholder)</Title>
      <Alert color="yellow" variant="light">
        Replace this page with enforceable terms before charging customers or opening
        signups broadly.
      </Alert>
      <Text size="sm" c="dimmed">
        Typical contents include acceptable use, warranties, limitation of liability,
        billing and cancellation, and governing law. This stub is not legal advice.
      </Text>
      <LinkAnchor href="/">← Home</LinkAnchor>
    </Stack>
  );
}
