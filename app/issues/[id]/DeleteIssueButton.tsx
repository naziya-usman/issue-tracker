'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = React.useState(false);
    const deleteIssue = async () => {
        try {
            await axios.delete("/api/issue/" + issueId)
            router.push('/issues');
            router.refresh();
        }
        catch (err) {
            setError(true);
        }
    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">Delete Issue</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Conform Delete</AlertDialog.Title>
                    <AlertDialog.Description>Are you sure you want to delete this issue?.This action cannot be undone.</AlertDialog.Description>
                    <Flex gap='4'>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color='red' onClick={deleteIssue}>Delete Issue</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>There was an error deleting the issue. Please try again later.</AlertDialog.Description>
                    <Button color='gray' variant='soft' mt='2' onClick={() => setError(false)}>Ok</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton