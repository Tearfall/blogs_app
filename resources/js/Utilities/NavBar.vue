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
    import { ref,computed } from 'vue'
    import { TieredMenu } from 'primevue';
    import { router } from '@inertiajs/vue3'
    import { usePage } from '@inertiajs/vue3'

    export default {
        props: {

        },
        components: {
            TieredMenu
        },
        setup(props) {
            const { logout } = useAuthStore()
            const selectedMenu = ref()
            const options = ['Profile', 'Logout']

            const page = usePage();
            const user = computed(() => page.props.auth?.user);

            const menu = ref();
            const items = ref([
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => {
                        if (user.value && user.value.id) {
                            router.visit(route('profile.index', { id: user.value.id }))
                        }
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
                menu,
                user
            }
        }
    }
</script>
