import { Card, Flex, Text } from "@radix-ui/themes"
import type { Status } from "./generated/prisma/enums"
import Link from "next/link"


interface IssueSummaryProps {
    open: number
    closed: number
    inProgress: number
}
const IssueSummary = ({ open, closed, inProgress }: IssueSummaryProps) => {
    const statuses: {
        label: string
        value: number
        status: Status
    }[] = [
            {
                label: 'Open Issues',
                value: open,
                status: "OPEN"
            },
            {
                label: 'In-Progress Issues',
                value: inProgress,
                status: "IN_PROGRESS"
            },
            {
                label: 'Closed Issues',
                value: closed,
                status: "CLOSED"
            }
        ]
    return (
        <Flex gap='4'>
            {statuses.map(({ label, value, status }) => (
                <Card key={status}>
                    <Flex direction="column" gap="1">
                        <Link className="text-sm font-medium" href={`issues/list?status=${status}`}>{label}</Link>
                        <Text size="4" weight="bold">{value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssueSummary