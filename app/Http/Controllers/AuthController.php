<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){

        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create($fields);

        $token = $user->createToken($request->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ] ;
    }

    public function login (Request $request){
        $request->validate([
            'email' => 'required|string|email|max:255|exists:users',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user ||!Hash::check($request->password, $user->password)){
            return [
                'message' => 'Invalid credentials'
            ];
        }

        $token = $user->createToken($user->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ] ;
    }
    
    public function logout(Request $request){

        $request->user()->tokens()->delete();
        return [
            'message' => 'Logged out successfully'
        ];
    }
}
