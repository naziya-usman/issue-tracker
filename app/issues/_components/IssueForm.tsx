'use client'
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import type { Issue } from '@/app/generated/prisma/client';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Controller, useForm } from 'react-hook-form';
// @ts-ignore - CSS side-effect import has no type declarations
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { z } from "zod";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
}) as any;

type IssueFormData = z.infer<typeof createIssueSchema>


const NewIssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState("")
    const [isSubmitting, setSubmitting] = useState(false)
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
console.log(issue?.title,issue?.description)
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issue', data)
            router.push('/issues')
        } catch (error) {
            setSubmitting(false)
            setError("An Unexpected error occurred.!")
        }
    })
    return (
        <div className='max-w-xl space-y-3  m-auto p-5 bg-gray-100 border border-gray-200 rounded-lg'>
            {
                error &&
                <Callout.Root color='red'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form className='form space-y-3'
                onSubmit={onSubmit}>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')} />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE options={mdeOptions} {...field} />} />
                <Button className='cursor-pointer m-5' disabled={isSubmitting} >
                    Submit New Issue{isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default NewIssueForm