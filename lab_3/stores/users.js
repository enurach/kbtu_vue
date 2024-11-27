import { defineStore } from "pinia";
import { users } from "~/composable/data";

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        usersData: users,
        loggedInUser: null, // Store the currently logged-in user
        authToken: null,    
        confirmationCode: "aaa",
    }),
    
    getters: {
        getById: (state) => (id) => {
          return state.usersData.find((user) => user.id === id);
        },

        isLoggedIn: (state) => !!state.loggedInUser,

        getFavorites: (state) =>(id) => {
          if (id === -1){
            if (state.isLoggedIn) {
              const favorites = state.usersData.find(user => user.id === state.loggedInUser.id).favorite;
              return favorites.map(id => state.getById(id));
            }
            return [];
          }
          const favorites = state.usersData.find(user => user.id === id).favorite;
          return favorites.map(id => state.getById(id));
        },

        paginatedFavorites: (state) => (pageSize, id=-1, currentPage) => {
          const start = (currentPage - 1) * pageSize;
          const end = start + pageSize;
          return state.getFavorites(id).slice(start, end);
        },
  
    },

    actions: {
        // Register a new user
        register(newUser) {
            const existingUser = this.usersData.find((user) => user.email === newUser.email);
            if (existingUser) {
                alert("User with this email already exists");
                return false
            }
            const userId = this.usersData.length + 1;
            const registeredUser = { id: userId,  avatar: "man_1.png", ...newUser};
            this.usersData.push(registeredUser);
            console.log(this.usersData);
            return true;
        },
    
        // Login 
        login(credentials) {
          const user = this.usersData.find(
            (u) => u.email === credentials.email && u.password === credentials.password
          );
          if (!user) {
            alert("Incorect credintails");
            return false;
          }
          this.loggedInUser = user;
          this.authToken = user.id; 
          return true;
        },
    
        // Logout 
        logout() {
          this.loggedInUser = null;
          this.authToken = null;
        },
    
        
        confirmEmailCode(code) {
          if (code === this.confirmationCode) {
            return true;
          }
          return false;
        },
    
        // Check if the user is authorized
        isAuthorized() {
          if (!this.authToken) {
            return false;
          }
          return true;
        },
        updateUser(updatedUser) {
          for(let i = 0; i < this.usersData.length; i++) {
            if(this.usersData[i].id === updatedUser.id) {
              this.usersData[i].age = updatedUser.age;
              this.usersData[i].place = updatedUser.place;
              this.loggedInUser = this.usersData[i];
              break;
            }
          }
        },
        addToFavorite(id) {
          if(this.isLoggedIn) {
            const userIndex = this.usersData.findIndex(user => user.id === this.loggedInUser.id);
            if (!this.usersData[userIndex].favorite.includes(id))
              this.usersData[userIndex].favorite.push(id);
          }
        },

        unfollow(id) {
          if(this.isLoggedIn) {
            const userIndex = this.usersData.findIndex(user => user.id === this.loggedInUser.id);
            const idIndex = this.usersData[userIndex].favorite.indexOf(id);
            if (idIndex !==-1)
              this.usersData[userIndex].favorite.splice(idIndex, 1);
            console.log(this.usersData[userIndex].favorite)
          }
        }
    }
});