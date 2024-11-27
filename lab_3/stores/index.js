import { defineStore } from 'pinia'

export const useStore = defineStore('menu', {
  state: () => ({
    sideMenuIsOpen: false,
    searchMenueDropdownIsOpen: false,
    loginDropdownIsOpen: false,
    isCodeSent: false,
    isLoginPanel: false
  }),

  actions: {
    // Closes all
    closeAll() {
      this.sideMenuIsOpen = false;
      this.searchMenueDropdownIsOpen = false;
      this.loginDropdownIsOpen = false;
    },


    toggleSideMenu() {
      const nextState = !this.sideMenuIsOpen;
      this.closeAll();
      this.sideMenuIsOpen = nextState;
    },

    toggleSearchMenueDropdown() {
      const nextState = !this.searchMenueDropdownIsOpen;
      this.closeAll();
      this.searchMenueDropdownIsOpen = nextState;
    },

    toggleLoginDropdown() {
      const nextState = !this.loginDropdownIsOpen;
      this.closeAll();
      this.loginDropdownIsOpen = nextState;
    },


    toggleLoginPanel() {
      this.isLoginPanel = !this.isLoginPanel;
    },

    toggleCodeSend() {
      this.isCodeSent = !this.isCodeSent;
    },
  },

  getters: {
    isSideMenuOpen: (state) => state.sideMenuIsOpen,
  }
})
