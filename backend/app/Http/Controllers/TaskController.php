<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
  
    public function index()
    {
        return Task::all();
    }

   
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in-progress,completed',
        ]);
        
        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'due_date' => $validated['due_date'],
            'status' => $validated['status'],
            'user_id' => auth()->id(),
        ]);


        return response()->json([
            'message' => 'Tâche créée avec succès.',
            'task' => $task
        ], 201);
    }

    /**
     * Afficher les taches de l'utilisateur connecté
     */
    public function show(string $id)
    {
        $task = Task::where('user_id', auth()->id())->find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Tâche non trouvée ou vous n\'avez pas accès à cette tâche.'
            ], 404);
        }
        // Retourner la tâche
        return response()->json($task);
    }


    /**
     * Mise à jour d'une tache
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in-progress,completed',
        ]);

        $task = Task::where('user_id', auth()->id())->find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Tâche non trouvée ou vous n\'avez pas accès à cette tâche.'
            ], 404);
        }

        $task->update($validated);

        return response()->json([
            'message' => 'Tâche mise à jour avec succès.',
            'task' => $task
        ]);
    }


    /**
     * Supprimer une tache 
     */
    public function destroy(string $id)
    {
        $task = Task::where('user_id', auth()->id())->find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Tâche non trouvée ou vous n\'avez pas accès à cette tâche.'
            ], 404);
        }

        $task->delete();

        return response()->json([
            'message' => 'Tâche supprimée avec succès.'
        ]);
    }
}
