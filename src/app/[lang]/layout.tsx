// src/app/[lang]/layout.tsx
import type { ReactNode } from "react";
import Header from "@/components/header";

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Header lang={lang} />

      {/* Tüm sayfalar için arka plan beyaz, genişlik kontrolü sayfanın içinde */}
      <main className="bg-white min-h-[calc(100vh-120px)]">
        {children}
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} ARTSYWALL
        </div>
      </footer>
    </>
  );
}
