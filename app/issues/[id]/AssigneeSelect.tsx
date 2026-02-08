'use client'

import Skeleton from '@/app/components/Skeleton'
import type { Issue, User } from '@/app/generated/prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {


    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get<User[]>('/api/user').then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })

    if (isLoading) return <Skeleton />
    if (error) return null

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || "unassigned"}
                onValueChange={(userId) => {
                    // Check if the selected value is 'unassigned'
                    const assignedToUserId = userId === "unassigned" ? null : userId;
                    axios.patch(`/api/issue/${issue.id}`, {
                        assignedToUserId
                    }).catch(error => {
                        toast.error("Failed to update assignee");
                    })
                }}
            >
                <Select.Trigger placeholder="Assign..." />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="unassigned">Unassigned</Select.Item>
                        {users?.map(user => (
                            <Select.Item value={user.id} key={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default AssigneeSelect