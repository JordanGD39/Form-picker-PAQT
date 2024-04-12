import axios from 'axios'
import React from 'react'
import { IGame } from '../../Models/GameModel'

interface IProps {
  game: IGame
}

export default function GameRow(props: IProps) {

    function handleDelete() {
        axios.delete(route('game.delete', {game: props.game.id}));
    }

  return (
    <div className='flex w-full mb-3 items-center'>
        {Object.values(props.game).map((value, index) => props.game.image == value ? <img key={index} src={value} className='max-h-10'/> : <div key={index} className='flex-1'>{value}</div>)}
        <button className='bg-red-600 px-6 py-2 rounded font-semibold' onClick={handleDelete}>Delete</button>
    </div>
  )
}
