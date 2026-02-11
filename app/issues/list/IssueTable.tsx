import { IssueStatusBadge, Link } from "@/app/components";
import type { Issue } from "@/app/generated/prisma/browser";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
  status?: string;
  orderBy?: keyof Issue;
  page?: string;
}

interface IssueTableProps {
  searchParams: Promise<IssueQuery>;
  issues: Promise<Issue[]>;
}

const IssueTable = async ({ searchParams, issues }: IssueTableProps) => {

    const params = await searchParams;
    const issuesList = await issues;



    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    {columns.map(column =>
                        <Table.ColumnHeaderCell
                            key={column.value}
                            className={column.className}>
                            <NextLink href={{
                                query: { ...params, orderBy: column.value, }
                            }}>
                                {column.label}
                            </NextLink>
                            {column.value === params.orderBy && <ArrowUpIcon className="inline" />}
                        </Table.ColumnHeaderCell>
                    )}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    issuesList.map(issue =>
                        <Table.Row key={issue.id}>
                            <Table.Cell >
                                <div className="text-stone-100">
                                    <Link href={`/issues/${issue.id}`}>
                                        {issue.title}
                                    </Link>
                                </div>
                                <div className="block md:hidden"><IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell " ><IssueStatusBadge status={issue.status} /> </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    )
                }
            </Table.Body>
        </Table.Root>
    )
}
const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
}[] = [
        {
            label: "Issue",
            value: "title"
        },
        {
            label: "Status",
            value: "status",
            className: "hidden md:table-cell"
        },
        {
            label: "Created",
            value: "createdAt",
            className: "hidden md:table-cell"
        },
    ]

export const columnNames = columns.map(colamn => colamn.value);
export default IssueTable