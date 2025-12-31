import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
const createIssueSchema = z.object({
  title: z.string().max(255),
  description: z.string().min(1),
});
export async function POST(Request: NextRequest) {
  const body = await Request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.message, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
