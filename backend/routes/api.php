<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('user')->group(function () {
    Route::post('inscription', [AuthController::class, 'inscription']);
    Route::post('connexion', [AuthController::class, 'connexion']);
});

Route::prefix('tasks')->group(function () {
    Route::get('all', [TaskController::class, 'getAllTasks']); 
});
