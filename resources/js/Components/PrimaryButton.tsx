import React, { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
    onClick?: () => void,
    type?: "button" | "submit" | "reset"
}

export default function PrimaryButton(props: IProps) {
  return (
    <button className='block font-semibold mt-2 w-full text-l md:text-xl bg-sky-500 hover:bg-sky-400 rounded py-2 cursor-pointer transition'
        onClick={props.onClick}
        type={props.type}>
        {props.children}
    </button>
  )
}
