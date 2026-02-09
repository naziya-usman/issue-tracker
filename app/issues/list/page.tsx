import { IssueStatusBadge, Link } from "@/app/components";
import type { Issue } from "@/app/generated/prisma/client";
import { Status } from "@/app/generated/prisma/enums";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { prisma } from "../../lib/prisma";
import IssuesActions from "./IssuesActions";
import { ArrowUpIcon } from "@radix-ui/react-icons";
const Issues = async ({ searchParams }: { searchParams: Promise<{ status?: string, orderBy: keyof Issue }> }) => {

    const params = await searchParams;
    const status = params.status;

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

    const statuses = Object.values(Status);
    const validStatus = (status && statuses.includes(status as Status)) ? status : "all";

    const orderBy = columns
        .map(column => column.value)
        .includes(params.orderBy)
        ? { [params.orderBy]: 'asc' } : undefined

    const issues = await prisma.issue.findMany({
        where: {
            status: (validStatus === "all" || !validStatus) ? undefined : (validStatus as Status)
        },
        orderBy: orderBy
    });
    return (
        <div>
            <IssuesActions />
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
                        issues.map(issue =>
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
        </div>
    )
}

export default Issues
