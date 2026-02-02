import Link from 'next/link'
import { IoBugSharp } from 'react-icons/io5';
const NavBar = () => {
  const links = [
    {
      label: 'Dashboard',
      href: '/'
    },
    {
      label: 'Issues',
      href: '/issues/list'
    }
  ]



  return (
    <nav className=' navbar bg-gray-100 shadow-sm flex space-x-6 border-b border-gray-200 mb-5 px-5 h-14 items-center'>
      <Link href="/"><IoBugSharp /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => <Link 
        className='text-zinc-500 hover:text-zinc-800 tran transition-colors'
        key={link.href} 
        href={link.href}>
          {link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar
