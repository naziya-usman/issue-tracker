'use client'
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
// @ts-ignore - CSS side-effect import has no type declarations
import "easymde/dist/easymde.min.css";
import { useMemo, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from "zod"
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
}) as any;

type IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState("")
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
        <div className='max-w-xl space-y-3  m-auto p-5 bg-gray-100 border border-gray-200 rounded-lg'>
            {
                error &&
                <Callout.Root color='red'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form className='form space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issue', data)
                        router.push('/issues')
                    } catch (error) {
                        setError("An Unexpected error occurred.!")
                    }
                })} >
                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
                <TextField.Root placeholder="Title" {...register('title')} />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                <Controller
                    name='description'
                    control={control}
                    defaultValue=""
                    render={({ field }) => <SimpleMDE options={mdeOptions} {...field} />}
                />
                <Button className='cursor-pointer m-5'>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage