import { getEntitlements } from "@/lib/entitlements";
import Link from "next/link";
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
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Premium
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        You have an active or trialing subscription (
        <span className="font-mono">{entitlements.status}</span>). Replace this page
        with your paid product surface.
      </p>
      <div className="flex flex-col gap-3 text-sm font-medium">
        <Link
          className="text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          href="/billing"
        >
          Manage billing
        </Link>
        <Link
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          href="/protected"
        >
          ← Protected demo
        </Link>
      </div>
    </div>
  );
}
