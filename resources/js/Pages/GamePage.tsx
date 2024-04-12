import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import DatePicker from '../Components/DatePicker';
import Form from '../Components/Form';
import PrimaryButton from '../Components/PrimaryButton';
import PageLayout from '../Layout/PageLayout';
import { IGame } from '../Models/GameModel';
import dayjs from 'dayjs';
import axios from 'axios';

export default function GamePage() {
    const [game, setGame] = useState<IGame>();
    const [minEndDate, setMinEndDate] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messageIsError, setMessageIsError] = useState<boolean>(false);

    useEffect(() => {
        const { pathname } = window.location;
        const splitPathname = pathname.split("/");
        const itemId = splitPathname[splitPathname.length - 1];

        fetch(route('games.fetch', {game: itemId}), {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
                setGame(data.game);
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!game) {
            return;
        }

        const formData = new FormData();
        formData.append('startRentDate', e.target.startRentDate.value);
        formData.append('endRentDate', e.target.endRentDate.value);

        axios.post(route('game.validateRent', {
            game: game.id, 
            startRentDate: formData.get('startRentDate'),
            endRentDate: formData.get('endRentDate')
        })).then((response) => {
            setMessage(response.data.message);
            setMessageIsError(!!response.data.intersectingDate);
        });
    }

  return (
    <PageLayout>
        <div className='bg-slate-800 w-full md:w-fit mx-auto p-4 rounded flex flex-col md:flex-row min-h-[450px] md:min-w-[800px]'>
            <img className='p-4 w-96 rounded object-contain object-top' src={game?.image} alt="Game image" />
            <Form onSubmit={handleSubmit} extraClassName={' flex flex-col text-lg items-center text-center md:text-left md:items-start'}>
                <div>
                    <h2 className='text-3xl md:text-4xl font-bold max-w-96'>{game?.name}</h2>
                    <h3 className='text-xl md:text-2xl font-semibold text-white/80'>{game?.console}</h3>
                </div>
                <label>
                    Renting start date
                    <DatePicker id='startRentDate' 
                        min={dayjs().format("YYYY-MM-DD")} 
                        onChange={(e) => setMinEndDate(dayjs(e.target.value).format("YYYY-MM-DD"))}/>
                </label>
                <label>
                    Renting end date
                    <DatePicker id='endRentDate' min={minEndDate}/>
                </label>
                <PrimaryButton>Rent</PrimaryButton>
                <div 
                    style={{color: messageIsError ? 'red': 'white', fontSize: messageIsError ? '0.875rem' : '1.2rem'}} 
                    className='mt-2 max-w-80 text-center self-center whitespace-pre-line md:whitespace-normal'>
                    {message}
                </div>
            </Form>
        </div>
    </PageLayout>
  )
}
