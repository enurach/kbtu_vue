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
    getById: (state) => (id) => {
      return state.cards.find(card => card.id === id);
    },
    
    // Get card by author id
    getAuthorCards: (state) => (id) => {
      return state.cards.filter(card => card.authorId === id);
    },

    // Get average ratting
    getAuthorAverageRating: (state) => {
      return (id) => {
        const authorCards = state.cards.filter(card => card.authorId === id);
        if (authorCards.length === 0) return 0;
        const totalRating = authorCards.reduce((sum, card) => sum + (card.Rating || 0), 0);
        return totalRating / authorCards.length;
      };
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

    paginatedAuthorCards: (state) => (pageSize, id, currentPage) => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      return state.getAuthorCards(id).slice(start, end);
    },
    

     
    getCurrentPage: (state) => {
      return state.currentPage;
    },
    
    totalPages: (state) => (pageSize) => Math.ceil(state.filteredCardsByTitle.length / pageSize),
  },


  actions: {
    // Pressing Like logic
    likeCard(id, userId) {
      const cardIndex = this.cards.findIndex(card => card.id === id);

      if (cardIndex !== -1) {
          const card = this.cards[cardIndex];

          if (!card.Liked.includes(userId)) {
              card.Liked.push(userId);
              if (card.Rating < 5.0) {
                  card.Rating = parseFloat((card.Rating + 0.1).toFixed(1));
              }
              this.cards.splice(cardIndex, 1, { ...card });
          }
      }
  },


    deleteCard(id) {
      this.cards = this.cards.filter(card => card.id !== id);
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

