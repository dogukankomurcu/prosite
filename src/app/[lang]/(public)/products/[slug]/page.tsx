// app/[lang]/(public)/products/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertLocale } from "@/lib/i18n";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await prisma.product.findMany({ select: { slug: true } });
  return slugs.flatMap((p) => [
    { lang: "tr", slug: p.slug },
    { lang: "en", slug: p.slug },
  ]);
}

export default async function ProductDetailPage(props: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await props.params;
  const locale = assertLocale(lang);

  // ÜRÜN
  const product = await prisma.product.findFirst({
    where: { slug, active: true },
    include: {
      texts: {
        where: { locale },
        select: { title: true, subtitle: true, description: true },
      },
      category: {
        include: {
          texts: {
            where: { locale },
            select: { title: true },
          },
        },
      },
      applicationImages: {
        orderBy: { sortOrder: "asc" },
      },
      downloads: {
        orderBy: { createdAt: "asc" },
        include: {
          download: true,
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const text = product.texts[0];

  const categoryTitle =
    product.category?.texts[0]?.title ??
    (locale === "tr"
      ? product.category?.nameTr
      : product.category?.nameEn);

  // AYNI KATEGORİDEKİ DİĞER RENKLER
  const siblings = await prisma.product.findMany({
    where: {
      active: true,
      categoryId: product.categoryId,
    },
    include: {
      texts: {
        where: { locale },
        select: { title: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href={`/${lang}/products`}
        className="text-sm underline mb-4 inline-block"
      >
        ← {locale === "tr" ? "Ürünlere geri dön" : "Back to products"}
      </Link>

      {/* Üst blok: ana görsel + metin */}
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          {product.mainImageUrl && (
            <Image
              src={product.mainImageUrl}
              alt={text?.title ?? product.slug}
              width={1000}
              height={1000}
              className="w-full h-auto object-cover"
            />
          )}
        </div>

        <div>
          {categoryTitle && (
            <div className="text-xs uppercase text-gray-400 mb-1">
              {categoryTitle}
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">
            {text?.title ?? product.slug}
          </h1>

          {text?.subtitle && (
            <p className="text-lg text-gray-300 mb-4">{text.subtitle}</p>
          )}

          {text?.description && (
            <p className="text-sm text-gray-200 whitespace-pre-line">
              {text.description}
            </p>
          )}

          {/* BUTON BURAYA TAŞINDI */}
          <div className="mt-6">
            <Link
              href={`/${lang}/contact?product=${encodeURIComponent(
                product.slug,
              )}`}
              className="inline-block px-6 py-3 text-sm font-semibold bg-white text-black"
            >
              {locale === "tr" ? "Satın Al" : "Buy Now"}
            </Link>
          </div>
        </div>
      </div>

      {/* AYNI SERİDEKİ DİĞER RENKLER */}
      {siblings.length > 1 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold mb-3">
            {locale === "tr"
              ? `${categoryTitle} içinde diğer renkler`
              : "More colors in this series"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((p) => {
              const sText = p.texts[0];
              const isActive = p.id === product.id;
              const thumb = p.thumbnailUrl ?? p.mainImageUrl ?? "";
              if (!thumb) return null;

              return (
                <Link
                  key={p.id}
                  href={`/${lang}/products/${p.slug}`}
                  className={`border ${
                    isActive ? "border-white" : "border-gray-600"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={sText?.title ?? p.slug}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover"
                  />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* PRODUCT APPLICATION IMAGES */}
      {product.applicationImages.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            {locale === "tr" ? "Ürün Uygulamaları" : "Product Application"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {product.applicationImages.map((img) => (
              <Image
                key={img.id}
                src={img.imageUrl}
                alt={text?.title ?? product.slug}
                width={1000}
                height={700}
                className="w-full h-auto object-cover"
              />
            ))}
          </div>
        </section>
      )}

      {/* SADECE DOWNLOAD LİSTESİ */}
      {product.downloads.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            {locale === "tr"
              ? "İndirilebilir Dökümanlar"
              : "Download Directory"}
          </h2>

          <ul className="space-y-2">
            {product.downloads.map((pd) => {
              const dl = pd.download;
              if (!dl) return null;

              return (
                <li key={pd.id}>
                  <a
                    href={`/${lang}/downloads/${dl.slug}`}
                    className="underline"
                    target="_blank"
                  >
                    {dl.slug}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
