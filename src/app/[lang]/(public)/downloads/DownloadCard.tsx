// src/app/[lang]/(public)/downloads/DownloadCard.tsx

"use client";

import { useState } from "react";

type DownloadFile = {
  id: number;
  filePath: string;
  label: string | null;
};

type DownloadCardProps = {
  lang: "tr" | "en";
  categoryLabel?: string;
  download: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    files: DownloadFile[];
  };
};

export default function DownloadCard({
  lang,
  categoryLabel,
  download,
}: DownloadCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = (tr: string, en: string) => (lang === "tr" ? tr : en);

  const handleSubmit = async () => {
    if (!password) {
      alert(t("Lütfen şifre girin.", "Please enter password."));
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`/api/downloads/${download.id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        alert(
          t(
            "Wrong password, lütfen satış ekibimizle iletişime geçin.",
            "Wrong password, Please contact our sales to obtain password."
          )
        );
        return;
      }

      const data: { url: string } = await res.json();

      // public altındaki PDF dosyasına yönlendir → indirme başlar
      window.open(data.url, "_blank", "noopener,noreferrer");

      setShowModal(false);
      setPassword("");
    } catch (error) {
      alert(
        t(
          "Bir hata oluştu, lütfen daha sonra tekrar deneyin.",
          "Something went wrong, please try again later."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <li className="group rounded-lg border border-gray-800 p-3">
        {download.thumbnail ? (
          <img
            src={download.thumbnail}
            alt={download.title}
            className="mb-3 h-40 w-full rounded-md object-cover"
          />
        ) : (
          <div className="mb-3 h-40 w-full rounded-md bg-gray-800" />
        )}

        <h2 className="text-sm font-semibold group-hover:underline">
          {download.title}
        </h2>

        {categoryLabel && (
          <p className="mt-1 text-xs text-gray-400">{categoryLabel}</p>
        )}

        <p className="mt-1 text-xs text-gray-500">slug: {download.slug}</p>

        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="rounded bg-white px-3 py-1 text-xs font-semibold text-black underline"
          >
            {t("Dosyayı indir", "Download")}
          </button>
        </div>
      </li>

      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="mb-4 text-center text-base font-semibold">
              {t(
                "Lütfen şifreyi girin",
                "Please contact our sales to obtain password"
              )}
            </div>

            <label className="mb-4 block text-sm font-medium">
              {t("Şifre", "Password")}:
              <input
                type="password"
                className="mt-2 w-full rounded border px-3 py-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setPassword("");
                }}
                className="rounded border px-4 py-2 text-sm"
              >
                {t("Kapat", "Close")}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded bg-black px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isSubmitting
                  ? t("Gönderiliyor...", "Submitting...")
                  : t("Gönder", "Submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
