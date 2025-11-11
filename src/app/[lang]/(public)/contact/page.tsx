'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [s, setS] = useState({ name: '', email: '', message: '' });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(s) });
    alert(r.ok ? 'Gönderildi' : 'Hata');
  };
  return (
    <form onSubmit={submit} className="max-w-md space-y-3">
      <input className="border p-2 w-full" placeholder="Ad" onChange={(e)=>setS({...s,name:e.target.value})}/>
      <input className="border p-2 w-full" placeholder="E-posta" onChange={(e)=>setS({...s,email:e.target.value})}/>
      <textarea className="border p-2 w-full" placeholder="Mesaj" onChange={(e)=>setS({...s,message:e.target.value})}/>
      <button className="bg-black text-white px-4 py-2 rounded" type="submit">Gönder</button>
    </form>
  );
}
