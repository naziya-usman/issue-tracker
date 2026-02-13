import { prisma } from '@/app/lib/prisma';
import { Box, Grid, Flex } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

type UserIdParams = {
    id: string;
};
interface PageProps {
    params: Promise<UserIdParams>;
}
const fetchUser = cache(async (issueId: number) => await prisma.issue.findUnique({ where: { id: issueId } }));
const IssueDetailPage = async ({ params }: PageProps) => {
    const session = await getServerSession(authOptions)
    const { id } = await params
    const issue = await fetchUser(parseInt(id))
    if (!issue) notFound()
    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && <Box>
                <Flex direction='column' gap='4'>
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}
        </Grid>
    )
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params
    const issue = await fetchUser(parseInt(id))
    return {
        title: issue ? `Issue Tracker - ${issue.title}` : "Issue Tracker - Issue Not Found",
        description: issue ? `Details of the issue: ${issue.title}` : "The requested issue does not exist.",
    }
}


export default IssueDetailPage