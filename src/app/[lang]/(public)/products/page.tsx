// src/app/[lang]/(public)/products/page.tsx

import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { assertLocale } from "@/lib/i18n";

export const revalidate = 60;

export default async function ProductsPage(props: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { lang } = await props.params;
  const { category, q } = await props.searchParams;

  const locale = assertLocale(lang); // "tr" | "en"
  const search = q?.trim() || undefined;

  // TÜM PRODUCT CATEGORY'LER
  const categories = await prisma.productCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      texts: {
        where: { locale },
        select: { title: true },
      },
    },
  });

  if (categories.length === 0) {
    return <div className="p-4">Henüz ürün kategorisi yok.</div>;
  }

  // Aktif kategori (slug)
  const activeCategorySlug =
    category && categories.some((c) => c.slug === category)
      ? category
      : categories[0]!.slug;

  // ÜRÜNLER (kategori + arama birlikte)
  const items = await prisma.product.findMany({
    where: {
      active: true,
      ...(activeCategorySlug
        ? { category: { slug: activeCategorySlug } }
        : {}),
      ...(search && {
        OR: [
          {
            code: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            slug: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            texts: {
              some: {
                locale,
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      }),
    },
    include: {
      texts: {
        where: { locale },
        select: { title: true, subtitle: true },
      },
      category: {
        include: {
          texts: {
            where: { locale },
            select: { title: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-black text-slate-100">
      <section className="max-w-6xl mx-auto px-4 py-10">
        {/* CATEGORY TABS + SEARCH */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const catTitle =
                cat.texts[0]?.title ??
                (locale === "tr" ? cat.nameTr : cat.nameEn);

              const isActive = cat.slug === activeCategorySlug;

              return (
                <Link
                  key={cat.id}
                  href={`/${locale}/products?category=${encodeURIComponent(
                    cat.slug,
                  )}`}
                  className={`px-4 py-2 text-xs border ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {catTitle}
                </Link>
              );
            })}
          </div>

          {/* SEARCH BAR */}
          <form
            className="flex items-center gap-2"
            action={`/${locale}/products`}
          >
            {activeCategorySlug && (
              <input
                type="hidden"
                name="category"
                value={activeCategorySlug}
              />
            )}
            <input
              name="q"
              defaultValue={search ?? ""}
              placeholder={locale === "tr" ? "Ara" : "Search"}
              className="h-9 rounded border border-slate-600 bg-black px-3 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
            <button
              type="submit"
              className="h-9 px-3 text-xs border border-slate-600 rounded bg-slate-900 hover:bg-slate-800"
            >
              {locale === "tr" ? "Bul" : "Search"}
            </button>
          </form>
        </div>

        {/* SEARCH RESULT LABEL */}
        {search && (
          <p className="mb-4 text-xs text-slate-400">
            {locale === "tr" ? "Arama sonucu:" : "Search result:"}{" "}
            <span className="font-semibold text-white">{search}</span>
          </p>
        )}

        {/* PRODUCT GRID */}
        {items.length === 0 ? (
          <div className="mt-10 text-sm text-slate-300">
            {locale === "tr"
              ? "Bu kriterlere uygun ürün bulunamadı."
              : "No products found for this filter."}
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {items.map((item) => {
              const text = item.texts[0];

              // Kart altında gösterilecek isim (FT 25802 gibi)
              const label = item.code ?? text?.title ?? item.slug;

              // Detay sayfası linki: eski sürümün uyumu için slug tercih
              const detailSlug = item.slug ?? item.code ?? "";

              return (
                <Link
                  key={item.id}
                  href={`/${locale}/products/${encodeURIComponent(
                    detailSlug,
                  )}`}
                  className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-slate-500 transition"
                >
                  <div className="aspect-square relative">
                    {item.thumbnailUrl && (
                      <Image
                        src={item.thumbnailUrl}
                        alt={label}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="px-3 py-2 flex items-center justify-between text-xs bg-neutral-950">
                    <span>{label}</span>
                    <span className="opacity-60">›</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
