<template>
  <div v-if="user" class="container mx-auto p-6 bg-yellow-100 min-h-screen">
    <div class="profile-container bg-white shadow-lg rounded-lg overflow-hidden text-gray-900">
      <div class="profile-header bg-gradient-to-r from-yellow-400 to-yellow-600 p-6">
        <h1 class="text-3xl font-bold mb-2">Welcome back, Chef {{ user.fullname }}!</h1>
        <div class="profile-details">
          <p class="mb-1">
            <span class="font-semibold">Username:</span>
            <span>{{ user.displayName }}</span>
          </p>
          <p class="mb-1">
            <span class="font-semibold">Email:</span>
            <span>{{ user.email }}</span>
          </p>
          <p class="mb-1">
            <span class="font-semibold">Member Since:</span>
            <span>{{ user.createdAt }}</span>
          </p>
        </div>
      </div>
      <div class="profile-content p-6">
        <h2 class="text-2xl font-semibold mb-4">Your Cooking Activity</h2>
        <div v-if="recipes && recipes.length" class="recipes-section">
          <h3 class="text-xl font-bold mb-3">Your Recipes:</h3>
          <div class="recipe-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card bg-yellow-200 shadow-md rounded-lg p-4">
              <recipePreview :recipe="recipe"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  background-color: #fff7e0;
}
.profile-header {
  background-image: linear-gradient(to right, #f6d365, #fda085);
}
.recipe-card {
  background-color: #fff9db;
}
</style>

<script>
import recipePreview from '@/components/recipePreview.vue';
import { getUserById } from '@/firebase/Authentification/getUser';
import { getRecipe } from '@/firebase/Firestore/getRecipe';  

export default {
  name: 'Profile',
  components: { recipePreview },
  data() {
    return {
      user: null,
      recipes: []
    };
  },
  methods: {},
  async created() {
    try {
      const userId = this.$route.params.id;
      const user = await getUserById(userId);
      
      const recipes = [];
      for (const recipe of user.recipes) {
        const recipey = await getRecipe(recipe);
        recipes.push(recipey);
      }

      this.user = user;
      this.recipes = recipes;

      if (this.user) {
        this.user.createdAt = this.user.createdAt.toDate();
      } else {
        console.error('User not found.');
      }

  
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
};
</script>
  

