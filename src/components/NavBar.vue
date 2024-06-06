<template>
  <aside :class="`${isExpanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img :src="logoURL" alt="EatWell" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="toggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link v-if="user" :to="'/profile/' + user.uid" class="button">
        <span class="material-icons">account_circle</span>
        <span class="text">Profile</span>
      </router-link>
      <router-link v-if="user" to="/" class="button">
        <span class="material-icons">dashboard</span>
        <span class="text">Home</span>
      </router-link>
      <router-link v-if="user && user.isAdmin" to="/add-recipe" class="button">
        <span class="material-icons">add_circle</span>
        <span class="text">Add Recipe</span>
      </router-link>
      <router-link v-if="user" to="/recipes" class="button">
        <span class="material-icons">restaurant_menu</span>
        <span class="text">Recipes</span>
      </router-link>
      <router-link v-if="!user" to="/auth" class="button">
        <span class="material-icons">login</span>
        <span class="text">Register</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link v-if="user" to="/bye" @click="leave" class="button">
        <span class="material-icons">exit_to_app</span>
        <span class="text">Sign out</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import logoURL from '../assets/logo.png';
import signOut from "@/firebase/Authentification/SignOut";
import { getUser, waitForAuthInit, observeUserState, getUserById } from "@/firebase/Authentification/getUser";

const isExpanded = ref(false);
const user = ref(null);
const router = useRouter();

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
  localStorage.setItem("is_expanded", isExpanded.value.toString());
};

const leave = () => {
  signOut();
  router.push('/');
};

const userChanged = async (_user) => {
  if (!_user) {
    user.value = null;
    return;
  }
  user.value = await getUserById(_user.uid);
};

onMounted(async () => {
  const expandedValue = localStorage.getItem("is_expanded");
  isExpanded.value = expandedValue === "true";

  await waitForAuthInit();
  const usera = getUser();
  if (usera) {
    user.value = await getUserById(usera.uid);
  }
  observeUserState(userChanged);
});
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  background-color: #ffe5b4;
  color: #333;
  width: 4rem;
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: width 0.2s ease-in-out;

  .logo {
    margin-bottom: 1rem;
    img {
      width: 3rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    .menu-toggle {
      transition: transform 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: #333;
        transition: color 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: #ff6347;
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3, .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: #666;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: background-color 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: #333;
        transition: color 0.2s ease-in-out;
      }
      .text {
        color: #333;
        transition: color 0.2s ease-in-out;
      }

      &:hover {
        background-color: #ffdd99;

        .material-icons, .text {
          color: #ff6347;
        }
      }

      &.router-link-exact-active {
        background-color: #ffdd99;
        border-right: 5px solid #ff6347;

        .material-icons, .text {
          color: #ff6347;
        }
      }
    }
  }

  .flex {
    flex: 1;
  }

  &.is-expanded {
    width: 16rem;

    .menu-toggle {
      transform: rotate(-180deg);
    }

    h3, .button .text {
      opacity: 1;
    }

    .button .material-icons {
      margin-right: 1rem;
    }
  }
}
</style>
