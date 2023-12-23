<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::all();
            return response()->json(['status'=>true, 'data'=>$users]);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()],400);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required'],
        ]);

        if ($validator->fails())
        {
            return response()->json(['status'=>false, 'error'=>$validator->errors()->first()],400);
        }
        try {
               
            $user = User::create($request->all());
            return response()->json(['status'=>true, 'data'=>$user],201);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()], 400);
        }
        
    }


   /**
    * Fonction pour authentification
    */
    public function authentification(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => ['required'],
            'password' => ['required']
        ]);

        if ($validator->fails())
        {
            return response()->json(['status'=>false, 'error'=>$validator->errors()->first()],400);
        }
        try {
            
            if (Auth::attempt($request->only(["email", "password"])))
            {
                $token = $request->user()->createToken('access_token');
                return response()->json(['status'=>true, 'access_token'=>$token->plainTextToken, 'data'=>$request->user()],  200);
            }
            else{
                return response()->json(['status'=>false, 'data'=>'Mauvais mot de passe'],  200);

            }
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()], 400);
        }
        
    }

    /**
     * Déconnexion
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json(['status'=>true]);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()]);
        }
        
    }

    /**
     * Tasks of someone
     */
    public function tasks($id)
    {
        try {
            $user = User::FindOrFail($id);
            $tasks = $user->tasks();
            return response()->json(['data'=>$tasks]);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()]);
        }
        
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::FindOrFail($id);
            return response()->json(['status'=>true, 'data'=>$user],200);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()],400);
        }
    }

    public function checkTokenValidity(Request $request)
    {
        if ($request->user() || Auth::guard('sanctum')->user()) {
            return response()->json(['message' => 'Token valide'], 200);
        } else {
            return response()->json(['message' => 'Token invalide'], 401);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
