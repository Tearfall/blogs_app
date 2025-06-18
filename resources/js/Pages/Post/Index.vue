<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="flex justify-between bg-blue-600 text-white py-4 px-6 shadow-md">
      <h1 class="text-2xl font-bold">Social Posts</h1>
      <button @click="logout">Logout</button>
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
      <CreatePostForm
        v-if="showCreateForm"
        @create="handleCreatePost"
        @cancel="showCreateForm = false"
      />

      <!-- Posts List -->
      <PostList
        :posts="posts"
        @edit="handleEditPost"
        @delete="handleDeletePost"
        @create-first-post="showCreateForm = true"
      />

      <!-- Edit Modal -->
      <EditPostForm
        v-if="editingPost"
        :post="editingPost"
        @save="handleSaveEdit"
        @cancel="editingPost = null"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import CreatePostForm from '../Post/Components/CreatePostForm.vue'
import EditPostForm from '../Post/Components/EditPostForm.vue'
import PostList from '../Post/Components/PostList.vue'
import { usePostStore } from '../../stores/postStore'
import { useAuthStore } from '../../stores/authStore'

export default {
  name: 'PostIndex',
  components: {
    CreatePostForm,
    EditPostForm,
    PostList
  },
  props: {
    posts: {
        type: Array,
        required: true
    }
  },
  setup(props) {
    const { initAuth, logout } = useAuthStore()
    const {
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
    } = usePostStore()

    const editingPost = ref(null)
    const showCreateForm = ref(false)

    const handleCreatePost = (postData) => {
      const post = {
        title: postData.title,
        body: postData.body,
      }
      createPost(postData)
      showCreateForm.value = false
    }

    const handleDeletePost = (id) => {
      deletePost(id)
    }

    const handleEditPost = (post) => {
      editingPost.value = { ...post }
    }

    const handleSaveEdit = (updatedPost) => {
      updatePost(updatedPost.id, updatedPost)
      editingPost.value = null
    }

    onMounted(() => {
      // Any initialization logic can go here
      initAuth()
    })

    return {
      editingPost,
      showCreateForm,
      handleCreatePost,
      handleDeletePost,
      handleEditPost,
      handleSaveEdit,
      logout
    }
  }
}
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
