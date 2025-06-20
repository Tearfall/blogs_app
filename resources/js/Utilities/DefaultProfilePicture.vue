<template>
    <div class="bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
        {{ userName ? userName.charAt(0).toUpperCase() : 'U' }}
    </div>
</template>
<script>
    export default {
        props:{
            userName: {
                type: String,
                default: "User"
            }
        }
    }
</script>
