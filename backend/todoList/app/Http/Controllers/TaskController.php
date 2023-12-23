<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tasks = Task::all();
            return response()->json(['status'=>true, 'data'=>$tasks]);
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
            'description' => ['required'],
            'due_date' => ['date','required', 'after_or_equal:today'],
            'user_id' => ['required', 'exists:users,id']
        ]);

        if ($validator->fails())
        {
            return response()->json(['status'=>false, 'error'=>$validator->errors()->first()],400);
        }

        try {
            
            $task = Task::create($request->all());
            return response()->json(['status'=>true, 'data'=>$task],201);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()],400);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        try {
            return response()->json(['status'=>true, 'data'=>$task],200);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()],400);
        }
        
    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validator = Validator::make($request->all(),[
            'name' => ['required'],
            'description' => ['required'],
            'due_date' => ['date','required', 'after_or_equal:today'],
            'user_id' => ['required', 'exists:users,id']
        ]);

        if ($validator->fails())
        {
            return response()->json(['status'=>false, 'error'=>$validator->errors()->first()], 400);
        }

        try {
            $task->update($request->all());
            return response()->json(['status'=>true, 'data'=>$task], 200);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()], 400);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        try {
            $task->delete();
            return response()->json(['status'=>true], 200);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()], 400);
        }
        
    }

    /**
     * changer statut d'une task
     */

    public function changeStatus(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'statut' => ['required'],
        ]);

        if ($validator->fails())
        {
            return response()->json(['status'=>false, 'error'=>$validator->errors()->first()], 400);
        }
        try {
            $task = Task::findOrFail($request->id);
            $task->statut = $request->statut;
            $task->save();
            return response()->json(['statut'=>true, 'data'=>$task], 200);
    } catch (Exception $e) {
        return response()->json(['status'=>false, 'error'=>$e->getMessage()], 400);
    }
        
    }

    /**
     * filtrage 
     */
    public function filterTaks(Request $request)
    {
        try {
            $statut = $request->statut;
            $user_id = $request->user_id;
            if ($statut === 'all') {
                $tasks = Task::where('user_id', $user_id)->get();
            }else{
                $tasks = Task::where([
                    ['user_id', $user_id],
                    ['statut', $statut]
                ])->get();
            }
            return response()->json(['status'=>true, 'data'=>$tasks], 200);
        } catch (Exception $e) {
            return response()->json(['status'=>false, 'error'=>$e->getMessage()], 400);
        }
        
    }
}
