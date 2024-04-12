import { useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { FormEventHandler, useEffect, useState } from 'react'
import Background from '../Components/Background';
import GameRow from '../Components/Dashboard/GameRow';
import Form from '../Components/Form';
import TextField from '../Components/TextField';
import { ConsoleType, IGame } from '../Models/GameModel';
import dayjs from 'dayjs';
import PrimaryButton from '../Components/PrimaryButton';

export default function Dashboard() {
    const [games, setGames] = useState<IGame[]>([]);

    useEffect(() => {
      fetch(route('games.fetchAll'), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setGames(data.games);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }, []);

    const handleSubmit = (event: any) => {
      event.preventDefault();

      const data = new FormData();

      data.append('name', event.target.name.value);
      data.append('image', event.target.image.files[0]);
      data.append('console', event.target.console.value);

      const startDate = event.target.startRentDate.value;
      const endDate = event.target.endRentDate.value;
      if (startDate) {
        data.append('startRentDate', event.target.startRentDate.value);
      }
      if (endDate) {
        data.append('endRentDate', event.target.endRentDate.value);
      }
      console.log(data.get('image'));

      const config = { headers: {'Content-Type': 'multipart/form-data' }}

      axios.post(route('games.post'), {
        name: data.get('name'),
        image: data.get('image'),
        console: data.get('console'),
        startRentDate: data.get('startRentDate'),
        endRentDate: data.get('endRentDate'),
      }, config);
    };

  return (
    <Background>
      <div className='p-4'>
        <h2 className='text-3xl font-bold pb-2'>Create Game</h2>
        <Form onSubmit={handleSubmit} method='post' encType="multipart/form-data">
          <label>
              Name
              <TextField id='name'/>
          </label>
          <label>
              Console
              <select id="console" className='py-0 block text-black w-fit'>
                {Object.values(ConsoleType).filter((value) => Number.isNaN(parseInt(value.toString(), 10))).map((value) => 
                  <option key={value} value={value}>{value}</option>
                )}
              </select>
          </label>
          <label>
              Image
              <input type="file" className="form-control block" name="image" id="image"/>
          </label>
          <label>
              Start rent date
              <input type="date" className="form-control block text-black" id="startRentDate"/>
          </label>
          <label>
              End rent date
              <input type="date" className="form-control block text-black" id="endRentDate"/>
          </label>
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </Form>
        <div className='bg-slate-800 mt-5 rounded p-5'>
          {games.map((element) => 
            <GameRow game={element} />)}
        </div>
      </div>
    </Background>
  )
}