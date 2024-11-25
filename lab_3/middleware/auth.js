import { useUserStore } from "~/stores/users";
import { useStore } from "~/stores";

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    const configStore = useStore();
    const isAuthenticated = computed(() => userStore.isLoggedIn); 
  
    if (!isAuthenticated.value) {
      return navigateTo('/register');
    }
  });
  