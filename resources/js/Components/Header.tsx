import { Link } from '@inertiajs/react';
import React from 'react'
import logo from "../../images/logo.png";

export default function Header() {
  return (
    <div className='w-full h-20 bg-slate-800'>
        <Link href={'/'} className='h-full flex items-center w-fit'>
          <img src={logo} alt="logo" className='h-3/4'/>
        </Link>
    </div>
  )
}
