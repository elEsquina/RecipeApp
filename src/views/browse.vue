<template>
    <div class="container mx-auto p-8">
      <!-- Filter section -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <label for="tagFilter" class="block text-sm font-medium text-gray-700">Filter by Tag:</label>
          <select v-model="selectedTag" id="tagFilter" name="tagFilter" class="mt-1 block w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">All</option>
            <option v-for="tag in allTags" :value="tag" :key="tag">{{ tag }}</option>
          </select>
        </div>
        <div>
          <label for="regimeFilter" class="block text-sm font-medium text-gray-700">Filter by Regime:</label>
          <select v-model="selectedRegime" id="regimeFilter" name="regimeFilter" class="mt-1 block w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">All</option>
            <option v-for="regime in allRegimes" :value="regime" :key="regime">{{ regime }}</option>
          </select>
        </div>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="recipe in filteredRecipes" :key="recipe.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
          <recipePreview :recipe="recipe"/>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { getRecipes } from '@/firebase/Firestore/getRecipe.js';
import recipePreview from '@/components/recipePreview.vue';

export default {
components: { recipePreview },
data() {
    return {
    recipes: [],
    selectedTag: '',
    selectedRegime: '',
    }
},
async created() {
    this.selectedRegime = this.$route.query.regime || ''; 
    this.$router.replace({ query: {} });
    const {posts, error, load} = await getRecipes();
    await load();
    console.log(posts.value);
    this.recipes = posts.value;
},
computed: {
    allTags() {
    const tags = new Set();
    this.recipes.forEach(recipe => {
        recipe.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
    },
    allRegimes() {
    const regimes = new Set();
    this.recipes.forEach(recipe => {
        regimes.add(recipe.regime);
    });
    return Array.from(regimes);
    },
    filteredRecipes() {
    let filtered = this.recipes;
    if (this.selectedTag) {
        filtered = filtered.filter(recipe => recipe.tags.includes(this.selectedTag));
    }
    if (this.selectedRegime) {
        filtered = filtered.filter(recipe => recipe.regime === this.selectedRegime);
    }
    return filtered;
    }
}
}
</script>

<style>

</style>
  