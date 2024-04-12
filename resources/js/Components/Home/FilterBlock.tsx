import React, { useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { ConsoleType } from '../../Models/GameModel'
import {Collapse} from 'react-collapse';

interface IProps {
    filterOnClick: (e: any) => void
    filter?: ConsoleType
}

export default function FilterBlock(props: IProps) {
    const [showFilter, setShowFilter] = useState(false);
    const [content] = useState(
    <>
        <h2 className='text-2xl font-bold px-5 mt-5 p-2 bg-slate-700 rounded-t'>Console</h2>
        <div className='flex flex-col px-5 p-2 gap-4 border border-slate-700 rounded-b'>
            {Object.values(ConsoleType).filter((value) => Number.isNaN(parseInt(value.toString(), 10))).map((value) => 
                <button key={value} value={value} onClick={props.filterOnClick} 
                        style={{color: props.filter === value ? "white" : ""}} 
                        className='text-xl text-left text-white/60 transition-all hover:text-white font-semibold'>
                    {value}
                </button>
            )}
        </div>
    </>);
    
  return (
    <>
        <BrowserView className='md:w-1/4 bg-slate-800 rounded p-5'>
            <h2 className='text-3xl font-bold'>Filter by</h2>
            {content}
        </BrowserView>
        <MobileView className='bg-slate-800 rounded p-3 px-5 mb-4'>
            <button onClick={() => setShowFilter(!showFilter)} className='text-2xl font-bold flex w-full justify-between'>
                <h2>Filter</h2>
                <div className='self-end text-lg text-white/80'>{showFilter ? "▲" : "▼"}</div>
            </button>
            <Collapse isOpened={showFilter} className='bg-slate-800'>
                {content}
            </Collapse>
        </MobileView>
    </>
  )
}
