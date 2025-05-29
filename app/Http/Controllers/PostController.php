<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Repositories\Interfaces\PostRepositoryInterface;

class PostController extends Controller implements HasMiddleware
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public static function middleware(){
        return[
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    public function index()
    {
        return $this->postRepository->getAllPosts();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $post = $this->postRepository->createPost($request);

        return $post;
    }

    public function show(Post $post)
    {
        return $this->postRepository->showPostById($post);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $this->postRepository->updatePost($request, $post);

        return $post;
    }

    public function destroy(Post $post)
    {
        return $this->postRepository->deletePost($post);
    }
}
