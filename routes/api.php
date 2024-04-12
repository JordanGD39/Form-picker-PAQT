<?php

use App\Http\Controllers\GameController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/games/{game}', 'App\Http\Controllers\GameController@show')->name('games.fetch');
Route::get('/games', 'App\Http\Controllers\GameController@showAll')->name('games.fetchAll');
Route::post('/games', 'App\Http\Controllers\GameController@create')->name('games.post');
Route::post('/games/{game}', 'App\Http\Controllers\GameController@validateRent')->name('game.validateRent');
Route::delete('/games/{game}', 'App\Http\Controllers\GameController@delete')->name('game.delete');