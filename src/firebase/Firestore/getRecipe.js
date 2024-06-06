import { projectFirestore } from '../Config.js'
import { ref } from 'vue'

const getRecipes = () => {
    const posts = ref([]);
    const error = ref(null);
    
    const load = async () => { 
     try {
        const querySnapshot = await projectFirestore.collection('recipes').get();
        
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        posts.value = documents;
     }
     catch(err) {
        error.value = err.message
     }
      }
    
      return {posts, error, load}   
}

const getRecipe = async (id) => {
   try {
      const doc = await projectFirestore.collection('recipes').doc(id).get();
      if (!doc.exists) {
         throw Error('That recipe does not exist');
      }
      return { id: doc.id, ...doc.data() };
   }
   catch(err) {
      error.value = err.message
   }
}


export { getRecipes, getRecipe}