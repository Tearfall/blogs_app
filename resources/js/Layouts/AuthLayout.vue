<template>
    <div class="min-h-screen bg-gray-100">
        <NavBar :user="user"/>

        <!-- Main Content -->
        <div class="max-w-2xl mx-auto py-6 px-4">
            <slot/>
        </div>
    </div>
</template>
<script>
    import { useAuthStore } from '../stores/authStore';
    import { onMounted } from 'vue';
    import NavBar from '../Utilities/NavBar.vue';

    export default {
        components: {
            NavBar
        },
        setup(){
            const { initAuth, getUser } = useAuthStore()

            onMounted(() =>{ initAuth })

            return {
                user : getUser
            }
        }
    }
</script>
