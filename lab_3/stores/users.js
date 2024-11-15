import { defineStore } from "pinia";
import { users } from "~/composable/data";

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        usersData: users, //fix maybe
    }),
    
    getters: {
        // Get user by id
        getById: (state) => {
            return (id) => state.usersData.find(user => user.id == id);
        }
    }
});