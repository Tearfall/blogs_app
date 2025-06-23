<template>
    <div class="min-h-screen bg-gray-100">
        <NavBar />

        <!-- Main Content -->
        <div class="max-w-2xl mx-auto py-6 px-4">
            <slot />
        </div>
    </div>
</template>
<script>
import { useAuthStore } from "../stores/authStore";
import { onMounted, computed } from "vue";
import NavBar from "../Utilities/NavBar.vue";

export default {
    components: {
        NavBar,
    },
    setup() {
        const authStore = useAuthStore();

        onMounted(() => {
            authStore.fetchUser();
        });

        return {

        };
    },
};
</script>
