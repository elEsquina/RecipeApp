<template>
  <div class="recipe-card">
    <img :src="recipe.image" :alt="recipe.nom" class="w-full h-48 object-cover">
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">{{ recipe.nom }}</h2>
      <p class="text-gray-700 mb-2">{{ recipe.description }}</p>
      <div class="flex justify-between items-center">
        <p class="text-gray-600">{{ recipe.regime }}</p>
        <router-link :to="'/recipe/' + recipe.id" class="text-indigo-600">View Recipe</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.recipe-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.recipe-card img {
  border-bottom: 1px solid #e2e8f0;
}

.recipe-card h2 {
  color: #1a202c;
}

.recipe-card p {
  color: #4a5568;
}
</style>
