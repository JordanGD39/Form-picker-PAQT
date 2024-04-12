import React, { useEffect, useRef, useState } from 'react'
import { ConsoleType, IGame } from '../../Models/GameModel';
import GameBlock from './GameBlock';

interface IProps {
  filterConsoleType?: ConsoleType
}

export default function GamesContainer(props: IProps) {
  const [games, setGames] = useState<IGame[]>([]);
  const [showedGames, setShowedGames] = useState<IGame[]>([]);

  useEffect(() => {
    fetch(route('games.fetchAll'), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(data.games);
        setShowedGames(data.games);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //Filter games if a filter has been given
  useEffect(() => {
    if (!games || !props.filterConsoleType) {
      return;
    }

    if (props.filterConsoleType === ConsoleType.NONE) {
      setShowedGames(games);
      return;
    }

    setShowedGames(games.filter((game) => game.console === props.filterConsoleType));
  }, [props.filterConsoleType])

  return (
    <div className='md:w-3/4 max-w-5xl w-full md:mx-0 mx-auto min-h-16 flex-row inline-flex flex-wrap gap-4'>
      {showedGames.map((element) => <GameBlock key={element.id} id={element.id} name={element.name} image={element.image} console={element.console.toString()}/>)}
    </div>
  )
}
