<template>
  <Header />

  <SideMenu v-if="store.isSideMenuOpen"/>
  <NuxtPage />
</template>


<script setup>
  import { useStore } from './stores/index'


  import Header  from './components/Header.vue';
  import SideMenu from './components/SideMenu.vue';

  const store = useStore()
</script>


<!-- hjy<template>
  <Header @toggleSideMenu="handleSideMenuToggle" />
  <div class = "main_content">
    <SideMenu v-if ="isSideMenuOpen" @toggleSideMenu="handleSideMenuToggle" @changeTopic="handleTopic"/>
    <main>
      <SearchHeader
        @nextPage="nextPage"
        @prevPage="prevPage"
        @changeFilter="handleFilter"
        :title="topic"
        :totalPages="totalPages"
        :currentPage="currentPage"/>
      <div class="person-grid">
        <Card 
          v-for="person in paginatedPersons" 
          :id="person.id"
          :name=person.PersonName
          :photo="person.Avatar"
          :date="person.PubDate"
          :comment="person.Commentary"
          :rating="person.Rating"

          @likePerson="handleLike"
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

const currentPage = ref(1);
const itemsPerPage = ref(4);
const data_ref = ref(data)
const currentSort = ref('Rating')

const dict = {
  0: "Adventure",
  1: "Nature",
  2: "Fashion",
  3: "Modern"
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    }
};

function compareRating(a, b) {
  if (a.Rating < b.Rating) return 1;  
  if (a.Rating > b.Rating) return -1;
  return 0;
}

function compareDate(a, b) {
  if (a.PubDate < b.PubDate) return 1;  
  if (a.PubDate > b.PubDate) return -1;
  return 0;
}

const persons = computed(() => {
  if (currentSort.value == 'Rating')
    return data_ref.value.filter((item) => item.Topic == topic.value).sort(compareRating);
  return data_ref.value.filter((item) => item.Topic == topic.value).sort(compareDate);
});


const totalPages = computed(() => Math.ceil(persons.value.length / itemsPerPage.value));

const paginatedPersons = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return persons.value.slice(start, end);
});


function handleSideMenuToggle() {
  isSideMenuOpen.value = !isSideMenuOpen.value;
}

function handleFilter(filter) {
  currentSort.value = filter
}

function handleLike(personId) {
  const person = data_ref.value.find(p => p.id === personId);
  if (person) {
    person.Rating++;
  }
}

function handleTopic(buttonId) {
  topic.value = dict[buttonId];
  handleSideMenuToggle();
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


</style> -->