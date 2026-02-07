import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/app/lib/prisma";
import { createIssueSchema } from "@/app/validationSchemas";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type UserIdParams = {
    id: string;
};

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<UserIdParams> },
) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const id = (await params).id;
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (!issue)
        return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description,
        },
    });
    return NextResponse.json(updatedIssue);
}
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<UserIdParams> },
) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const id = (await params).id;
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!issue)
        return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    await prisma.issue.delete({
        where: { id: issue.id },
    });

    return NextResponse.json({ message: "Issue deleted successfully" });
}
