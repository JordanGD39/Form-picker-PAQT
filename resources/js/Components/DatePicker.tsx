import React from 'react'

interface IProps {
    id: string
    min?: string
    max?: string
    onChange?: (e: any) => void
}

export default function DatePicker(props: IProps) {
  return (
    <input type="date" onChange={props.onChange} min={props.min} max={props.max} style={{colorScheme: 'dark'}} className="block border-2 focus:border-sky-400 bg-slate-900 border-sky-500 rounded" id={props.id}/>
  )
}
