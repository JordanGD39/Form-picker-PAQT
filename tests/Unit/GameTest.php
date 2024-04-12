<?php

use App\Models\Game;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

it('does not create a game without a name field', function () {
    $response = $this->postJson('/api/games', []);

    $response->assertStatus(422);
});

it('can create a game', function () {
    $attributes = Game::factory()->raw();
    
    $response = $this->postJson('/api/games', $attributes);

    $response->assertStatus(201)->assertJson(['message' => 'Game has been created']);

    $this->assertDatabaseHas('games', $attributes);
});

it('can fetch a game', function () {
    $game = Game::factory()->create();

    $response = $this->getJson("/api/games/{$game->id}");

    $data = [
        'message' => 'Retrieved Game',
        'game' => [
            'id' => $game->id,
            'name' => $game->name,
            'image' => $game->image,
            'startRentDate' => $game->startRentDate,
            'endRentDate' => $game->endRentDate
        ]
    ];

    $response->assertStatus(200)->assertJson($data);
});

it('can update a game', function () {
    $game = Game::factory()->create();

    $updatedGame = ['name' => 'Updated Game'];

    $response = $this->putJson("/api/games/{$game->id}", $updatedGame);

    $response->assertStatus(200)->assertJson(['message' => 'Game has been updated']);

    $this->assertDatabaseHas('games', $updatedGame);
});

it('can delete a game', function () {
    $game = Game::factory()->create();

    $response = $this->deleteJson("/api/games/{$game->id}");

    $response->assertStatus(200)->assertJson(['message' => 'Game has been deleted']);

    $this->assertCount(0, Game::all());
});