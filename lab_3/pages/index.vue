<!-- Main page -->
<template>
  <div id="main-block">
      <SearchHeader />
      <div class="person-grid">
        <Card 
          v-for="card in cards" :key="card.id" :id="card.id"
        />
      </div>
  </div>
</template>


<script setup>
  import Card from '~/components/Card.vue';
  import SearchHeader from '~/components/SearchHeader.vue';

  import { usePostsStore } from '~/stores/cards';

  
  const postStore = usePostsStore();

  const cards = computed(() => postStore.paginatedCards(4));

</script>

<style scoped>

  #main-block {
    background-color: rgb(255, 255, 255, 0.6);
    width: 85%;
    margin: 2% 7.5%;
    display: flex;
    flex-direction: column;
  }

  .person-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap:50px;
    padding: 20px;
  }
</style>
