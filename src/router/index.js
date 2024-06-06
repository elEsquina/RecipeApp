import { createRouter, createWebHistory } from 'vue-router';

import AuthView from '../views/auth.vue';
import Browse from '../views/browse.vue';
import ProfileView from '../views/profile.vue'; 
import recipeDetails from '../views/recipeDetails.vue';
import Home from '../views/home.vue';
import Create from '../views/create.vue';
import Edit from '../views/edit.vue';

import { isLogged, waitForAuthInit } from '@/firebase/Authentification/getUser'; 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: AuthView,
      meta: { requiresAuth: false }
    },
    {
      path: '/add-recipe',
      name: 'add-recipe',
      component: Create,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/edit-recipe/:id',
      name: 'edit-recipe',
      component: Edit,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: recipeDetails,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Browse,
      meta: { requiresAuth: true }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  waitForAuthInit().then(() => {
    const isAuthenticated = isLogged();

    if (requiresAuth && !isAuthenticated) {
      //next({ path: '/auth' });
    } else {
      next();
    }
  });
});

export default router;
