<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;

class AuthController extends Controller
{
    public function inscription(Request $request)
    {
        try {
            // Validation des données de l'utilisateur
            $validated = $request->validate([
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6|confirmed',
                'name' => 'required|string|max:255',
            ]);
    
            // Création de l'utilisateur
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
    
            // Génération d'un token
            $token = $user->createToken('task')->plainTextToken;
    
            return response()->json([
                'message' => 'Inscription réussie.',
                'token' => $token,
                'user' => $user
            ], 201);
    
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.',
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur inattendue est survenue.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function connexion(Request $request)
    {
        // Validation des données de connexion
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
            $user = Auth::user();


            $token = $user->createToken('task')->plainTextToken;

            return response()->json([
                'message' => 'Connexion réussie.',
                'token' => $token,
                'user' => $user
            ]);
        } else {
            return response()->json([
                'message' => 'Les informations de connexion sont incorrectes.'
            ], 401);
        }
    }

    public function deconnexion(Request $request)
    {
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json([
            'message' => 'Déconnexion réussie.'
        ]);
    }
}
