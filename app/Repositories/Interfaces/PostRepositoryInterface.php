<?php
namespace App\Repositories\Interfaces;

use App\Models\Post;
use Illuminate\Http\Request;

Interface PostRepositoryInterface{
    public function getAllPosts();
    public function showPostById(Post $post);
    public function createPost(Request $request);
    public function updatePost(Request $request, Post $post);
    public function deletePost(Post $post);
}
