<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;


Route::get('/', function (){
    return inertia('Home');
});

Route::get('/auth', [AuthController::class, 'index'])->name('auth.index');
