import React from 'react'
import type { Status } from '../generated/prisma/enums'
import { Badge } from '@radix-ui/themes'


const IssueStatusBadge = ({ status }: { status: Status }) => {
    if (status === 'OPEN')
        return <Badge color='red'>Open</Badge>
    if (status === 'CLOSED')
        return <Badge color='green'>Closed</Badge>
    if (status === 'IN_PROGRESS')
        return <Badge color='violet'>In Progress</Badge>
}

export default IssueStatusBadge
