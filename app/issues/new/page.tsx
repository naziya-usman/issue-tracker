'use client'

import { TextField, Button } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
// @ts-ignore - CSS side-effect import has no type declarations
import "easymde/dist/easymde.min.css";
import { useMemo } from 'react';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { 
  ssr: false 
}) as any;

const NewIssuePage = () => {
    const mdeOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
            placeholder: "Description",
            status: false,
            autosave: {
                enabled: true,
                uniqueId: "issue-description",
                delay: 1000,
            },

            toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "preview"],
        };
    }, []);
    return (
        <div className='max-w-xl space-y-3 m-auto p-5 bg-gray-100 border border-gray-200 rounded-lg'>
            <TextField.Root placeholder="Title" />

            <SimpleMDE  options={mdeOptions} />
            <Button className='cursor-pointer'>Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage