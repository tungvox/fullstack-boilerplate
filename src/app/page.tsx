import { StackBadge } from "@/components/stack-badge";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Fullstack boilerplate
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Next.js, Supabase, and Vercel
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Public home route. Copy `.env.example` to `.env.local`, wire Supabase
          Auth, then try the protected example.
        </p>
      </div>
      <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
        <Link
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          href="/login"
        >
          Sign in
        </Link>
        <Link
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
          href="/protected"
        >
          Protected page
        </Link>
        <Link
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
          href="/billing"
        >
          Billing
        </Link>
      </nav>
      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        <StackBadge />
      </p>
      <footer className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-500">
        <Link className="hover:text-zinc-800 dark:hover:text-zinc-300" href="/privacy">
          Privacy
        </Link>
        <span aria-hidden="true">
          ·
        </span>
        <Link className="hover:text-zinc-800 dark:hover:text-zinc-300" href="/terms">
          Terms
        </Link>
      </footer>
    </div>
  );
}
