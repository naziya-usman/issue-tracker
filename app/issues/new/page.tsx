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
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
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
                        setSubmitting(true)
                        await axios.post('/api/issue', data)
                        router.push('/issues')
                    } catch (error) {
                        setSubmitting(false)
                        setError("An Unexpected error occurred.!")
                    }
                })} >
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <TextField.Root placeholder="Title" {...register('title')} />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue=""
                    render={({ field }) => <SimpleMDE options={mdeOptions} {...field} />}
                />
                <Button className='cursor-pointer m-5' disabled={isSubmitting} >
                    Submit New Issue{isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default NewIssuePage