"use client";
import { useState } from "react";

type Issues = { fieldErrors?: Record<string, string[]> };

export default function ContactPage() {
  const [s, setS] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<Issues | null>(null);
  const [ok, setOk] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setOk(false);
    const r = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(s),
    });
    const j = await r.json();
    setLoading(false);
    if (!r.ok) {
      setErr(j.issues ?? {});
      return;
    }
    setOk(true);
    setS({ name: "", email: "", message: "" });
  };

  const fe = (k: keyof typeof s) => err?.fieldErrors?.[k]?.[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-slate-900">
      <form
        onSubmit={submit}
        className="max-w-md mx-auto space-y-3"
      >
        <input
          className="border p-2 w-full"
          placeholder="Ad"
          value={s.name}
          onChange={(e) => setS({ ...s, name: e.target.value })}
        />
        {fe("name") && (
          <p className="text-xs text-red-600">{fe("name")}</p>
        )}

        <input
          className="border p-2 w-full"
          placeholder="E-posta"
          value={s.email}
          onChange={(e) => setS({ ...s, email: e.target.value })}
        />
        {fe("email") && (
          <p className="text-xs text-red-600">{fe("email")}</p>
        )}

        <textarea
          className="border p-2 w-full"
          placeholder="Mesaj"
          value={s.message}
          onChange={(e) => setS({ ...s, message: e.target.value })}
        />
        {fe("message") && (
          <p className="text-xs text-red-600">{fe("message")}</p>
        )}

        <button
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Gönderiliyor…" : "Gönder"}
        </button>
        {ok && (
          <p className="text-green-700 text-sm">Mesaj alındı.</p>
        )}
      </form>
    </div>
  );
}
