// app/[lang]/(public)/cases/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { assertLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const revalidate = 60;

// DİKKAT: params artık Promise, önce await ile açıyoruz
export default async function CaseDetail(props: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await props.params;

  const lang = assertLocale(rawLang);

  if (!slug) {
    notFound();
  }

  console.log("CASE DETAIL slug =", slug);

  const item = await prisma.case.findFirst({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      category: true,
    },
  });

  if (!item) {
    console.log("CASE DETAIL: not found for slug =", slug);
    notFound();
  }

  const [hero, applicationColor, ...realScenes] = item.images;

  return (
    <article className="space-y-8 max-w-5xl mx-auto">
      <header className="space-y-2">
        <p className="text-xs text-gray-400">
          Home » Case » {item.category?.title ?? "Case"}
        </p>
        <h1 className="text-2xl font-semibold">{item.title}</h1>
      </header>

      {hero && (
        <img
          src={hero.imagePath}
          alt={item.title ?? ""}
          className="w-full rounded shadow"
        />
      )}

      {applicationColor && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Application Color</h2>
          <img
            src={applicationColor.imagePath}
            alt={item.title ?? ""}
            className="w-64 h-64 object-cover rounded shadow"
          />
        </section>
      )}

      {realScenes.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Real Scene Case</h2>
          <div className="space-y-6">
            {realScenes.map((img) => (
              <img
                key={img.id}
                src={img.imagePath}
                alt={item.title ?? ""}
                className="w-full rounded shadow"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
