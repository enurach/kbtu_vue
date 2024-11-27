<template>
    <div class = "side-menu">
        <button class="white-box" @click="toggleSideMenu"><p>MENU</p></button>
        <div id = "main" class="white-box">
            <ul>
                <li><button @click="changeTopic('Adventure')"><p>ADVENTURE BLOG</p></button></li>
                <li><button @click="changeTopic('Nature')"><p>NATURE BLOG</p></button></li>
                <li><button @click="changeTopic('Fashion')"><p>FASHION BLOG</p></button></li>
                <li><button @click="changeTopic('Modern')"><p>MODERN BLOG</p></button></li>
            </ul>
            <div class="contacts">
                <h3>CONTACTS</h3>
                <p>PHONE: +7 777 7777</p>
                <p>ADDRESS: Nuraliland, Mars</p>
                <p>EMAIL: info@info.mars</p>
            </div>
        </div>
    </div>
  </template>

<script setup>
  import { useStore } from './stores/index'
  import { usePostsStore } from '~/stores/cards';
  import { useRouter } from 'vue-router';

  const store = useStore();
  const cardStore = usePostsStore();

  const router = useRouter()

  function toggleSideMenu() { 
    store.toggleSideMenu();
  }

  function changeTopic(topic) {
    cardStore.changeTopic(topic);
    store.toggleSideMenu();
    cardStore.resetPage();
    router.push('/');
  }


</script>

<style scoped>
  .side-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 29%;
    height: 100%;
    background-color: hsl(188, 58%, 76%);
    transition: width 0.3s ease-in-out;
    padding: 2% 1% 0% 1%;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .white-box {
    margin-bottom: 20%;
    background-color: hsl(0, 0%, 100%);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    border: 0;
    font-size: 2rem;
    width: 80%;
  }
  
  .side-menu ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }


  .side-menu li button {
    width: 100%;
    margin-bottom: 10px;
    background-color: #61d452;
    border: 0;
    color: white;
    font-size: 1.5rem;
  }

  
  .side-menu .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #61d452;
    border-radius: 10px;
    border: 0;
    margin: 10%;
    color: white;
    width: 80%;
    font-size: 1.5rem;
  }

  h3 {
    font-size: 2rem;
    margin: 1rem;
    font-family: 'Jersey 25';
    font-weight: 300;
  }



  p {
    margin: 5px;
    font-family: 'Jersey 25';
    font-weight: 300;
  }

</style>