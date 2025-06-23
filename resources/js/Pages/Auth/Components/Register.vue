<template>
    <Head title="Register |" />
    <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="text-center mb-6">
            <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
            <p class="text-gray-600 mt-2">Join us today</p>
        </div>

        <div>
            <div>
                <label
                    for="register-name"
                    class="block text-sm font-medium text-gray-700 mb-2"
                >
                    Name
                </label>
                <input
                    id="register-name"
                    v-model="registerForm.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    placeholder="Name"
                />
            </div>
        </div>

        <div>
            <label
                for="register-email"
                class="block text-sm font-medium text-gray-700 mb-2"
            >
                Email Address
            </label>
            <input
                id="register-email"
                v-model="registerForm.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter your email"
            />
        </div>

        <div>
            <label
                for="register-password"
                class="block text-sm font-medium text-gray-700 mb-2"
            >
                Password
            </label>
            <input
                id="register-password"
                v-model="registerForm.password"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Create a password"
            />
        </div>

        <div>
            <label
                for="register-confirmPassword"
                class="block text-sm font-medium text-gray-700 mb-2"
            >
                Confirm Password
            </label>
            <input
                id="register-confirmPassword"
                v-model="registerForm.confirmPassword"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Confirm your password"
            />
        </div>

        <!-- <div class="flex items-center">
          <input
            v-model="registerForm.acceptTerms"
            type="checkbox"
            required
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span class="ml-2 text-sm text-gray-700">
            I agree to the
            <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms of Service</a>
            and
            <a href="#" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
          </span>
        </div> -->

        <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
            <span v-if="authStore.loading">Creating...</span>
            <span v-else>Create Account</span>
        </button>
    </form>

    <!-- Error Message -->
    <div
        v-if="authStore.error"
        class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
    >
        <p class="text-red-800 text-sm">{{ authStore.error }}</p>
    </div>
    <!-- Success Message -->
    <div
        v-if="showMessage"
        class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
    >
        <p class="text-green-800 text-sm">{{ message }}</p>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useAuthStore } from "../../../stores/authStore";

export default {
    name: "Register",
    setup() {
        const authStore = useAuthStore();

        const showMessage = ref(false);
        const message = ref("");

        const registerForm = reactive({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        const handleRegister = async () => {
            if (
                !registerForm.name ||
                !registerForm.email ||
                !registerForm.password ||
                !registerForm.confirmPassword
            ) {
                showNotification("Please fill in all fields");
                return;
            }

            if (registerForm.password !== registerForm.confirmPassword) {
                showNotification("Passwords do not match");
                return;
            }

            const result = await authStore.register(registerForm);
            if (result.success) {
                showNotification("Account created successfully!");
                Object.assign(registerForm, {
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            }
        };

        const showNotification = (msg) => {
            message.value = msg;
            showMessage.value = true;
            setTimeout(() => {
                showMessage.value = false;
            }, 3000);
        };

        return {
            registerForm,
            showMessage,
            message,
            handleRegister,
            authStore,
        };
    },
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
