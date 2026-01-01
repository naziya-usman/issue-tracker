import { Text } from '@radix-ui/themes'
import React, { type PropsWithChildren } from 'react'

const ErrorMessage = ({children}:PropsWithChildren) => {
    if(!children)return null
  return (
  <Text  color='red' as='p'>{children}</Text>
  )
}

export default ErrorMessage