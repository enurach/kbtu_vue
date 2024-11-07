import { defineStore } from 'pinia'

export const useStore = defineStore('menu', {
  state: () => ({
    sideMenuIsOpen: false,
  }),

  actions: {
    toggleSideMenu() {
      this.sideMenuIsOpen = !this.sideMenuIsOpen
    }
  },

  getters: {
    isSideMenuOpen: (state) => state.sideMenuIsOpen
  }
})
