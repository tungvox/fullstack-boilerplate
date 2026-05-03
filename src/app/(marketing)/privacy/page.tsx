import { Alert, Stack, Text, Title } from "@mantine/core";
import { LinkAnchor } from "@/components/link-anchor";

export const metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <Stack maw={900} mx="auto" px="md" py="xl" gap="md">
      <Title order={1}>Privacy (placeholder)</Title>
      <Alert color="yellow" variant="light">
        Replace this page with your real privacy policy before you collect user data or
        process payments in production.
      </Alert>
      <Text size="sm" c="dimmed">
        This boilerplate ships a stub so routes exist on day one. Work with counsel to
        describe data processing, subprocessors, retention, and user rights for your
        product and jurisdictions.
      </Text>
      <LinkAnchor href="/">← Home</LinkAnchor>
    </Stack>
  );
}
