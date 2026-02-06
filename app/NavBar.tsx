'use client';

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBugSharp } from 'react-icons/io5';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' }
  ];

  return (
    <nav className='shadow-sm border-b border-gray-200 px-5 py-3'>
      <Container>
        <Flex justify='between' align='center'>
          <Flex align='center' gap='4'>
            <Link href="/"><IoBugSharp /></Link>
            <ul className='flex space-x-6'>
              {links.map(link => (
                <li key={link.href}>
                  <Link
                    className={`${link.href === currentPath ? 'text-zinc-900 font-medium' : 'text-zinc-500'
                      } hover:text-zinc-800 transition-colors`}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image!}
                    fallback={session.user?.name?.charAt(0).toUpperCase() || "?"}
                    size="2"
                    radius="full"
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="soft">
                  <DropdownMenu.Label>
                    <Flex direction="column">
                      <Text size="2" weight="bold">{session.user?.name}</Text>
                      <Text size="1" color="gray">{session.user?.email}</Text>
                    </Flex>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout" className='w-full'>Log Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link className='nav-link' href="/api/auth/signin">Sign In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;