'use client'

import { TextField,TextArea, Button } from '@radix-ui/themes'
import React from 'react'

const newIssuePage = () => {
    return (
        <div className='card card-body max-w-xl space-y-3   m-auto bg-gray-100 '>
            <TextField.Root placeholder="Title">
            </TextField.Root>
            <TextArea placeholder="Discription" />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default newIssuePage

