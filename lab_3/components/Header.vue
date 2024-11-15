<template>
    <header>
      <button @click="toggleSideMenu" id="menu-button">
        <img src='../assets/menu.svg' />
      </button>
      <div id = 'header-text'>
            <p>New trips on Fall season! Full details on our Instagram account</p>
      </div>
      <button id="profile" @click="store.toggleLoginDropdown()">
        <img src="../assets/avatar.svg"/>
      </button>
    </header>
    <div v-show="store.loginDropdownIsOpen"class="dropdown">
        <div @click="navigateTo('login')" class="fil">LOGIN</div>
        <div @click="navigateTo('register')" class="fil">REGISTER</div>
      </div>
</template>
  
<script setup>
  import { useStore } from './stores/index'

  const store = useStore();

  const route = useRoute(); 

  function toggleSideMenu() { 
    store.toggleSideMenu();
  }

  function navigateTo(page) {
    if (page === 'login') {
      route.push('/login');
    } else if (page === 'register') {
      route.push('/register');
    }
  }

</script>
  
<style scoped>
  header {
      height: 5rem;
      background-color: rgb(255, 255, 255, 0.6);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
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
  