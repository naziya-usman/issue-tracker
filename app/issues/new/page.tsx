'use client'
import { Spinner } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
const NewIssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
    ssr: false,
    loading: () => <div className='flex justify-center items-center h-32'><Spinner /></div>
}) as any;

const NewIssuePage = () => {
    return (
        <NewIssueForm />
    )
}

export default NewIssuePage