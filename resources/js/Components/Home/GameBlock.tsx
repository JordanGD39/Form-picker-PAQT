import { Link } from '@inertiajs/react'
import React from 'react'
import { ConsoleType } from '../../Models/GameModel'
import PrimaryButton from '../PrimaryButton'

interface IProps {
    id: string,
    name: string,
    image: string,
    console: string
}

export default function GameBlock(props: IProps) {
  return (
    <div className='py-5 px-[3%] md:p-5 flex bg-slate-800 rounded flex-col gap-2 items-center w-[47%] md:w-auto h-fit'>
        <img className='w-28 h-28 md:w-44 md:h-44 object-cover rounded' src={props.image} alt="Game image" />
        <div className='md:self-start text-xs md:text-base self-center text-center md:text-left'>
            <div className='font-semibold text-ellipsis md:max-w-[165px] md:whitespace-nowrap md:overflow-hidden'>{props.name}</div>
            <div className='text-white/60'>{props.console}</div>
        </div>
        <Link href={route('rent', {game: props.id})} className='w-full'>
            <PrimaryButton>Rent</PrimaryButton>
        </Link>
    </div>
  )
}
