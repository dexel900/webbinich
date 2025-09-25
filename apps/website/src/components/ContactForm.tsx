"use client";
import { useState } from "react";

export default function ContactForm() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(false);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        message: fd.get("message")
      })
    });
    setLoading(false);
    if (res.ok) {
      setOk(true);
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={submit} className="max-w-lg space-y-3">
      <input name="name" placeholder="Name" className="w-full border p-2 rounded" required />
      <input name="email" type="email" placeholder="E-Mail" className="w-full border p-2 rounded" required />
      <textarea name="message" placeholder="Nachricht" className="w-full border p-2 rounded" rows={5} required />
      <button disabled={loading} className="px-4 py-2 rounded bg-black text-white">
        {loading ? "Senden…" : "Senden"}
      </button>
      {ok && <p className="text-green-600 text-sm">Danke! Wir melden uns.</p>}
    </form>
  );
}
