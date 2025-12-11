export const runtime = "nodejs";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { path, token } = await req.json().catch(() => ({}));
  if (token !== process.env.REVALIDATE_TOKEN) {
    return new Response("unauthorized", { status: 401 });
  }
  if (!path || typeof path !== "string") {
    return new Response("path required", { status: 400 });
  }
  revalidatePath(path);
  return new Response("ok");
}
