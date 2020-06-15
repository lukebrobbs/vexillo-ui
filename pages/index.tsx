import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Vexillo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/application">Application</Link>
      </main>
    </div>
  );
}
