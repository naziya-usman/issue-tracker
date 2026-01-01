
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/app/lib/prisma'
import { Card, Flex, Heading, Text ,Box } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkDown from 'react-markdown'
import delay from 'delay';
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
    await delay(2000)
    return (
        <div className='max-w-xl'>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.updatedAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='2'>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </div>
    )
}

export default IssueDetailPage