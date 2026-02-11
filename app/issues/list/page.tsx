import Pagination from "@/app/components/Pagination";
import { Status } from "@/app/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import IssuesActions from "./IssuesActions";
import IssueTable, { columnNames, type IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
    searchParams: Promise<IssueQuery>;
}

const Issues = async ({ searchParams }: Props) => {
    const params = await searchParams;

    const statuses = Object.values(Status);
    const validStatus = statuses.includes(params.status as Status)
        ? (params.status as Status)
        : undefined;
        
    const where = validStatus ? { status: validStatus } : undefined;

    const orderBy = (params.orderBy && (columnNames as string[]).includes(params.orderBy as string))
        ? { [params.orderBy]: "asc" }
        : undefined;
    const page = parseInt(params.page || "1") || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where });
    return (
        <Flex direction="column" gap="3">
            <IssuesActions />
            <IssueTable searchParams={searchParams} issues={Promise.resolve(issues)} />
            <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
        </Flex>
    )
}

export default Issues
