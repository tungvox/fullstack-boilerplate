import Link from "next/link";

export const metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Terms of service (placeholder)
      </h1>
      <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
        Replace this page with enforceable terms before charging customers or opening
        signups broadly.
      </p>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Typical contents include acceptable use, warranties, limitation of liability,
        billing and cancellation, and governing law. This stub is not legal advice.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Home
      </Link>
    </div>
  );
}
