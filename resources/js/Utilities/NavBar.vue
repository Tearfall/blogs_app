<template>
    <!-- Header -->
    <div class="flex justify-between bg-blue-600 text-white py-4 px-6 shadow-md">
      <h1 class="text-2xl font-bold">echoes</h1>
      <Button type="button" :label="user.name" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" />
      <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup/>
    </div>
</template>
<script>
    import { useAuthStore } from '../stores/authStore';
    import { ref } from 'vue'
    import { TieredMenu } from 'primevue';
    import { router } from '@inertiajs/vue3'

    export default {
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        components: {
            TieredMenu
        },
        setup(props) {
            const { logout } = useAuthStore()
            const selectedMenu = ref()
            const options = ['Profile', 'Logout']

            const menu = ref();
            const items = ref([
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => {
                        router.visit(route('profile.index', {id: props.user.id}))
                    }
                },
                {
                    separator: true
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        logout()
                    }
                },

            ]);

            const toggle = (event) => {
                menu.value.toggle(event);
            };

            return {
                selectedMenu,
                options,
                logout,
                toggle,
                items,
                menu
            }
        }
    }
</script>
