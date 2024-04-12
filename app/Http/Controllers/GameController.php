<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use DateTime;

class GameController extends Controller
{
    public function create(Request $request)
    {
        $request->validate($this->rules());
        $image = $this->storeImage($request, null);
        $data = $request->all();
        $data['image'] = $image;
        
        $game = Game::create($data);

        $data = [
            'message' => 'Game has been created',
            'game' => $this->mapGameResponse($game)
        ];

        return response()->json($data, 201);
    }

    public function show(Game $game)
    {
        $data = [
            'message' => 'Retrieved Game',
            'game' => $this->mapGameResponse($game)
        ];

        return response()->json($data);
    }

    public function showAll()
    {
        $allGames = Game::all();
        $mappedGames = array();

        foreach ($allGames as $game) { 
            $mappedGames[] = $this->mapGameResponse($game);
        }

        $data = [
            'message' => 'Retrieved Games',
            'games' => $mappedGames
        ];

        return response()->json($data);
    }

    public function validateRent(Game $game, Request $request)
    {
        $intersectingDate = null;
        $message = 'Game has been succesfully rented!';

        $startDate = DateTime::createFromFormat('Y-m-d', $request->startRentDate);
        $endDate = DateTime::createFromFormat('Y-m-d', $request->endRentDate);
        $now = (new DateTime())->format('Y-m-d');

        //Frontend already checks but this is a backup check if frontend fails
        if($startDate < $now || $endDate < $now) {
            $message = 'Start or end date is in the past.';
        }

        if ($game->startRentDate != null || $game->endRentDate != null) {
            if($endDate < $startDate) {
                $message = 'End date is earlier than the start date.';
            }
    
            $oldStartDate = DateTime::createFromFormat('Y/m/d', $game->startRentDate);
            $oldEndDate = DateTime::createFromFormat('Y/m/d', $game->endRentDate);
    
            //Some dates have - instead of /
            if($oldStartDate == false && $oldEndDate == false) {
                $oldStartDate = DateTime::createFromFormat('Y-m-d', $game->startRentDate);
                $oldEndDate = DateTime::createFromFormat('Y-m-d', $game->endRentDate);
            }
            
            //If start date is in the date range then the earliest intersecting date must be the given start date
            if($startDate >= $oldStartDate && $startDate <= $oldEndDate) {
                $intersectingDate = $startDate;
            }
            //If end date is in the date range then the earliest intersecting date must be the actual rent start date
            else if($endDate >= $oldStartDate && $endDate <= $oldEndDate) {
                $intersectingDate = $oldStartDate;
            }
    
            if($intersectingDate != null) {
                $message = 'Already rented during '.$oldStartDate->format('m/d/Y').' and '.$oldEndDate->format('m/d/Y').'.
                 Earliest intersecting date: '.$intersectingDate->format('m/d/Y').'.';
            }
        }

        $data = [
            'message' => $message,
            'intersectingDate' => $intersectingDate
        ];

        return response()->json($data);
    }

    public function storeImage(Request $request, ?Game $game)
    {
        $request->validate([
            'image' => 'sometimes|image|mimes:png,jpg,jpeg|max:2048'
        ]);

        //Delete image to update if the game already exists
        if ($game) {
            $imagePath = public_path('images/'.$game->image);
            if(file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $imageName = time().'.'.$request->image->extension();

        // Public Folder
        $request->image->move(public_path('images'), $imageName);

        return '/images/'.$imageName;
    }

    public function delete(Game $game)
    {
        $game->delete();

        $data = [
            'message' => 'Game has been deleted'
        ];

        return response()->json($data);
    }

    protected function rules()
    {
        return [
            'name' => 'required|string|min:4'
        ];
    }

    protected function mapGameResponse($game)
    {
        return [
            'id' => $game->id,
            'name' => $game->name,
            'image' => $game->image,
            'console' => $game->console,
            'startRentDate' => $game->startRentDate,
            'endRentDate' => $game->endRentDate
        ];
    }
}