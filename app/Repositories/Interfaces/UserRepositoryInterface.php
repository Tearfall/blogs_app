<?php

namespace App\Repositories\Interfaces;

use App\Models\User;
use Illuminate\Http\Request;

Interface UserRepositoryInterface{
    public function getUserById($id);
    public function updateUserInfo(Request $request, User $user);
}
