'use client'
import type { Status } from '@/app/generated/prisma/enums'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'


const statuses: { label: string, value?: string }[] = [
    { label: 'All', value: "all" },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]
const IssueStatusFilter = () => {

    const router = useRouter()
    return (
        <Select.Root onValueChange={(statusValue) => {
            const queryParam = statusValue === "all" ? "" : `?status=${statusValue}`
            router.push(`/issues/list${queryParam}`)
        }}>
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.label} value={status.value || ''}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter