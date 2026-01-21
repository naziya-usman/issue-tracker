import { prisma } from '@/app/lib/prisma';
import { Box, Grid, Flex } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
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
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex direction='column' gap='4'>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage