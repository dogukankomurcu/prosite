// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { triggerRevalidate } from "../src/lib/revalidate"; // prisma klasöründen ../src

const prisma = new PrismaClient();

async function main() {
  // 1) Mevcut ürünler için Inventory aç (0 stokla)
  const products = await prisma.product.findMany({ select: { id: true } });
  for (const p of products) {
    await prisma.inventory.upsert({
      where: { productId: p.id },
      update: {},
      create: { productId: p.id, onHand: 0, reserved: 0 },
    });
  }

  // 2) Örnek locale metni (isteğe bağlı)
  // const anyProduct = await prisma.product.findFirst();
  // if (anyProduct) {
  //   await prisma.localeText.upsert({
  //     where: { locale_productId: { locale: "tr", productId: anyProduct.id } },
  //     update: { title: "Örnek Başlık" },
  //     create: { locale: "tr", title: "Örnek Başlık", productId: anyProduct.id },
  //   });
  // }
}

main()
  .then(async () => {
    // Seed sonrası sayfaları revalidate et
    await triggerRevalidate("/tr/products");
    await triggerRevalidate("/en/products");
    await triggerRevalidate("/tr/cases");
    await triggerRevalidate("/en/cases");
    await triggerRevalidate("/tr/downloads");
    await triggerRevalidate("/en/downloads");
  })
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
