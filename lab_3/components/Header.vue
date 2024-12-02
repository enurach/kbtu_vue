<template>
    <header>
      <button @click="toggleSideMenu" id="menu-button">
        <img src='../assets/menu.svg' />
      </button>
      <div id = 'header-text'>
            <p><NuxtLink to="/" style="text-decoration: none; color: inherit;">New trips on Fall season! Full details on our Instagram account</NuxtLink></p>
      </div>
      <button id="profile" @click="store.toggleLoginDropdown()">
        <img :src="`/images/${avatar}`"/>
      </button>
    </header>
    <div v-show="store.loginDropdownIsOpen && !userStore.isLoggedIn"class="dropdown">
      <div @click="login" class="fil">LOGIN</div>
      <div class="fil"><NuxtLink to="/register" @click="handleClick" style="text-decoration: none; color: inherit;">REGISTER</NuxtLink></div>
    </div>
    <div v-show="store.loginDropdownIsOpen && userStore.isLoggedIn"class="dropdown">
        <div class="fil"><NuxtLink to="/my-profile" @click="handleClick" style="text-decoration: none; color: inherit;">MY PROFILE</NuxtLink></div>
        <div class="fil"><NuxtLink to="/my-friends" @click="handleClick" style="text-decoration: none; color: inherit;">FAVORITES</NuxtLink></div>
        <div class="fil" @click="logOut()">LOG OUT</div>
      </div>
</template>
  
<script setup>
  import { useStore } from './stores/index'
  import { useUserStore } from '~/stores/users';
  import { useRouter } from 'vue-router'; // `useRouter` for navigation


  const store = useStore();
  const userStore = useUserStore();

  const user_photo = ref('avatar.svg'); 
  const router = useRouter();

  function toggleSideMenu() { 
    store.toggleSideMenu();
  }

  function handleClick() {
    store.toggleLoginDropdown();
  }

  function login() {
    store.toggleLoginPanel(); 
    store.toggleLoginDropdown();
  }


  function logOut() {
    store.toggleLoginDropdown();
    router.push('/');
    userStore.logout();
  }

  const avatar = computed(() => {
    if (userStore.loggedInUser) {
      return userStore.loggedInUser.avatar;
    }
    return user_photo.value;
  });

</script>
  
<style scoped>
  header {
      position: relative;
      height: 5rem;
      background-color: rgb(255, 255, 255, 0.6);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      z-index: 100;
  }

  #profile {
      aspect-ratio: 1 / 1;
      height: 70%;
      border-radius: 50%;
      background-color: aqua;
      opacity: 2;
  }

  #profile img{
      width: 70%;
  }

  #header-text {
    height: 70%;
    width: 87%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e4e15d;
    color: orange;
    font-size: 1.5rem;
    border-radius: 10px;  
  }
  
  .dropdown {
    position: absolute;
    background-color: yellow;
    top: 5rem;
    width: 200px;
    right: 5px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    color: rgb(65, 188, 236, 0.8);
    font-family: "Jersey 15";
    font-size: 26px;
    font-weight: 700;
  }

  .fil {
    width: 100%;
    text-align: center;
    border-color: black;
    border: 2px solid black; 
  }

  .fil:hover {
      background-color: greenyellow;
      transition: .4s;
      cursor: pointer;
      color: blue;
      
  }


</style>
  