<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;

class UserPolicy
{
    /**
     * Determine whether the user can modify the model.
     */
    public function modify(User $authUser, User $user): Response
    {
        return $authUser->id === $user->id
            ? Response::allow()
            : Response::deny('Invalid user');
    }
}
