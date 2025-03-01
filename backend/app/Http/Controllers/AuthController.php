<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;
use App\Http\Requests\InscriptionRequest;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function inscription(InscriptionRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $user = User::create([
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
            ]);

            Log::info('Nouvelle inscription : ', [
                'email' => $user->email,
                'user_id' => $user->id,
                'created_at' => $user->created_at,
            ]);
    
            return response()->json([
                'message' => 'Inscription réussie !',
                'user' => $user,
            ], 201);
    
        } catch (QueryException $e) {
            Log::error('Erreur lors de l\'inscription : ', [
                'error' => $e->getMessage(),
            ]);
            return response()->json([
                'message' => 'Une erreur est survenue. Veuillez réessayer plus tard.',
                'error' => $e->getMessage(),
            ], 500);
    
        } catch (Exception $e) {
            Log::error('Erreur inconnue lors de l\'inscription : ', [
                'error' => $e->getMessage(),
            ]);
            return response()->json([
                'message' => 'Une erreur inconnue est survenue.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function connexion(Request $request)
    {
        try {
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
                    'user' => [
                        'email' => $user->email,
                    ]
                ],200);
    
            } else {
                return response()->json([
                    'message' => 'Email ou mot de passe incorrect ! Veuillez réessayer.'
                ], 401);
            }
    
        } catch (ValidationException $e) {
            Log::error('Erreur de validation lors de la connexion : ', [
                'error' => $e->getMessage(),
                'request_data' => $request->all(), 
            ]);
            return response()->json([
                'message' => 'Les données fournies sont invalides.',
            ], 422); 
    
        } catch (Exception $e) {
            Log::error('Erreur inconnue lors de la connexion : ', [
                'error' => $e->getMessage(), 
            ]);
            return response()->json([
                'message' => 'Une erreur inconnue est survenue.',
            ], 500);
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
