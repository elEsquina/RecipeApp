<template>

  <div class="navbar">
    <NavBar/>
  </div>

  <main>
	  <router-view/>
  </main>

</template>

<script>
import { isLogged, getUser, waitForAuthInit } from '@/firebase/Authentification/getUser'; 
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: { NavBar },
  data() {},
  methods: {
  },

  mounted() {},
}
</script>

<style lang="scss">
:root {
	--primary-alt:#58508d;
	--primary: #ffffff;
	--grey: #8bd0c2;
	--dark:#003f5c;
	--dark-alt:#bab8b1;
	--button:#bc5090;
	--button-hover:#b83383;
	--button-active:#ffa600;
	--buttton-active-hover:rgb(197, 137, 25);
	--light:#e8e1c5;
	--sidebar-width: 300px;
	--widthsize: calc(2rem + 32px)
}

.navbar {
	position: fixed;
	top: 0;
	width: var(--widthsize);
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	z-index: 1000;
}
.navbar > * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	background: var(--primary);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

#app {
	display: flex;
	flex-wrap: wrap;
	main {
		flex: 1 1 0;
		margin-left: var(--widthsize)
	}
}

body, html {
  font-family: 'Fira sans', sans-serif;
  padding: 0;
  margin: 0;
}

</style>