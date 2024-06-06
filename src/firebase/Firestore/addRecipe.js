import { projectFirestore } from '../Config.js'

const addRecipe = async (uid, data) => {
  if (data == null) {
    return;
  }
  const recipeRef = await projectFirestore.collection('recipes').add(data);
  const recipeID = recipeRef.id;

  const usersRef = projectFirestore.collection('users').doc(uid);
  const user = await usersRef.get();
  const currentRecipes = user.data().recipes || [];
  currentRecipes.push(recipeID);
  await usersRef.update({ recipes: currentRecipes });

}

const deleteRecipe = async (uid, recipeID) => {
  const RecipeRef = projectFirestore.collection('recipes').doc(recipeID);

  try {
      await RecipeRef.delete();

      const usersRef = projectFirestore.collection('users').doc(uid);
      const user = await usersRef.get();
      const currentRecipes = user.data().recipes || [];
      const updatedRecipes = currentRecipes.filter(id => id !== recipeID);
      await usersRef.update({ recipes: updatedRecipes });

  } catch (error) {
      console.error('Error deleting recipe:', error);
  }
};


const UpdateRecipe = async (recipeID, data) => {
  const RecipeRef = projectFirestore.collection('recipes').doc(recipeID);
  try {
      await RecipeRef.update(data);
  } catch (error) {
      console.error('Error updating recipe:', error);
  }
}

const appendComment = async (recipeID, uid, msg) => {
  const recipeRef = projectFirestore.collection('recipes').doc(recipeID);
  try {
      const recipeDoc = await recipeRef.get();
      if (!recipeDoc.exists) {
          throw new Error('Thread document does not exist.');
      }
      const currentAnswers = recipeDoc.data().answers || [];
      currentAnswers.push({message: msg, author: uid});
      await recipeRef.update({ answers: currentAnswers });
      console.log('Answer appended successfully!');
  } catch (error) {
      console.error('Error appending answer:', error);
  }
};

export {addRecipe, appendComment, deleteRecipe, UpdateRecipe}
