import React, { useState } from 'react'
import GamesContainer from '../Components/Home/GamesContainer'
import FilterBlock from '../Components/Home/FilterBlock'
import PageLayout from '../Layout/PageLayout'
import { ConsoleType } from '../Models/GameModel';

export default function Home() {
  const [filter, setFilter] = useState<ConsoleType | undefined>(undefined);

  return (
    <PageLayout>
      <div className='flex md:flex-row flex-col-reverse justify-between'>
        <GamesContainer filterConsoleType={filter}/>
        <FilterBlock filterOnClick={(e) => setFilter(e.target.value)} filter={filter}/>
      </div>
    </PageLayout>
  )
}