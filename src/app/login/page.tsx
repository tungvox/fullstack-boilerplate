import { LoginForm } from "@/app/login/login-form";
import { Center, Text } from "@mantine/core";
import { Suspense } from "react";

export const metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <Center mih="100vh" px="md" py="xl">
      <Suspense fallback={<Text size="sm" c="dimmed">Loading...</Text>}>
        <LoginForm />
      </Suspense>
    </Center>
  );
}
