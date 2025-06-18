<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="bg-blue-600 text-white py-4 px-6 shadow-md">
      <h1 class="text-2xl font-bold">Social Posts</h1>
    </div>

    <div class="max-w-2xl mx-auto py-6 px-4">
      <!-- Create Post Button -->
      <div v-if="!showCreateForm" class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <button
          @click="showCreateForm = true"
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full py-3 px-4 text-left transition-colors duration-200 flex items-center"
        >
          <font-awesome-icon :icon="['fas', 'plus']" class="w-5 h-5 mr-2" />
          What's on your mind?
        </button>
      </div>

      <!-- Create Post Form -->
      <div v-if="showCreateForm" class="bg-white rounded-lg shadow-sm p-6 mb-6 border-2 border-blue-200">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Create Post</h3>
          <button
            @click="cancelCreate"
            class="text-gray-500 hover:text-gray-700"
          >
            <font-awesome-icon :icon="['fas', 'times']" class="w-5 h-5" />
          </button>
        </div>

        <input
          v-model="newPost.title"
          type="text"
          placeholder="Post title..."
          class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <textarea
          v-model="newPost.body"
          placeholder="What's happening?"
          rows="4"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        ></textarea>

        <div class="flex justify-end space-x-3">
          <button
            @click="cancelCreate"
            class="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            @click="createPost"
            :disabled="!newPost.title.trim() || !newPost.body.trim()"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Post
          </button>
        </div>
      </div>

      <!-- Posts List -->
      <div class="space-y-4">
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <!-- Post Header -->
          <div class="px-6 py-4 border-b border-gray-100">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-lg font-semibold text-gray-900 mb-1">
                  {{ post.title }}
                </h2>
                <p class="text-sm text-gray-500">
                  {{ formatTimestamp(post.timestamp) }}
                </p>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="startEdit(post)"
                  class="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  title="Edit post"
                >
                    <font-awesome-icon :icon="['fas', 'edit']" class="w-5 h-5" />
                </button>
                <button
                  @click="deletePost(post.id)"
                  class="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  title="Delete post"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Post Content -->
          <div class="px-6 py-4">
            <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ post.body }}</p>
          </div>

          <!-- Post Actions -->
          <div class="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <div class="flex space-x-6 text-sm text-gray-600">
              <button class="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200">
                <font-awesome-icon :icon="['fas', 'heart']" class="w-5 h-5" />
                <span>Like</span>
              </button>
              <button class="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200">
                <font-awesome-icon :icon="['fas', 'comment']" class="w-5 h-5" />
                <span>Comment</span>
              </button>
              <button class="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200">
                <font-awesome-icon :icon="['fas', 'share']" class="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div
        v-if="editingPost"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="cancelEdit"
      >
        <div
          class="bg-white rounded-lg p-6 w-full max-w-lg"
          @click.stop
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">Edit Post</h3>
            <button
              @click="cancelEdit"
              class="text-gray-500 hover:text-gray-700"
            >
              <font-awesome-icon :icon="['fas', 'times']" class="w-5 h-5" />
            </button>
          </div>

          <input
            v-model="editingPost.title"
            type="text"
            placeholder="Post title..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <textarea
            v-model="editingPost.body"
            placeholder="What's happening?"
            rows="4"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          ></textarea>

          <div class="flex justify-end space-x-3">
            <button
              @click="cancelEdit"
              class="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              @click="saveEdit"
              :disabled="!editingPost.title.trim() || !editingPost.body.trim()"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <font-awesome-icon :icon="['fas', 'check']" class="w-5 h-5" />
              Save
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="posts.length === 0" class="text-center py-12">
        <i class="fas fa-comments text-6xl text-gray-300 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
        <p class="text-gray-500 mb-6">Share your first thought with the world!</p>
        <button
          @click="showCreateForm = true"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Create Your First Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'PostsManager',
  setup() {
    const posts = ref([
      {
        id: 1,
        title: "Welcome to our social platform!",
        body: "This is your first post. Feel free to share your thoughts, experiences, and connect with others. What's on your mind today?",
        timestamp: new Date().toISOString()
      }
    ])

    const newPost = reactive({
      title: '',
      body: ''
    })

    const editingPost = ref(null)
    const showCreateForm = ref(false)

    const createPost = () => {
      if (newPost.title.trim() && newPost.body.trim()) {
        const post = {
          id: Date.now(),
          title: newPost.title,
          body: newPost.body,
          timestamp: new Date().toISOString()
        }
        posts.value.unshift(post)
        newPost.title = ''
        newPost.body = ''
        showCreateForm.value = false
      }
    }

    const deletePost = (id) => {
      if (confirm('Are you sure you want to delete this post?')) {
        posts.value = posts.value.filter(post => post.id !== id)
      }
    }

    const startEdit = (post) => {
      editingPost.value = { ...post }
    }

    const saveEdit = () => {
      const index = posts.value.findIndex(post => post.id === editingPost.value.id)
      if (index !== -1) {
        posts.value[index] = { ...editingPost.value }
      }
      editingPost.value = null
    }

    const cancelEdit = () => {
      editingPost.value = null
    }

    const cancelCreate = () => {
      newPost.title = ''
      newPost.body = ''
      showCreateForm.value = false
    }

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp)
      const now = new Date()
      const diffInHours = (now - date) / (1000 * 60 * 60)

      if (diffInHours < 1) {
        return 'Just now'
      } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)}h ago`
      } else {
        return date.toLocaleDateString()
      }
    }

    return {
      posts,
      newPost,
      editingPost,
      showCreateForm,
      createPost,
      deletePost,
      startEdit,
      saveEdit,
      cancelEdit,
      cancelCreate,
      formatTimestamp
    }
  }
}
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
