import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { assertLocale } from "@/lib/i18n";

export const revalidate = 60;

export default async function CasesPage(props: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang: rawLang } = await props.params;
  const { category } = await props.searchParams;

  const lang = assertLocale(rawLang);

  const categories = await prisma.caseCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });

  if (categories.length === 0) {
    return <div>No categories found.</div>;
  }

  // category query param geçerliyse onu kullan, yoksa ilk kategoriyi
  const activeCategory =
    category && categories.some((c) => c.slug === category)
      ? category
      : categories[0].slug;

  const cases = await prisma.case.findMany({
    where: { category: { slug: activeCategory } },
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
    },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="space-y-6 text-slate-900">
        {/* Tab menüsü */}
        <div className="flex flex-wrap gap-3 border-b pb-3">
          {categories.map((c) => {
            const isActive = c.slug === activeCategory;

            const label =
              lang === "tr"
                ? c.titleTr ?? c.title
                : c.titleEn ?? c.title;

            return (
              <Link
                key={c.id}
                href={`/${lang}/cases?category=${c.slug}`}
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
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cases.map((item) => {
            const img = item.images[0]?.imagePath;
            return (
              <li key={item.id} className="group">
                <Link href={`/${lang}/cases/${item.slug}`}>
                  {img ? (
                    <img
                      src={img}
                      alt={item.title ?? ""}
                      className="w-full h-64 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded" />
                  )}
                  <h2 className="mt-2 text-sm text-gray-800 group-hover:underline">
                    {item.title}
                  </h2>
                </Link>
              </li>
            );
          })}
        </ul>

        {cases.length === 0 && (
          <p className="text-sm text-gray-500">
            Bu kategoride henüz case yok.
          </p>
        )}
      </section>
    </div>
  );
}
