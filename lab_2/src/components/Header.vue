<template>
    <header>
      <button @click="toggleSideMenu" id="menu-button">
        <img src='@/assets/burger.svg' />
      </button>
      <div id = 'header-text'>
            <p>New trips on Fall season! Full details on our Instagram account</p>
      </div>
      <button id="profile">
        <img src="@/assets/user.png"/>
      </button>
    </header>
</template>
  
    <script setup>
    import { ref } from 'vue';
    
    const emit = defineEmits(['toggleSideMenu']);
    
    function toggleSideMenu() { 
        emit('toggleSideMenu');
    }
    </script>
    
    <style scoped>
    header {
        height: 10%;
        background-color: rgb(255, 255, 255, 0.6);
        margin-top: 1%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 3%;
        align-items: center;
    }

    #profile {
        aspect-ratio: 1 / 1;
        height: 70%;;
        border-radius: 50%;
        background-color: aqua;
        opacity: 2;
    }

    #profile img{
        width: 70%;
    }

    #header-text {
      height: 70%;
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e4e15d;
      color: orange;
      font-size: 1.5rem;
      border-radius: 10px;
    }

    </style>
  