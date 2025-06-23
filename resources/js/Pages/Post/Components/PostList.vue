<template>
  <div class="space-y-4">
    <!-- Posts -->
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
              {{ formatTimestamp(post.created_at) }}
            </p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="$emit('edit', post)"
              class="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              title="Edit post"
            >
              <font-awesome-icon :icon="['fas', 'edit']" class="w-5 h-5" />
            </button>
            <button
              @click="handleDelete(post.id)"
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

    <!-- Empty State -->
    <div v-if="posts.length === 0" class="text-center py-12">
      <i class="fas fa-comments text-6xl text-gray-300 mb-4"></i>
      <h3 class="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
      <p class="text-gray-500 mb-6">Share your first thought with the world!</p>
      <button
        @click="$emit('create-first-post')"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Create Your First Post
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  emits: ['edit', 'delete', 'create-first-post'],
  setup(props, { emit }) {
    const handleDelete = (id) => {
      if (confirm('Are you sure you want to delete this post?')) {
        emit('delete', id)
      }
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
        return date.toLocaleString()
      }
    }

    return {
      handleDelete,
      formatTimestamp
    }
  }
}
</script>
