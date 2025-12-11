import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { assertLocale } from "@/lib/i18n";
import DownloadCard from "./DownloadCard";

export const revalidate = 60;

export default async function DownloadsPage(props: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang: rawLang } = await props.params;
  const { category } = await props.searchParams;

  const lang = assertLocale(rawLang); // "tr" | "en"

  // Kategoriler
  const categories = await prisma.downloadCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });

  if (categories.length === 0) {
    return <div>Henüz download kategorisi yok.</div>;
  }

  // category query param geçerliyse onu kullan, yoksa ilk kategoriyi
  const activeCategory =
    category && categories.some((c) => c.slug === category)
      ? category
      : categories[0].slug;

  // Aktif kategoriye göre download kayıtları
  const downloads = await prisma.download.findMany({
    where: {
      category: { slug: activeCategory },
    },
    include: {
      category: true,
      files: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="space-y-6 text-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900">Downloads</h1>

        {/* Tab menüsü */}
        <div className="flex flex-wrap gap-3 border-b pb-3">
          {categories.map((c) => {
            const isActive = c.slug === activeCategory;
            const label = lang === "tr" ? c.labelTr : c.labelEn;

            return (
              <Link
                key={c.id}
                href={`/${lang}/downloads?category=${c.slug}`}
                className={`px-4 py-1 border-b-2 ${
                  isActive
                    ? "border-black font-semibold text-black"
                    : "border-transparent text-gray-500"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Grid */}
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {downloads.map((d) => {
            const categoryLabel =
              lang === "tr" ? d.category?.labelTr : d.category?.labelEn;

            return (
              <DownloadCard
                key={d.id}
                lang={lang}
                categoryLabel={categoryLabel ?? undefined}
                download={{
                  id: d.id,
                  title: d.title,
                  slug: d.slug,
                  thumbnail: d.thumbnail,
                  files: d.files.map((f) => ({
                    id: f.id,
                    filePath: f.filePath,
                    label: f.label,
                  })),
                }}
              />
            );
          })}
        </ul>

        {downloads.length === 0 && (
          <p className="text-sm text-gray-500">
            Bu kategoride henüz download yok.
          </p>
        )}
      </section>
    </div>
  );
}
