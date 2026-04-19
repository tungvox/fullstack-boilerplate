import Link from "next/link";

export const metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Privacy (placeholder)
      </h1>
      <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
        Replace this page with your real privacy policy before you collect user data or
        process payments in production.
      </p>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        This boilerplate ships a stub so routes exist on day one. Work with counsel to
        describe data processing, subprocessors, retention, and user rights for your
        product and jurisdictions.
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
