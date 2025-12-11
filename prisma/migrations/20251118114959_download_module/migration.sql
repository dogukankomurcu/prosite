/*
  Warnings:

  - The primary key for the `Download` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kind` on the `Download` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Download` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Download` table. All the data in the column will be lost.
  - The `id` column on the `Download` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `downloadId` on the `LocaleText` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug,locale]` on the table `Download` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Download` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locale` to the `Download` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Download` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Download` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('TR', 'EN');

-- DropForeignKey
ALTER TABLE "Download" DROP CONSTRAINT "Download_productId_fkey";

-- DropForeignKey
ALTER TABLE "LocaleText" DROP CONSTRAINT "LocaleText_downloadId_fkey";

-- DropIndex
DROP INDEX "Download_slug_key";

-- DropIndex
DROP INDEX "LocaleText_locale_downloadId_key";

-- AlterTable
ALTER TABLE "Download" DROP CONSTRAINT "Download_pkey",
DROP COLUMN "kind",
DROP COLUMN "productId",
DROP COLUMN "url",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "locale" "Locale" NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Download_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LocaleText" DROP COLUMN "downloadId";

-- CreateTable
CREATE TABLE "DownloadCategory" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "labelTr" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DownloadCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DownloadFile" (
    "id" SERIAL NOT NULL,
    "downloadId" INTEGER NOT NULL,
    "label" TEXT,
    "filePath" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DownloadFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DownloadCategory_slug_key" ON "DownloadCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Download_slug_locale_key" ON "Download"("slug", "locale");

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DownloadCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadFile" ADD CONSTRAINT "DownloadFile_downloadId_fkey" FOREIGN KEY ("downloadId") REFERENCES "Download"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
