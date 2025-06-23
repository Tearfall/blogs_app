<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border-2 border-blue-200">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Create Post</h3>
      <button
        @click="$emit('cancel')"
        class="text-gray-500 hover:text-gray-700"
      >
        <font-awesome-icon :icon="['fas', 'times']" class="w-5 h-5" />
      </button>
    </div>

    <input
      v-model="post.title"
      type="text"
      placeholder="Post title..."
      class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />

    <textarea
      v-model="post.body"
      placeholder="What's happening?"
      rows="4"
      class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
    ></textarea>

    <div class="flex justify-end space-x-3">
      <button
        @click="$emit('cancel')"
        class="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
      >
        Cancel
      </button>
      <button
        @click="handleSubmit"
        :disabled="!post.title.trim() || !post.body.trim()"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Post
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'CreatePostForm',
  emits: ['create', 'cancel'],
  setup(props, { emit }) {
    const post = reactive({
      title: '',
      body: ''
    })

    const handleSubmit = () => {
      if (post.title.trim() && post.body.trim()) {
        emit('create', {
          title: post.title,
          body: post.body
        })
        post.title = ''
        post.body = ''
      }
    }

    return {
      post,
      handleSubmit
    }
  }
}
</script>
