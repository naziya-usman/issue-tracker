import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
// @ts-ignore - CSS side-effect import has no type declarations
import 'react-loading-skeleton/dist/skeleton.css'
const NewIssuePage = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height='20rem' />
    </Box>
  )
}

export default NewIssuePage