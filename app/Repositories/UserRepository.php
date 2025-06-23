<?php
namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserRepository implements UserRepositoryInterface{
    public function getUserById($id){
        return User::findOrFail($id);
    }

    public function updateUserInfo(Request $request, User $user)
    {
        Gate::authorize('modify', $user);

        if($request->name){
            $user->update(['name' => $request->name]);
        }

        return $user;
    }
}
