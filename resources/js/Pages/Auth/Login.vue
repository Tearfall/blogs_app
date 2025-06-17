<template>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="text-center mb-6">
          <h2 class="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p class="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div>
          <label for="login-email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="login-email"
            v-model="loginForm.email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="login-password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="login-password"
            v-model="loginForm.password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            placeholder="Enter your password"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              v-model="loginForm.remember"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-700">Remember me</span>
          </label>
          <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          Sign In
        </button>
      </form>

      <!-- Success Message -->
      <div v-if="showMessage" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-green-800 text-sm">{{ message }}</p>
      </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../../stores/authStore'

export default {
  name: 'Login',
  setup() {
    const {
        login
    } = useAuthStore()

    const showMessage = ref(false)
    const message = ref('')

    const loginForm = reactive({
      email: '',
      password: '',
      remember: false
    })

    const handleLogin = () => {
      // Basic validation
      if (!loginForm.email || !loginForm.password) {
        showNotification('Please fill in all fields')
        return
      }

      // Simulate login process
      console.log('Login attempt:', loginForm)
      login(loginForm)
      showNotification('Login successful!')

      // Reset form
      Object.assign(loginForm, {
        email: '',
        password: '',
        remember: false
      })
    }

    const showNotification = (msg) => {
      message.value = msg
      showMessage.value = true
      setTimeout(() => {
        showMessage.value = false
      }, 3000)
    }

    return {

      loginForm,

      showMessage,
      message,
      handleLogin,

    }
  }
}
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
