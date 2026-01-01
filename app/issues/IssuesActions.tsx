import React from 'react'
import { Button } from "@radix-ui/themes";
import Link from 'next/link';
const IssuesActions = () => {
    return (
        <div className="pb-5">
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    )
}

export default IssuesActions
