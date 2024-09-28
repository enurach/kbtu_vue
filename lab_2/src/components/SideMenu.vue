<template>
    <div class = "side-menu">
        <button class="white-box" @click="toggleSideMenu">MENU</button>
        <div id = "main" class="white-box">
            <ul>
                <li><button @click="changeTopic(0)">ADVENTURE BLOG</button></li>
                <li><button @click="changeTopic(1)">NATURE BLOG</button></li>
                <li><button @click="changeTopic(2)">FASHION BLOG</button></li>
                <li><button @click="changeTopic(3)">MODERN BLOG</button></li>
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
    const emit = defineEmits(['toggleSideMenu', 'changeTopic']);

    function toggleSideMenu() {  
        emit('toggleSideMenu');
    }

    function changeTopic(butonId) {
        emit('changeTopic', butonId)
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
  }


  .side-menu li button {
    width: 100%;
    margin-bottom: 10px;
    background-color: #61d452;
    border-radius: 10px;
    border: 0;
    color: white;
    font-size: 2rem;
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
  }

  h3 {
    font-size: 2rem;
    margin: 1rem;
  }

  p {
    margin: 0.5rem;
    font-size: 1.5rem;
  }

</style>