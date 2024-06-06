<template>
    <div v-if="recipe" class="create-container bg-yellow-100 text-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center">{{ recipe.nom }}</h1>
      <img :src="recipe.image" :alt="recipe.nom" class="w-48 h-auto mb-6 rounded-lg mx-auto">
      
      <p class="mb-4 text-lg">{{ recipe.description }}</p>
      
      <div class="details mb-6">
        <p><strong>Régime:</strong> {{ recipe.regime }}</p>
        <p><strong>Portions:</strong> {{ recipe.portions }}</p>
        <p><strong>Temps de préparation:</strong> {{ recipe.temps_preparation }} minutes</p>
        <p><strong>Temps de cuisson:</strong> {{ recipe.temps_cuisson }} minutes</p>
      </div>
      
      <div class="ingredients mb-6">
        <h2 class="text-xl font-bold mb-2">Ingrédients</h2>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.nom" class="mb-2">
            {{ ingredient.nom }} - {{ ingredient.quantité }} {{ ingredient.unité }}
          </li>
        </ul>
      </div>
      
      <div class="instructions mb-6">
        <h2 class="text-xl font-bold mb-2">Instructions</h2>
        <ol>
          <li v-for="(instruction, index) in recipe.instructions" :key="index" class="mb-2">
            {{ instruction }}
          </li>
        </ol>
      </div>
      
      <div class="flex justify-center mb-6">
        <router-link :to="'/edit-recipe/' + recipe.id" class="btn-edit mr-2">Edit</router-link>
        <button @click="deleting" class="btn-delete">Delete</button>
      </div>
      
      <div v-if="comments && comments.length > 0" class="comments mb-6">
        <h2 class="text-xl font-bold mb-2">Commentaires</h2>
        <div v-for="(comment, id) in comments" :key="id" class="comment mb-2">
          <p><router-link :to="'/profile/' + comment.authid"><strong>{{ comment.author }}</strong></router-link></p>
          <p>{{ comment.message }}</p>
        </div>
      </div>
      
      <div v-if="canComment" class="comment-form">
        <h2 class="text-xl font-bold mb-2">Ajouter un commentaire</h2>
        <textarea v-model="newCommentContent" placeholder="Tapez votre commentaire ici..." class="input mb-4"></textarea>
        <button @click="addComment" class="btn-submit">Commenter</button>
      </div>
    </div>
  </template>
  
  
  <script>
  import { getUserById, getUser } from '@/firebase/Authentification/getUser';
  import { getRecipes, getRecipe} from '@/firebase/Firestore/getRecipe.js';
  import { appendComment, deleteRecipe } from '@/firebase/Firestore/addRecipe.js';
  
  export default {
    name: 'Recipe',
    data() {
      return {
        recipe: null,
        comments: null,
        canComment: true,
        newCommentContent: ''
      };
    },
    async created() {
        const recipe = await getRecipe(this.$route.params.id);
        this.recipe = recipe;
        for (const comment of recipe.answers) {
            comment.authid = comment.author;
            comment.author = await this.getUserName(comment.author);
        }
        this.comments = recipe.answers;
    },
    methods: {
      async deleting(){
        await deleteRecipe(this.$route.params.id);
        this.$router.push('/recipes');
      },
      async addComment() {
        if (this.newCommentContent.trim() !== '') {
          const newComment = {
            comment: this.newCommentContent,
            userID: getUser().uid,
          };
          await appendComment(this.$route.params.id, newComment.userID, newComment.comment);
          window.location.reload();
        }
      },
      async getUserName(id) {
        const user = await getUserById(id);
        return user.displayName;
      }
  
    }
  };
  </script>
  
  <style>
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
  