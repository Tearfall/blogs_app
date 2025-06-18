import { defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore("post", {
    state: () => ({
        posts: [],
        post: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchPosts() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get("/api/posts");
                this.posts = response.data;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to fetch posts";
            } finally {
                this.loading = false;
            }
        },

        async fetchPost(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`/api/posts/${id}`);
                this.post = response.data;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to fetch post";
            } finally {
                this.loading = false;
            }
        },

        async createPost(data) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post("/api/posts", data);
                this.posts.push(response.data);
                return { success: true, data: response.data };
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to create post";
                return { success: false, error: this.error };
            } finally {
                this.loading = false;
            }
        },

        async updatePost(id, data) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.put(`/api/posts/${id}`, data);
                // Update the post in the posts array
                const idx = this.posts.findIndex((p) => p.id === id);
                if (idx !== -1) this.posts[idx] = response.data;
                return { success: true, data: response.data };
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to update post";
                return { success: false, error: this.error };
            } finally {
                this.loading = false;
            }
        },

        async deletePost(id) {
            this.loading = true;
            this.error = null;
            try {
                await axios.delete(`/api/posts/${id}`);
                this.posts = this.posts.filter((p) => p.id !== id);
                return { success: true };
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to delete post";
                return { success: false, error: this.error };
            } finally {
                this.loading = false;
            }
        },

        clearError() {
            this.error = null;
        },
    },
});
