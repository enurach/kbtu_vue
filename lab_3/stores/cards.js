import { defineStore } from 'pinia'
import { data } from '~/composable/data';

export const usePostsStore = defineStore('CardsStore', {
  state: () => ({
    cards: data,
    currentPage: 1,
    currentTitle: "Adventure",
    currentSorting: "Ratting",

  }),
  getters: {
    // Get card by id
    getById: (state) => {
      return (id) => state.cards.find(card => card.id === id);
    },

    // ByTitle
    filteredCardsByTitle: (state) => {
      return state.cards.filter(card => card.Topic === state.currentTitle);
    },

    // Sorted card
    sortedCards: (state) => {
      const sorted = [...state.filteredCardsByTitle];
      if (state.currentSorting === 'Date') {
        return sorted.sort((a, b) => new Date(b.PubDate) - new Date(a.PubDate));
      }
      return sorted.sort((a, b) => b.Rating - a.Rating);
    },

    // Final Paggination
    paginatedCards: (state) => (pageSize) => {
      const start = (state.currentPage - 1) * pageSize;
      const end = start + pageSize;
      return state.sortedCards.slice(start, end);
    },
     
    getCurrentPage: (state) => {
      return state.currentPage;
    },
    
    totalPages: (state) => (pageSize) => Math.ceil(state.filteredCardsByTitle.length / pageSize),
  },


  actions: {
    // Pressing Like logic
    likeCard(id) {
        const card = this.cards.find(card => card.id === id);
        if (card) {
            if (card.Rating < 5.0)
                card.Rating += 0.1;
        }
    },

    // ChangeTopic
    changeTopic(topic) {
      this.currentTitle = topic;
    },

    // Change Sorting
    changeSorting(filter) {
      this.currentSorting = filter;
    },

    // Paggination logic

    // Method to go to the next page
    nextPage(pageSize) {
      if (this.currentPage < this.totalPages(pageSize)) {
        this.currentPage++;
      }
    },

    // Method to go to the previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    resetPage() {
      this.currentPage = 1;
    },
  },
});

