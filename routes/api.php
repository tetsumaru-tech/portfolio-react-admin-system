<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show'])->where('id', '[0-9]+');
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update'])->where('id', '[0-9]+');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->where('id', '[0-9]+');
Route::patch('/users/{id}/password', [UserController::class, 'updatePassword'])->where('id', '[0-9]+');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/me', [AuthController::class, 'me']);
