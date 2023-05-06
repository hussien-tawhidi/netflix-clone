import Head from "next/head";
import Navbar from "./navbar";

interface layoutProps {
  title: string;
  children: React.ReactNode;
}
export default function Layout({ title, children }: layoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-col overflow-auto">
        <Navbar/>
        {children}
      </main>
    </>
  );
}
