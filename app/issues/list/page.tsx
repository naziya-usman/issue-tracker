import { IssueStatusBadge, Link } from "@/app/components";
import { Table } from "@radix-ui/themes";
import { prisma } from "../../lib/prisma";
import IssuesActions from "./IssuesActions";
import { Status } from "@/app/generated/prisma/enums";
import { object } from "zod";
const Issues = async ({ searchParams }: { searchParams: Promise<{ status?: string }> }) => {

const params = await searchParams;
const status = params.status;

console.log("Selected Status:", status); 

const statuses = Object.values(Status);
const validStatus = (status && statuses.includes(status as Status)) ? status : "all";


    const issues = await prisma.issue.findMany({
        where: {
            status: (validStatus === "all" || !validStatus) ? undefined : (validStatus as Status)
        }
    });
    return (
        <div>
            <IssuesActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        issues.map(issue =>
                            <Table.Row key={issue.id}>
                                <Table.Cell >
                                    <div className="text-stone-100">
                                        <Link href={`/issues/${issue.id}`}>
                                            {issue.title}
                                        </Link>
                                    </div>
                                    <div className="block md:hidden"><IssueStatusBadge status={issue.status} /></div>
                                </Table.Cell>
                                <Table.Cell className="hidden md:table-cell " ><IssueStatusBadge status={issue.status} /> </Table.Cell>
                                <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default Issues
