<template>
  <div
    class="p-2 flex bg-gray-500 mb-2 "

  >
    <i class="pi pi-arrow-left cursor-pointer p-2 hover:bg-gray-400 rounded-full" @click="goBackToPreviousLink()"></i>
  </div>
</template>
<script>

    export default {
        setup(){
            function goBackToPreviousLink(){
                window.history.length > 1 ? window.history.back() : window.location.href = '/';
            }

            return { goBackToPreviousLink }
        }
    }

</script>
