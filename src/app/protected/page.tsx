import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
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
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Protected page
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        You are signed in as{" "}
        <span className="font-mono text-zinc-900 dark:text-zinc-100">
          {user.email ?? user.id}
        </span>
        . Session cookies were refreshed in middleware.
      </p>
      <div className="flex flex-col gap-2 text-sm font-medium">
        <Link
          className="text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          href="/billing"
        >
          Billing
        </Link>
        <Link
          className="text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          href="/premium"
        >
          Premium (gated)
        </Link>
      </div>
      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          Sign out
        </button>
      </form>
      <Link
        href="/"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Home
      </Link>
    </div>
  );
}
