import { notFound } from 'next/navigation';
import NewIssueForm from '../../_components/IssueForm'
import { prisma } from '@/app/lib/prisma';
type UserIdParams = {
    id: string;
};
interface Props {
    params: Promise<UserIdParams>;
}
const EditIssuePage = async ({ params }: Props) => {
    const { id } = await params
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) notFound()

    const issue = await prisma.issue.findUnique({
        where: { id: parsedId }
    })

    if (!issue) notFound()
    return (
        <NewIssueForm issue={issue} />
    )
}

export default EditIssuePage