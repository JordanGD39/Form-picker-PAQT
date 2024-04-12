<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //DB::statement("ALTER TABLE games CHANGE COLUMN console console ENUM('SEGA_GENESIS', 'DREAMCAST', 'GAMECUBE') NOT NULL DEFAULT 'SEGA_GENESIS'");
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image');
            $table->string('console');
            $table->string('startRentDate')->nullable();
            $table->string('endRentDate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
