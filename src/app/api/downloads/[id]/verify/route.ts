import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await props.params; // <-- params'i await et
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { message: "Password required" },
        { status: 400 }
      );
    }

    const id = Number(rawId);
    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid id" },
        { status: 400 }
      );
    }

    const download = await prisma.download.findUnique({
      where: { id },
      include: {
        files: { orderBy: { sortOrder: "asc" } },
      },
    });

    if (!download) {
      return NextResponse.json(
        { message: "Download not found" },
        { status: 404 }
      );
    }

    const storedPassword = (download.password ?? "").toString().trim();
    const inputPassword = password.toString().trim();

    if (storedPassword !== inputPassword) {
      return NextResponse.json(
        { message: "Wrong password" },
        { status: 401 }
      );
    }

    const file = download.files[0];
    if (!file) {
      return NextResponse.json(
        { message: "No file for this download" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { url: file.filePath },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify download error:", error);
    return NextResponse.json(
      { message: "Internal error" },
      { status: 500 }
    );
  }
}
