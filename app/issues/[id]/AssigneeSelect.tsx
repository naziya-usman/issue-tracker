'use client'

import type { User } from '@/app/generated/prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get<User[]>('/api/user')
            setUsers(data)
        }
        fetchUsers()
    }, [])
    return (  
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>suggestions</Select.Label>
                    {users.map(user => (
                        <Select.Item value={user.id} key={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect