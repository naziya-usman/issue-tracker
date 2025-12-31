'use client'
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
// @ts-ignore - CSS side-effect import has no type declarations
import "easymde/dist/easymde.min.css";
import { useMemo } from 'react';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
}) as any;

interface IssueForm {
    title: string;
    description: string
}



const NewIssuePage = () => {
    const { register, control, handleSubmit } = useForm<IssueForm>()
    console.log(register('title'));

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
        <form className='form  max-w-xl space-y-3 m-auto p-5 bg-gray-100 border border-gray-200 rounded-lg' onSubmit={handleSubmit((data) => console.log(data))} >
            <TextField.Root placeholder="Title" {...register('title')} />
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE options={mdeOptions} {...field} />}
            />
            <Button className='cursor-pointer'>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage