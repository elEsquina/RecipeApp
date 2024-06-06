import { ref } from 'vue';
import {projectFirestore, projectAuth} from "@/firebase/Config";

const user = ref(projectAuth.currentUser);
let authInitialized = false;
let authResolve;

const authReady = new Promise(resolve => {
  authResolve = resolve;
});

const observeUserState = (callBack) => {
  return projectAuth.onAuthStateChanged(callBack);
}

projectAuth.onAuthStateChanged(_user => {
  user.value = _user;
  authInitialized = true;
  authResolve(); 
});

const getUser = () => {
  return user.value;
}

const isLogged = () => {
  return !!user.value;
}

const waitForAuthInit = () => {
  if (authInitialized) {
    return Promise.resolve();
  }
  return authReady;
}


const getUserById = async (uid) => {
  let res = await projectFirestore.collection('users').doc(uid).get();
  return {...res.data(), uid: uid};
};



export { getUser, isLogged, waitForAuthInit, getUserById, observeUserState };
