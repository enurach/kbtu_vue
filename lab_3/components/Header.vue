<template>
    <header>
      <button @click="toggleSideMenu" id="menu-button">
        <img src='../assets/menu.svg' />
      </button>
      <div id = 'header-text'>
            <p>New trips on Fall season! Full details on our Instagram account</p>
      </div>
      <button id="profile">
        <img src="../assets/avatar.svg"/>
      </button>
    </header>
</template>
  
<script setup>
  import { useStore } from './stores/index'

  const store = useStore();

  function toggleSideMenu() { 
    store.toggleSideMenu();
  }

</script>
  
<style scoped>
  header {
      height: 5rem;
      background-color: rgb(255, 255, 255, 0.6);
      margin: 10px 0;
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

</style>
  