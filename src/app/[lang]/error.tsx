'use client';
export default function Error({ error }: { error: Error }) {
  return (
    <div className="py-16">
      <h1 className="text-2xl font-semibold">Bir hata oluştu</h1>
      <p className="text-gray-600 mt-2">{error.message}</p>
    </div>
  );
}
