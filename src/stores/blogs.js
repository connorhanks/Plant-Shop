import { defineStore } from "pinia";
import { ref } from "vue";

export const useBlogsStore = defineStore("blogs", () => {
  const blogs = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchBlogs() {
    try {
      loading.value = true;
      error.value = null;
      const baseUrl = "http://192.168.1.72:3001";
      const response = await fetch(`${baseUrl}/blogs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      blogs.value = await response.json();
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching blogs:", err);
    } finally {
      loading.value = false;
    }
  }

  async function getBlogById(id) {
    if (blogs.value.length === 0) {
      await fetchBlogs();
    }
    return blogs.value.find((blog) => blog.id === id);
  }

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    getBlogById,
  };
});
