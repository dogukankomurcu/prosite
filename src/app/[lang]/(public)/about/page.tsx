// app/[lang]/(public)/about/page.tsx

import Image from "next/image";
import { assertLocale } from "@/lib/i18n";
type Lang = "tr" | "en";
export const revalidate = 60;

const historyItems = [
  {
    year: "2013",
    title: "Reasons For Establishment",
    text: "Environmental-friendly materials as core mission and start of innovation journey.",
  },
  {
    year: "2015",
    title: "Aesthetic Leadership",
    text: "Bamboo charcoal wall panel series leads the same-color aesthetic style.",
  },
  {
    year: "2020",
    title: "Overall Case Consolidation",
    text: "All-color system launched, covering wall and cabinet door integration.",
  },
  {
    year: "2021",
    title: "Assembly Plan",
    text: "Wall assembly solution upgraded with large metal panels and special grilles.",
  },
  {
    year: "2022",
    title: "Strategy Upgrading",
    text: "Door–wall integration service provider role strengthened and product lines enriched.",
  },
  {
    year: "2023",
    title: "International Layout",
    text: "Six major product matrices take shape and open to global market.",
  },
  {
    year: "2024",
    title: "Thousand Cities Take Off",
    text: "New technology park and national operation center come into use.",
  },
];

export default async function AboutPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await props.params;
  const lang = assertLocale(rawLang); // şimdilik kullanmıyoruz, ileride TR/EN içerik için kullanırız

  return (
    <div className="bg-black text-slate-100">
      {/* HERO */}
      <section className="relative h-[260px] md:h-[320px] w-full">
        <Image
          src="/images/about/hero.jpg"
          alt="About hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-10 text-white">
          <p className="text-sm opacity-80 mb-2">Home &gt; About</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-[0.2em]">
            ABOUT
          </h1>
        </div>
      </section>

      {/* COMPANY PROFILE + STATS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-neutral-900 rounded-xl shadow-sm p-6 md:p-10">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-4">
                COMPANY PROFILE
              </h2>
              <div className="h-0.5 w-12 bg-red-500 mb-6" />
              <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                <p>
                  Hubei Baijiaxiang New Building Materials Trading Co., Ltd. is
                  a wholly owned subsidiary of Baijiaxiang Group. With the brand
                  positioning of trendy, creative and application-driven
                  materials, it focuses on new decorative wall solutions.
                </p>
                <p>
                  The company operates multiple centers including R&amp;D, media
                  operation, overseas sales and financial settlement, providing
                  a full-chain solution from design and production to global
                  logistics and after-sales.
                </p>
                <p>
                  Its products are supplied to many countries and regions. The
                  first-phase factory covers about 50,000 m² with modern
                  manufacturing lines dedicated to efficient and sustainable
                  production.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -left-6 h-full w-full border border-slate-200 rounded-lg -z-10" />
              <Image
                src="/images/about/hero.jpg"
                alt="Company building"
                width={640}
                height={480}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-10 border-t border-slate-200 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm">
            <div>
              <div className="text-3xl font-semibold mb-1 text-white">3</div>
              <div className="font-medium text-slate-300">Intelligent factories</div>
            </div>
            <div>
              <div className="text-3xl font-semibold mb-1">20</div>
              <div className="font-medium">Professional production lines</div>
            </div>
            <div>
              <div className="text-3xl font-semibold mb-1">6</div>
              <div className="font-medium">Production bases</div>
            </div>
            <div>
              <div className="text-3xl font-semibold mb-1">180</div>
              <div className="font-medium">
                Acres of science &amp; technology park
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY HISTORY – TIMELINE */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-4 text-white">
            COMPANY HISTORY
            </h2>
            <div className="h-0.5 w-12 bg-red-500 mb-10" />

          {/* Desktop: yatay timeline */}
          <div className="hidden md:block relative">
            <div className="absolute left-0 right-0 top-6 h-[2px] bg-pink-500" />
            <div className="flex justify-between gap-6">
              {historyItems.map((item) => (
                <div key={item.year} className="w-40 text-center">
                  <div className="text-pink-600 font-semibold mb-4">
                    {item.year}
                  </div>
                  <div className="relative mb-4 flex justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-pink-500 bg-white" />
                  </div>
                  <h3 className="text-xs font-semibold mb-2 uppercase text-white">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: dikey liste */}
          <div className="md:hidden space-y-6">
            {historyItems.map((item) => (
              <div key={item.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-pink-600 font-semibold text-sm">
                    {item.year}
                  </span>
                  <span className="mt-1 w-[2px] flex-1 bg-pink-500" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold mb-1 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS DISTRIBUTION */}
      <section className="relative py-16">
        <div className="absolute inset-0">
          <Image
            src="/images/about/distribution-map.jpg"
            alt="Business distribution background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 text-white grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-4">
              BUSINESS DISTRIBUTION
            </h2>
            <div className="h-0.5 w-12 bg-red-500 mb-6" />
            <p className="text-sm leading-relaxed text-slate-100">
              Since its establishment, the company has exported various trendy
              and innovative materials to many regions worldwide, including the
              Americas, Europe, Southeast Asia and the Middle East. Customers
              range from building materials supermarkets and construction
              companies to wholesalers and retailers.
            </p>
            <p className="text-sm leading-relaxed text-slate-100 mt-3">
              The company aims to build long-term cooperative relationships with
              more partners and create shared value.
            </p>
          </div>
          <div className="hidden md:block" />
        </div>
      </section>

      {/* ENTERPRISE STRENGTH */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-4 text-white">
              ENTERPRISE STRENGTH
            </h2>
            <div className="h-0.5 w-12 bg-red-500 mb-6" />
            <p className="text-sm leading-relaxed text-slate-200 mb-6">
              The modern factory is equipped with advanced production and
              storage equipment, and has obtained multiple international
              certifications. It integrates R&amp;D with manufacturing to
              achieve green production and sustainable development.
            </p>

            {/* küçük ikon / metinler – istersen daha sonra gerçek ikon bileşeni bağlarız */}
            <div className="grid gap-6 md:grid-cols-3 text-sm">
              <div>
                <div className="font-semibold mb-1">
                  100,000 m²+ Technology Park
                </div>
                <p className="text-xs text-slate-600">
                  Large-scale industrial base with modern facilities.
                </p>
              </div>
              <div>
                <div className="font-semibold mb-1">
                  6 Self-built Plants
                </div>
                <p className="text-xs text-slate-600">
                  Multiple production bases covering core processes.
                </p>
              </div>
              <div>
                <div className="font-semibold mb-1">
                  Advanced Equipment
                </div>
                <p className="text-xs text-slate-600">
                  High-end lines for stable quality and efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* sağdaki grid görseller */}
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/about/strength-1.jpg"
              alt="Base material factory"
              width={400}
              height={260}
              className="rounded-xl object-cover w-full h-full"
            />
            <Image
              src="/images/about/strength-2.jpg"
              alt="Wall panel factory"
              width={400}
              height={260}
              className="rounded-xl object-cover w-full h-full"
            />
            <Image
              src="/images/about/strength-3.jpg"
              alt="Customized painting factory"
              width={400}
              height={260}
              className="rounded-xl object-cover w-full h-full"
            />
            <Image
              src="/images/about/strength-4.jpg"
              alt="Wooden door factory"
              width={400}
              height={260}
              className="rounded-xl object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* INTERNATIONAL TEST REPORT */}
      <section className="relative py-16 bg-neutral-950">
        <div className="absolute inset-0">
          <Image
            src="/images/about/report-bg.jpg"
            alt="Test report background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-4 text-slate-700">
              INTERNATIONAL TEST REPORT
            </h2>
            <div className="h-0.5 w-12 bg-red-500 mb-6" />
            <ul className="space-y-3 text-sm text-slate-700">
              <li>
                <span className="font-semibold">CE</span> – EU certification
              </li>
              <li>
                <span className="font-semibold">Flame</span> – Flame retardant
                testing report
              </li>
              <li>
                <span className="font-semibold">RoHS</span> – Environmental
                inspection report
              </li>
              <li>
                <span className="font-semibold">Reach</span> – EU regulation
                compliance report
              </li>
              <li>
                <span className="font-semibold">Formaldehyde</span> – Emission
                safety test report
              </li>
            </ul>
          </div>

          <div className="relative h-[260px] md:h-[320px]">
            {/* Sertifika görsellerini serbest yerleştirme – istersen grid’e çevirebilirsin */}
            <Image
              src="/images/about/report-1.jpg"
              alt="Certificate"
              width={220}
              height={300}
              className="absolute left-2 top-0 rounded shadow-md object-contain bg-white"
            />
            <Image
              src="/images/about/report-2.jpg"
              alt="Certificate"
              width={220}
              height={300}
              className="absolute right-4 top-4 rounded shadow-md object-contain bg-white"
            />
            <Image
              src="/images/about/report-3.jpg"
              alt="Certificate"
              width={220}
              height={300}
              className="absolute left-1/2 -translate-x-1/2 bottom-0 rounded shadow-md object-contain bg-white"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
