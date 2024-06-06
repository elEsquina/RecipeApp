<template>
  <div class="container mx-auto p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="regime in regimes" :key="regime.name" class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img :src="regime.photo" :alt="regime.name" class="w-full h-48 object-cover">
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ regime.name }}</h2>
          <p class="text-gray-700 mb-2">{{ regime.description }}</p>
          <div class="flex justify-between items-center">
            <p class="text-gray-600">Example Foods: {{ regime.exampleFoods.join(', ') }}</p>
            <router-link :to="'/recipes?regime=' + encodeURIComponent(regime.name)" class="text-indigo-600">View Recipes</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regimes: [
        {
          "name": "Végétalien",
          "description": "Un régime qui exclut tous les produits d'origine animale.",
          "exampleFoods": [
            "Fruits",
            "Légumes",
            "Légumineuses",
            "Noix",
            "Graines"
          ],
          "photo": "https://www.exemple.com/regimes/images/vegetalien.png"
        },
        {
          "name": "Végétarien",
          "description": "Un régime qui exclut la viande mais inclut des produits d'origine animale comme les œufs et les produits laitiers.",
          "exampleFoods": [
            "Fruits",
            "Légumes",
            "Céréales",
            "Œufs",
            "Produits laitiers"
          ],
          "photo": "https://www.exemple.com/regimes/images/vegetarien.png"
        },
        {
          "name": "Vegan",
          "description": "Un régime qui exclut tous les produits d'origine animale ainsi que leurs dérivés.",
          "exampleFoods": [
            "Fruits",
            "Légumes",
            "Légumineuses",
            "Noix",
            "Graines"
          ],
          "photo": "https://www.exemple.com/regimes/images/vegan.png"
        },
        // Add other regimes here
      ]
    }
  }
}
</script>

<style>
/* Add your Tailwind CSS styles here */
</style>
