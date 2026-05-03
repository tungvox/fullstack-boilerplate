import {
  Alert,
  Button,
  Card,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { openCustomerPortal, startCheckout } from "@/app/billing/actions";
import { LinkAnchor } from "@/components/link-anchor";
import { createClient } from "@/lib/supabase/server";
import { isProSubscriptionStatus } from "@/lib/subscription-status";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Billing",
};

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/billing");
  }

  const params = await searchParams;
  const checkout = typeof params.checkout === "string" ? params.checkout : undefined;
  const portal = typeof params.portal === "string" ? params.portal : undefined;

  const { data: subscription } = await supabase
    .from("billing_subscriptions")
    .select("status, price_id, current_period_end, cancel_at_period_end")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: customer } = await supabase
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const isPro = isProSubscriptionStatus(subscription?.status ?? null);
  const hasStripeCustomer = Boolean(customer?.stripe_customer_id);
  const stripeConfigured = Boolean(process.env.STRIPE_PRICE_ID);

  return (
    <Stack maw={720} mx="auto" px="md" py="xl" gap="md">
      <div>
        <Title order={1}>Billing</Title>
        <Text mt={8} size="sm" c="dimmed">
          Stripe Checkout + Customer Portal. Webhooks sync subscription state into
          Supabase (`billing_subscriptions`).
        </Text>
      </div>

      {!stripeConfigured && (
        <Alert color="yellow" variant="light">
          Set <Text span ff="monospace">STRIPE_PRICE_ID</Text> and other Stripe env vars
          (see <Text span ff="monospace">docs/saas-day-one.md</Text> in the repo) to
          enable payments in this environment.
        </Alert>
      )}

      {checkout === "success" && (
        <Alert color="green" variant="light">
          Checkout completed. It can take a few seconds for webhooks to update your
          subscription row — refresh if your status does not flip to active yet.
        </Alert>
      )}

      {checkout === "canceled" && (
        <Alert color="gray" variant="light">Checkout canceled. No charges were made.</Alert>
      )}

      {portal === "missing_customer" && (
        <Alert color="gray" variant="light">
          Start a subscription first so Stripe has a customer record to open in the
          portal.
        </Alert>
      )}

      <Card withBorder shadow="sm" radius="md">
        <Text fw={600}>Subscription</Text>
        <Table mt="sm" withRowBorders={false}>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td c="dimmed">Status</Table.Td>
              <Table.Td ff="monospace" fz="xs">{subscription?.status ?? "none"}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td c="dimmed">Pro access</Table.Td>
              <Table.Td>{isPro ? "yes" : "no"}</Table.Td>
            </Table.Tr>
          {subscription?.current_period_end && (
            <Table.Tr>
              <Table.Td c="dimmed">Renews / ends</Table.Td>
              <Table.Td fz="xs">
                {new Date(subscription.current_period_end).toLocaleString()}
              </Table.Td>
            </Table.Tr>
          )}
          </Table.Tbody>
        </Table>
      </Card>

      <Group>
        <form action={startCheckout}>
          <Button type="submit" disabled={!stripeConfigured}>
            {isPro ? "Manage plan (Checkout)" : "Subscribe with Stripe"}
          </Button>
        </form>

        <form action={openCustomerPortal}>
          <Button
            type="submit"
            variant="default"
            disabled={!hasStripeCustomer || !stripeConfigured}
          >
            Customer portal
          </Button>
        </form>
      </Group>

      <LinkAnchor href="/">← Home</LinkAnchor>
    </Stack>
  );
}
