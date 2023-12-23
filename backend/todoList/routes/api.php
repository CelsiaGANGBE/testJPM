<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->apiResource("users", UserController::class); 

Route::middleware('auth:sanctum')->apiResource("tasks", TaskController::class); 

Route::middleware('auth:sanctum')->post("/change_status", [TaskController::class, 'changeStatus']);

Route::middleware('auth:sanctum')->get("/user/{id}/tasks", [UserController::class, 'tasks']);

Route::middleware('auth:sanctum')->get('/check-token', [UserController::class, 'checkTokenValidity']);


Route::controller(UserController::class)->group(function () {
    Route::post('/inscription', 'store');
    Route::post('/connexion', 'authentification');
    Route::get('/deconnexion', 'logout')->middleware('auth:sanctum');
});