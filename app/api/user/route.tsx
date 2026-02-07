import { prisma } from "@/app/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany({ orderBy: { name: "asc" } })
    return new Response(JSON.stringify(users), { status: 200 });
}