<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use Inertia\Inertia;

class UserController extends Controller {

    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index(Request $request, $id)
    {
        $user = $this->userRepository->getUserById($id);
        $isUserAuth = false;
        $authUser = $request->user();
        if($user->id == $authUser->id) $isUserAuth = true;



        return Inertia::render('Profile/Index', [
            'user' => $user,
            'isUserAuth' => $isUserAuth
        ]);
    }

    public function updateUserInfo(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $this->userRepository->updateUserInfo($request, $user);

        return $user;
    }
}
