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
        Schema::create('bug', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->text('error_message')->nullable();
            $table->text('description')->nullable();
            $table->text('cause')->nullable();
            $table->text('solution')->nullable();
            $table->string('status');
            $table->string('project_name')->nullable();
            $table->string('technology')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bug');
    }
};
