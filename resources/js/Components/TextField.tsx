import React from 'react'

interface IProps {
  id: string
}

export default function TextField(props: IProps) {
  return (
    <input type="text" id={props.id} className='py-0 block text-black'/>
  )
}
