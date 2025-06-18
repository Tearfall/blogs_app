<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;


Route::get('/', function (){
    return inertia('Home');
});

Route::get('/login', [AuthController::class, 'index'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts', [PostController::class, 'index'])->name('post.index');
});

