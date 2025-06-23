<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::get('/', function (){ return inertia('Home'); })->name('index');

Route::get('/login', [AuthController::class, 'index'])->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/profile/{id}', [UserController::class, 'index'])->name('profile.index');
    Route::get('/posts', [PostController::class, 'index'])->name('post.index');
});

