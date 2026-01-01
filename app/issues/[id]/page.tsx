
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/app/lib/prisma'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
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
        <Card>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.updatedAt.toDateString()}</Text>
            </Flex>
            <Card>
                <p>{issue.description}</p>
            </Card>
        </Card>
    )
}

export default IssueDetailPage