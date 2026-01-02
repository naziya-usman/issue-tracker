import { Skeleton } from "@/app/components";
import { Box } from '@radix-ui/themes';
const NewIssuePage = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height='20rem' />
    </Box>
  )
}

export default NewIssuePage