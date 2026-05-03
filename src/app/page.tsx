import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <img
          className={styles.invertDark}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          decoding="async"
          fetchPriority="high"
        />
        <ol className={styles.list}>
          <li>
            Get started by editing{" "}
            <code className={styles.code}>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.invertDark}
              src="/vercel.svg"
              alt=""
              width={20}
              height={20}
              decoding="async"
            />
            Deploy now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img aria-hidden src="/file.svg" alt="" width={16} height={16} decoding="async" />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img aria-hidden src="/window.svg" alt="" width={16} height={16} decoding="async" />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img aria-hidden src="/globe.svg" alt="" width={16} height={16} decoding="async" />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
