import React from 'react'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

const Header1 = () => {
  return (
    <header className='bg-slate-200 flex justify-between py-3 px-10 items-center'>
      <Link to='/'>
      <h1 className='font-bold text-sm sm:text-xl self-center'>
        <span className='text-slate-500'>Home</span>
        <span className='text-slate-700'>Estates</span>
        
      </h1></Link>
      <form className='self-center bg-slate-100 rounded-lg flex items-center px-2'>
        <input type="text" className='p-2 rounded-lg bg-transparent w-32 sm:w-64 focus:outline-none' placeholder='Search...'/>
        <FaSearch className='text-slate-700'/>
      </form>

      <ul className='flex gap-3 text-slate-700 font-normal text-lg items-center'>
<Link to='/Profile'>
        <li className='hidden sm:inline-block hover:underline'>Profile</li>
        </Link>
        <Link to="/About">
        <li  className='hidden sm:inline-block hover:underline'>About</li></Link>
        <Link to='/SignIn'><li  className='hidden sm:inline-block hover:underline'>
        SignIn
        </li>
        </Link>
      </ul>

    </header>
  )
}

export default Header1