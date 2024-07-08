import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>Simple Weather App</title>
      </Head>
      <main>
        <div className="bg-[url('./public/background.jpg')] h-screen bg-cover bg-center">
          {children}
        </div>
      </main>
    </div>
  );
}
