<template>
    <!-- Header -->
    <div class="flex justify-between bg-blue-600 text-white py-4 px-6 shadow-md">
      <h1 class="text-2xl font-bold">Blogii</h1>
      <button @click="logout">Logout</button>
    </div>
</template>
<script>
    import { useAuthStore } from '../stores/authStore';

    export default {
        setup() {
            const { logout } = useAuthStore()

            return { logout }
        }
    }
</script>
