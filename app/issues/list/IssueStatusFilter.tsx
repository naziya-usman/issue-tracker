'use client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'


const statuses: { label: string, value?: string }[] = [
    { label: 'All', value: "all" },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]
const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    return (
        <Select.Root
            defaultValue={searchParams.get('status') || "all"}
            onValueChange={
                (statusValue) => {
                    const params = new URLSearchParams()
                    if (statusValue) params.append('status', statusValue)
                    if (searchParams.get('orderBy'))
                        params.append('orderBy', searchParams.get('orderBy')!)
                    const queryParam = params.size ? "?" + params.toString() : "";
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