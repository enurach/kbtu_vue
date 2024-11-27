<template>
  <div class="app-background">
    <Header />
    <SideMenu v-if="store.isSideMenuOpen"/>
    <LoginPanel v-if="store.isLoginPanel"/>
    <NuxtPage :page-key="route => route.fullPath"/>
  </div>
</template>


<script setup>
  import { useStore } from './stores/index'


  import Header  from './components/Header.vue';
  import SideMenu from './components/SideMenu.vue';

  const store = useStore()
</script>


<style>

  .app-background {
    background-image: url('/home/emasle/code/VUE/lab_3/assets/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
  }

  body, html{
    margin: 0;
    padding: 0;
  }

  p {
    font-family: 'Jersey 25';
    font-weight: 300;
  }
</style>