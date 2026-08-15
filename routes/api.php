<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BugController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectMemberController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->middleware('guest');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('bugs', BugController::class)->except('destroy');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::apiResource('projects', ProjectController::class)->except('destroy');

    Route::prefix('projects/{project}')->group(function () {
        Route::post('members', [ProjectMemberController::class, 'store'])
            ->name('projects.members.store');
        Route::get('members', [ProjectMemberController::class, 'index'])
            ->name('projects.members.index');
        Route::delete('members/{user}', [ProjectMemberController::class, 'destroy'])
            ->name('projects.members.destroy');
    });
});
