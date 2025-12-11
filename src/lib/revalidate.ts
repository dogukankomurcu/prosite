export async function triggerRevalidate(path: string) {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, token: process.env.REVALIDATE_TOKEN }),
  });
}
