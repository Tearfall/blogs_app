<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click="$emit('cancel')"
  >
    <div
      class="bg-white rounded-lg p-6 w-full max-w-lg"
      @click.stop
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Edit Post</h3>
        <button
          @click="$emit('cancel')"
          class="text-gray-500 hover:text-gray-700"
        >
          <font-awesome-icon :icon="['fas', 'times']" class="w-5 h-5" />
        </button>
      </div>

      <input
        v-model="editedPost.title"
        type="text"
        placeholder="Post title..."
        class="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <textarea
        v-model="editedPost.body"
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
          @click="handleSave"
          :disabled="!editedPost.title.trim() || !editedPost.body.trim()"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <font-awesome-icon :icon="['fas', 'check']" class="w-5 h-5" />
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
  name: 'EditPostForm',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const editedPost = reactive({
      id: props.post.id,
      title: props.post.title,
      body: props.post.body,
      updated_at: props.post.updated_at
    })

    // Watch for prop changes (in case the post being edited changes)
    watch(() => props.post, (newPost) => {
      editedPost.id = newPost.id
      editedPost.title = newPost.title
      editedPost.body = newPost.body
      editedPost.updated_at = newPost.updated_at
    }, { deep: true })

    const handleSave = () => {
      if (editedPost.title.trim() && editedPost.body.trim()) {
        emit('save', { ...editedPost })
      }
    }

    return {
      editedPost,
      handleSave
    }
  }
}
</script>
