import React from 'react'

export default function Footer() {
  return (
    <div className='w-full bg-slate-800 fixed bottom-0 flex items-center p-3 flex-col'>
        <label className='mt-2'>
            mail: 
            <a href='mailto:jjpignato@gmail.com' className='text-sky-500 underline cursor-pointer'> jjpignato@gmail.com</a>
        </label>
        <label className='mb-2'>tel: +31 6 58868610</label>
        <div className='text-white/80'>©2024 by Jordan Pignato</div>
    </div>
  )
}
