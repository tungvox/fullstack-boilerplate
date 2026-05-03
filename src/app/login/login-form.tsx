"use client";

import {
  Alert,
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  const errorFromQuery = searchParams.get("error");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage(null);

    const supabase = createClient();
    const origin = window.location.origin;
    const next = searchParams.get("next") ?? "/protected";

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("sent");
    setMessage("Check your email for the sign-in link.");
  }

  return (
    <Paper withBorder shadow="sm" radius="md" p="xl" maw={480} w="100%">
      <Stack gap="md">
        <div>
          <Title order={2}>Sign in</Title>
          <Text size="sm" c="dimmed" mt={4}>
          Magic link via Supabase Auth. Configure email in the Supabase
          dashboard for production.
          </Text>
        </div>

        {(errorFromQuery || (status === "error" && message)) && (
          <Alert color="red" variant="light">
          {message ?? errorFromQuery}
          </Alert>
        )}

        {status === "sent" && message && (
          <Alert color="green" variant="light">
            {message}
          </Alert>
        )}

        <form onSubmit={onSubmit}>
          <Stack gap="md">
            <TextInput
              label="Email"
            type="email"
            required
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            />
            <Button type="submit" disabled={status === "sending" || status === "sent"}>
              {status === "sending" ? "Sending link..." : "Email me a magic link"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}
