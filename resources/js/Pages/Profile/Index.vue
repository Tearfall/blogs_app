<template>
  <div class="max-w-4xl mx-auto ">
    <GoBack/>
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 mb-6 text-white">
      <div class="flex items-center space-x-6">
        <!-- Profile Picture -->
        <div class="relative" v-if="user">
          <DefaultProfilePicture :userName="userForm.name" class="w-24 h-24"/>
          <button
            class="absolute -bottom-1 -right-1 bg-white text-blue-600 text-sm rounded-full p-1 shadow-lg hover:bg-gray-50 transition-colors"
            @click="editMode = !editMode"
            v-if="isUserAuth"
          >
             <font-awesome-icon :icon="['fas', 'pen']" class="text-xs w-5 h-5" />
          </button>
        </div>

        <!-- Name and Title -->
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-2">{{ userForm.name || 'Your Name' }}</h1>
          <p class="text-blue-100">{{ userForm.title || 'Your Title' }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3">
          <button
            v-if="editMode"
            @click="saveProfile"
            class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Save Changes
          </button>
          <button
            v-if="editMode"
            @click="cancelEdit"
            class="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Basic Information -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                v-if="editMode"
                v-model="userForm.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
              <p v-else class="text-gray-900 py-2">{{ userForm.name || 'Not provided' }}</p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-if="editMode"
                v-model="userForm.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
              <p v-else class="text-gray-900 py-2">{{ userForm.email || 'Not provided' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthLayout from '../../Layouts/AuthLayout.vue';
import DefaultProfilePicture from '../../Utilities/DefaultProfilePicture.vue';
import GoBack from '../../Utilities/GoBack.vue';
import { useAuthStore } from '../../stores/authStore';
import { ref, reactive, onMounted } from 'vue';

export default {
  layout: AuthLayout,
  components: {
    DefaultProfilePicture,
    GoBack
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    isUserAuth: {
        type: Boolean,
        required: true
    }
  },
  setup(props, { emit }) {
    const { updateUserInfo } = useAuthStore();
    const editMode = ref(false);
    const showSuccessMessage = ref(false);

    // Use reactive for userForm and originalUser
    const userForm = reactive({
      name: props.user.name || '',
      email: props.user.email || ''
    });

    const originalUser = reactive({
      name: props.user.name || '',
      email: props.user.email || ''
    });

    const initializeForm = () => {
      userForm.name = props.user.name || '';
      userForm.email = props.user.email || '';
      originalUser.name = userForm.name;
      originalUser.email = userForm.email;
    };

    const saveProfile = async () => {
      // Call your store action or API here
      await updateUserInfo( userForm );

      // Update the original user data
      originalUser.name = userForm.name;
      originalUser.email = userForm.email;

      editMode.value = false;
      showSuccessMessage.value = true;
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 3000);

      emit('profile-updated', { ...userForm });
    };

    const cancelEdit = () => {
      userForm.name = originalUser.name;
      userForm.email = originalUser.email;
      editMode.value = false;
    };

    onMounted(() => {
      initializeForm();
    });

    return {
      updateUserInfo,
      editMode,
      userForm,
      originalUser,
      saveProfile,
      cancelEdit,
      showSuccessMessage
    };
  }
}
</script>
