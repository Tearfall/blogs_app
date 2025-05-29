<?php
namespace App\Repositories;

use App\Models\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PostRepository implements PostRepositoryInterface
{
    public function getAllPosts()
    {
        return Post::all();
    }

    public function createPost(Request $request)
    {
        $post = $request->user()->posts()->create($request->only(['title', 'body']));

        return $post;
    }

    public function showPostById(Post $post)
    {
        return Post::findOrFail($post->id);
    }

    public function updatePost(Request $request, Post $post)
    {
        Gate::authorize('modify', $post);

        $post->update($request->only(['title', 'body']));

        return $post;
    }
    public function deletePost(Post $post)
    {
        Gate::authorize('modify', $post);

        $post->delete();

        return ['message' => 'Post deleted successfully.'];
    }
}
