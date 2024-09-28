<template>
    <Header @toggleSideMenu="handleSideMenuToggle" />
    <div class = "main_content">
      <SideMenu v-if ="isSideMenuOpen" @toggleSideMenu="handleSideMenuToggle" @changeTopic="handleTopic"/>
      <main>
        <SearchHeader :title="topic"/>
        <div class="person-grid">
          <Card 
            v-for="person in persons" 
            :name=person.PersonName
            :photo="person.Avatar"
            :date="person.PubDate"
            :comment="person.Commentary"
            :rating="person.Rating"
          />
        </div>
      </main>
    </div>
</template>


<script setup>
  import Header from './components/Header.vue';
  import SideMenu from './components/SideMenu.vue';
  import SearchHeader from './components/SearchHeader.vue';
  import Card from './components/Card.vue';
  import { data } from './composable/persons.js';
  import { ref, computed } from 'vue';

  const isSideMenuOpen = ref(false);

  const topic = ref("Adventure");
  const persons = ref();

  const dict = {
    0: "Adventure",
    1: "Nature",
    2: "Fashion",
    3: "Modern"
  };

  const init = () => {
    persons.value = data.filter((item) => item.Topic == topic.value);
    console.log(persons.value)
  };
  
 
  init()
  
  function handleSideMenuToggle(isOpen) {
    isSideMenuOpen.value = !isSideMenuOpen.value;
  }

  function handleTopic(buttonId) {
    topic.value = dict[buttonId];
    init()
  }

</script>



<style scoped>
  .main_content {
    flex-grow: 1;
  }

  main {
    background-color: rgb(255, 255, 255, 0.6);
    width: 85%;
    height: 79vh;
    margin: 2% 7.5%;
    display: flex;
    flex-direction: column;

  }

  .person-grid {
    flex-basis: 66%;
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 20px;
    padding: 20px;
  }


</style>