import Image from "next/image";
import Link from "next/link";
import { ImageCarousel } from "@/components/home/ImageCarousel";

export const revalidate = 60;

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "tr" },
  ];
}

async function getNewProducts(locale: string) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { assertLocale } = await import("@/lib/i18n");
    const validLocale = assertLocale(locale);

    return await prisma.product.findMany({
      where: {
        active: true,
        category: { slug: "WOOD-GRAIN" },
      },
      include: {
        texts: {
          where: { locale: validLocale },
          select: { title: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
  } catch (error) {
    console.log("Database not available:", error);
    return [];
  }
}

export default async function HomePage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const locale = lang || "en";

  const newProducts = await getNewProducts(locale);

  const heroSlides = [
    {
      src: "/images/home/hero-2.jpg",
      alt: "High-end aesthetic design 1",
      title: "QUALITY WALL PANELS",
      subtitle: "BUILD THE FUTURE",
    },
    {
      src: "/images/home/hero-1.jpg",
      alt: "High-end aesthetic design 2",
      title: "HIGH-END AESTHETIC DESIGN",
      subtitle:
        "INNOVATIVE MATERIALS · RICH TEXTURES FOR MODERN INTERIORS",
    },
    {
      src: "/images/home/hero-3.jpg",
      alt: "High-end aesthetic design 3",
      title: "HIGH-END AESTHETIC DESIGN",
      subtitle:
        "DECORATIVE WALL SOLUTIONS · COMFORTABLE AND ELEGANT SPACES",
    },
  ];

  const newProductSlides = [
    {
      src: "/images/home/new-strip-1.jpg",
      alt: "New product strip 1",
    },
    {
      src: "/images/home/new-strip-2.jpg",
      alt: "New product strip 2",
    },
    {
      src: "/images/home/new-strip-3.jpg",
      alt: "New product strip 3",
    },
  ];

  const scrollingImages = [
    "/images/home/factory-1.jpg",
    "/images/home/factory-2.jpg",
    "/images/home/factory-3.jpg",
    "/images/home/factory-4.jpg",
  ];

  const productCenterItems = [
    {
      key: "wpc",
      label: "WPC WALL PANEL",
      img: "/images/home/pc-wpc.jpg",
      icon: "/images/home/icons/wpc.svg",
      href: `/${locale}/products?category=wood-grain`,
    },
    {
      key: "fluted",
      label: "FLUTED WALL PANEL",
      img: "/images/home/pc-fluted.jpg",
      icon: "/images/home/icons/fluted.svg",
    },
    {
      key: "custom",
      label: "CUSTOM PAINTING",
      img: "/images/home/pc-custom.jpg",
      icon: "/images/home/icons/custom.svg",
    },
    {
      key: "door",
      label: "DOOR",
      img: "/images/home/pc-door.jpg",
      icon: "/images/home/icons/door.svg",
    },
    {
      key: "metal",
      label: "METAL PROFILE",
      img: "/images/home/pc-metal.jpg",
      icon: "/images/home/icons/metal.svg",
    },
    {
      key: "more",
      label: "MORE PRODUCTS",
      img: "/images/home/pc-more.jpg",
      icon: "/images/home/icons/more.svg",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 text-slate-900 overflow-x-hidden">
      <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw]">
        <ImageCarousel slides={heroSlides} variant="hero" />
      </div>

      {/* PRODUCT CENTER – biraz küçültülmüş */}
      <section className="py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-[11px] md:text-xs font-semibold tracking-[0.3em] text-blue-600">
                COLLECTIONS
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                PRODUCT CENTER
              </h2>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600 leading-relaxed">
                Discover wall panels, profiles and custom solutions that bring
                depth and texture to modern interiors.
              </p>
            </div>

            <Link
              href={`/${locale}/products`}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs md:text-sm font-semibold tracking-wide text-white shadow-md shadow-slate-900/20 transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/30 hover:scale-105"
            >
              View All Products
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productCenterItems.map((item) => {
              const cardInner = (
                <>
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
                      <Image
                        src={item.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-xs md:text-sm font-bold tracking-[0.18em] drop-shadow-lg">
                      {item.label}
                    </p>
                  </div>
                </>
              );

              const cardClass =
                "group relative aspect-[16/11] overflow-hidden rounded-2xl bg-black shadow-lg shadow-slate-900/25 hover-lift";

              return item.href ? (
                <Link key={item.key} href={item.href} className={cardClass}>
                  {cardInner}
                </Link>
              ) : (
                <div key={item.key} className={cardClass}>
                  {cardInner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEVAM – diğer bölümler aynı bırakıldı */}
      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] overflow-hidden">
        <div className="relative h-[240px] md:h-[280px] lg:h-[320px]">
          {/* Arka plan fotoğraf */}
          <Image
            src="/images/home/long-banner.jpg"
            alt="Haute couture creates a healthy space"
            fill
            className="object-cover"
            priority={false}
          />

          {/* Hafif karartma */}
          <div className="absolute inset-0 bg-black/35" />

          {/* İçerik */}
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl space-y-3 text-left text-white">
              <p className="text-[10px] md:text-xs tracking-[0.22em] font-medium text-slate-200/90">
                SAVORING THE AESTHETICS OF
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-snug tracking-[0.08em]">
                HAUTE COUTURE CREATES
                <br />
                A HEALTHY SPACE
              </h2>
            </div>

            {/* Sağ taraftaki küçük açıklama (desktop’ta görünsün) */}
            <div className="ml-auto hidden max-w-sm text-right text-[11px] md:block text-slate-200/80 leading-relaxed">
              More patterns create unlimited design possibilities and allow designers
              to shape unique atmospheres for each project.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* NEW PRODUCT banner */}
          <div className="mb-12">
            <Link
              href={`/${locale}/downloads?category=new-products`}
              className="block"
            >
              <ImageCarousel slides={newProductSlides} variant="strip" />
            </Link>
          </div>

          {/* Başlık */}
          <div className="mb-10 flex flex-col items-center text-center space-y-2">
            <p className="text-xs tracking-[0.35em] text-blue-600 font-semibold">
              NEW PRODUCT
            </p>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              RECOMMENDATION
            </h3>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-slate-900" />
          </div>

          {/* Ürün kartları */}
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex min-w-max gap-8 px-2 sm:px-4">
              {newProducts.map((item: any) => {
                const text = item.texts?.[0];
                const label = item.code ?? text?.title ?? item.slug;
                const detailSlug = item.slug ?? item.code ?? "";

                return (
                  <Link
                    key={item.id}
                    href={`/${locale}/products/${encodeURIComponent(detailSlug)}`}
                    className="group w-72 flex-shrink-0 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/10 hover-lift border border-slate-100"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200">
                      {item.thumbnailUrl && (
                        <Image
                          src={item.thumbnailUrl}
                          alt={label}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        NEW
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-50 to-white">
                      <span className="text-sm font-semibold text-slate-800">
                        {label}
                      </span>
                      <span className="text-xl text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600">
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}

              {newProducts.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-12 py-16 text-center">
                  <p className="text-sm text-slate-500">
                    New products will appear here as soon as they are added.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] overflow-hidden">
        <div className="relative h-[500px] md:h-[600px]">
          <Image
            src="/images/home/case-banner.jpg"
            alt="Case banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/20 to-black/35" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                CASE
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Our products are applicable to various industries and numerous
                fields – from residential spaces to commercial projects.
              </p>
              <Link
                href={`/${locale}/cases`}
                className="group inline-flex w-max items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-slate-900 shadow-2xl transition-all duration-300 hover:bg-slate-100 hover:shadow-xl hover:scale-105"
              >
                View More
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-100 to-slate-200 pb-24 pt-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:gap-20 lg:items-start">
          <div className="space-y-6">
            <p className="text-xs font-bold tracking-[0.35em] text-blue-600">
              COMPANY
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              ABOUT
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              Hubei Baijiaxiang New Building Materials Trading Co., Ltd. was
              founded in 2013 and focuses on innovative decorative wall
              solutions.
            </p>
            <Link
              href={`/${locale}/about`}
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:scale-105"
            >
              View More
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="space-y-5 text-sm leading-relaxed text-slate-700 md:text-base">
            <p>
              After decades of intensive and meticulous cultivation, the company
              has developed into a professional and customized group enterprise
              integrating design, R&amp;D, production and marketing services.
            </p>
            <p>
              The production base is located in the national level Hanchuan
              Economic and Technological Development Zone, covering a large area
              with modern workshops and an annual production capacity of
              millions of square meters.
            </p>
            <p>
              Based on international standards, it is an environmentally
              friendly modern factory focusing on sustainable development and
              efficient production.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-2xl shadow-slate-900/40 ring-1 ring-slate-900/10">
              <video
                className="h-full w-full object-cover"
                controls
                poster="/images/home/about-video-poster.jpg"
              >
                <source src="/videos/about.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="overflow-hidden">
            <div className="marquee flex gap-6">
              {[1, 2].map((round) =>
                scrollingImages.map((src, idx) => (
                  <div
                    key={`${round}-${idx}`}
                    className="relative h-48 w-80 flex-shrink-0 overflow-hidden rounded-2xl bg-black shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  >
                    <Image
                      src={src}
                      alt={`Factory ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
