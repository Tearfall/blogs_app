<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::middleware(['web', 'auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['web', 'auth:sanctum'])->apiResource('posts', PostController::class);

Route::middleware('web')->post('/register', [AuthController::class, 'register']);
Route::middleware('web')->post('/login', [AuthController::class, 'login']);
Route::middleware(['web', 'auth:sanctum'])->post('/logout', [AuthController::class, 'logout']);

Route::middleware(['web', 'auth:sanctum'])->put('/user/{user}', [UserController::class, 'updateUserInfo']);

