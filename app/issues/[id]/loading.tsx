import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkDown from 'react-markdown'
import Skeleton from 'react-loading-skeleton'
// @ts-ignore - CSS side-effect import has no type declarations
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {

  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex className='space-x-3' my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className='prose' mt='2'>
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage