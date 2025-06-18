<template>
  <div class="bg-gradient-to-br from-gray-200 to-indigo-400 min-h-screen flex flex-col items-center justify-center p-4">

    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
      <!-- Toggle Buttons -->
      <div class="flex mb-8 bg-gray-100 rounded-lg p-1">
        <button
          @click="isLogin = true"
          :class="['flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200',
                   isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800']"
        >
          Login
        </button>
        <button
          @click="isLogin = false"
          :class="['flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200',
                   !isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800']"
        >
          Register
        </button>
      </div>
    <!-- Logo on top -->
    <div class="flex justify-center mb-6">
      <img src="../../Assets/logo.png" alt="Echoes Logo" class="w-30 h-30 object-cover rounded-full shadow-lg " />
    </div>
      <!-- Login Form -->
      <Login v-if="isLogin"/>

      <!-- Register Form -->
      <Register v-else/>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Login from './Components/Login.vue'
import Register from './Components/Register.vue'

export default {
  name: 'AuthIndex',
  components:{
    Login,
    Register
  },
  setup() {
    const isLogin = ref(true)

    return {
      isLogin,
    }
  }
}
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
