<template>
  <div class="create-container bg-yellow-100 text-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-6 text-center">Add New Recipe</h2>

    <form @submit.prevent="submitRecipe">
      <div class="flex flex-wrap -mx-2 mb-4">
        <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label for="recipe-title" class="block mb-1">Recipe Title:</label>
          <input type="text" id="recipe-title" v-model="recipeTitle" required class="input mb-2" />
          
          <label for="recipe-image" class="block mb-1">Image URL:</label>
          <input type="url" id="recipe-image" v-model="recipeImage" required class="input mb-2" />
          
          <label for="recipe-description" class="block mb-1">Description:</label>
          <textarea id="recipe-description" v-model="recipeDescription" required class="input mb-2"></textarea>
        </div>
        
        <div class="w-full md:w-1/2 px-2">
          <label for="recipe-preptime" class="block mb-1">Prep Time (minutes):</label>
          <input type="number" id="recipe-preptime" v-model="preparationTime" required class="input mb-2" />
          
          <label for="recipe-cooktime" class="block mb-1">Cook Time (minutes):</label>
          <input type="number" id="recipe-cooktime" v-model="cookingTime" required class="input mb-2" />
          
          <label for="recipe-diet" class="block mb-1">Diet Type:</label>
          <select type="text" id="recipe-diet" v-model="dietType" required class="input mb-2">
            <option value="Omnivore">Omnivore</option>
            <option value="Végétarien">Végétarien</option>
            <option value="Vegan">Végétalien (Vegan)</option>
            <option value="Pescétarien">Pescétarien</option>
            <option value="Flexitarien">Flexitarien</option>
            <option value="Fruitarien">Fruitarien</option>
            <option value="Crudivore">Crudivore</option>
            <option value="Paleo">Paleo</option>
            <option value="Cétogène">Cétogène (Keto)</option>
            <option value="Sans gluten">Sans gluten</option>
          </select>
          
          <label for="recipe-portions" class="block mb-1">Portions:</label>
          <input type="number" id="recipe-portions" v-model="portions" required class="input mb-2" />
          
          <label for="recipe-tags" class="block mb-1">Tags (comma separated):</label>
          <input type="text" id="recipe-tags" v-model="tags" class="input mb-2" />
  
        </div>
      </div>

      <div class="form-group mb-4">
        <label for="recipe-ingredients" class="block mb-1">Ingredients:</label>
        <div v-for="(ingredient, index) in ingredients" :key="index" class="flex items-center mb-2">
          <input type="text" required v-model="ingredient.nom" placeholder="Name" class="input mr-2" />
          <input type="number" required v-model="ingredient.quantité" placeholder="Quantity" class="input mr-2" />
          <input type="text" required v-model="ingredient.unité" placeholder="Unit" class="input mr-2" />
          <button type="button" @click="removeIngredient(index)" class="btn-danger px-2">✕</button>
        </div>
        <button type="button" @click="addIngredient" class="btn mb-2">Add Ingredient</button>
      </div>

      <div class="form-group mb-4">
        <label for="recipe-instructions" class="block mb-1">Instructions:</label>
        <div v-for="(instruction, index) in instructions" :key="index" class="flex items-center mb-2">
          <textarea required v-model="instructions[index]" placeholder="Step" class="input mr-2"></textarea>
          <button type="button" @click="removeInstruction(index)" class="btn-danger px-2">✕</button>
        </div>
        <button type="button" @click="addInstruction" class="btn mb-2">Add Instruction</button>
      </div>

      <button type="submit" class="btn-submit w-full">Submit Recipe</button>
    </form>
  </div>
</template>

<script>
import { getUser } from '@/firebase/Authentification/getUser';
import { addRecipe } from '@/firebase/Firestore/addRecipe';

export default {
  data() {
    return {
      recipeTitle: '',
      recipeImage: '',
      recipeDescription: '',
      ingredients: [{ nom: '', quantité: '', unité: '' }],
      instructions: [''],
      preparationTime: 0,
      cookingTime: 0,
      dietType: 'Omnivore',
      portions: 1,
      tags: '',
      authorID: getUser().uid,

    };
  },
  methods: {
    addIngredient() {
      this.ingredients.push({ nom: '', quantité: '', unité: '' });
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.instructions.push('');
    },
    removeInstruction(index) {
      this.instructions.splice(index, 1);
    },

    async submitRecipe() {
      const recipeData = {
        nom: this.recipeTitle,
        description: this.recipeDescription,
        ingredients: this.ingredients,
        instructions: this.instructions,
        temps_preparation: this.preparationTime,
        temps_cuisson: this.cookingTime,
        regime: this.dietType,
        portions: this.portions,
        tags: this.tags.split(',').map(tag => tag.trim()),
        image: this.recipeImage,
        authorID: this.authorID,
        answers: []
      };
      await addRecipe(recipeData.authorID, recipeData);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.create-container {
  background-color: #fff9db;
  color: #333;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #d97706;
}

.input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d97706;
  background-color: #fffaf0;
  color: #333;
}

.input:focus {
  outline: none;
  border-color: #fb923c;
}

.btn, .btn-danger, .btn-submit {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.btn {
  background-color: #228b22;
  color: #fff;
  margin-right: 0.5rem;
}

.btn:hover {
  background-color: #006400;
  transform: scale(1.05);
}

.btn-danger {
  background-color: #ef4444;
  color: #fff;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.btn-submit {
  width: 100%;
  background-color: #228b22;
  color: #fff;
  font-size: 1rem;
  margin-top: 1rem;
}

.btn-submit:hover {
  background-color: #006400;
  transform: scale(1.05);
}

.form-group {
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .create-container {
    padding: 1.25rem;
  }

  .input {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  .btn, .btn-danger, .btn-submit {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
