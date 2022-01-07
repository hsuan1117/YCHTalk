<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/session', [\App\Http\Controllers\Controller::class, 'getSession']);
Route::post('/join', [\App\Http\Controllers\ChatController::class, 'join']);
Route::post('/leave', [\App\Http\Controllers\ChatController::class, 'leave']);
Route::post('/send', [\App\Http\Controllers\ChatController::class, 'send']);
Route::post('/get', [\App\Http\Controllers\ChatController::class, 'get']);
