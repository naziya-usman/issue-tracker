
import { prisma } from '@/app/lib/prisma'
import { notFound } from 'next/navigation';
import React from 'react'

type UserIdParams = {
    id: string;
};
interface PageProps {
    params: Promise<UserIdParams>;
}
const IssueDetailPage = async ({ params }: PageProps) => {
    const { id } = await params
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue) notFound()
    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.updatedAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetailPage