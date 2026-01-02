
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/app/lib/prisma';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkDown from 'react-markdown';
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
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex className='space-x-3' my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.updatedAt.toDateString()}</Text>
                </Flex>
                <Card className='prose' mt='2'>
                    <ReactMarkDown>{issue.description}</ReactMarkDown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}> Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage