import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-slate-200 flex shadow-md justify-between items-center mx-auto p-3 ' >
        <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl items-center flex flex-wrap' >
                <span className='text-slate-500' >Tolulope</span> 
                <span className='text-slate-700' >Estate</span>
            </h1>
        </Link>
        

        <form className='bg-slate-100 p-2 items-center rounded-lg flex' action="">
            <input type="text" placeholder='search' className='bg-transparent focus:outline-none w-24 sm:w-64 ' />
            <FaSearch/>
        </form>

        <ul className='items-center flex gap-4'>
            <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline ' >  Home</li>
            </Link>
            <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline '>About</li>
            </Link>
            <Link to='/signin'>
                <li className=' sm:inline text-slate-700 hover:underline '>Log In</li>
            </Link>
            {/* <Link to='/signup'>
                <li className=' sm:inline text-slate-700 hover:underline '>Log In</li>
            </Link> */}
    
            <li></li>
            <li></li>
        </ul>
    </header> 
  )
}

export default Header