<template>
    <div class="login-wrapper">
      <div v-if="!store.isCodeSent" class="container">
        <div class="flex_container">
          <div class="tabs">
            <a href="#" class="tab">PROFILE | REGISTRATION</a>
          </div>
    
          <form id="registerForum"  @submit.prevent="handleRegister">
            <label for="email">Enter your email</label>
            <input v-model="email" type="email" id="email" placeholder="user@example.com">
    
            <label for="username">Create username</label>
            <input v-model="username" type="text" id="username" placeholder="user">
    
            <label for="password">Create password</label>
            <input v-model="password" type="password" id="password" placeholder="********">
    
            <label for="confirm-password">Confirm password</label>
            <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="********">
          </form>
        </div>
        <button type="submit" form="registerForum" class="button">CREATE USER</button>
      </div>
      <div v-else class="container2">
  
        <div class="step-title">TO CREATE ACCOUNT DO NEXT STEPS</div>
  
        <form @submit.prevent="handleConfirmCode" id="accountCreationForm">
          <div class="grid-divs">
            <label for="email">CONFIRM YOUR EMAIL</label>
            <label for="secretPhrase">ENTER THE SECRET PHRASE</label>
          </div>
          
          <div class="grid-divs">
            <button class="useless-button">CLICK TO CONFIRM</button>
            <input  v-model="confirmationCode" type="text" id="secretPhrase" placeholder="****************" required>
          </div>

          <button form="accountCreationForm" type="submit" class="create-button">CREATE USER</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import {ref} from 'vue'
  import {useUserStore} from "/stores/users.js"
  import {useStore} from "/stores/index.js"
  import { useRouter } from 'vue-router'; // `useRouter` for navigation

  const router = useRouter();
  const userStore = useUserStore()
  const store = useStore()


  const email = ref('')
  const password = ref('')
  const username = ref('')
  const confirmPassword = ref('')
  const confirmationCode = ref('')
  
  const handleRegister = async () => {
    if (email.value == '') {
      alert("Please fill an email")
    }
    else if (password.value == ''){
      alert("Please fill a password")
    }
    else if (username.value == ''){
      alert("Please fill a username")
    }
    else if (password.value === confirmPassword.value) {
      store.toggleCodeSend();
    } else {
      alert("Passwords do not match")
    }
  }
  
  const handleConfirmCode = () => {
    const result = userStore.confirmationCode === confirmationCode.value
    if (result) { 
      const completed = userStore.register({name: username.value, email: email.value, password: password.value});
      if(completed)
        router.push('/');
      store.toggleCodeSend();
    } else {
      alert("Неверный код")
    }
  }

  
  </script>
  
  <style scoped>
  
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    width: 100vw;
    font-size: 1.5rem;
  }
  body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #adebff, #f7e3e8);
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
  }
  

  .container,
  .container2 {
    width: 80%;
    min-height: 70vh; 
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    align-items: center;
    margin: 0 10px;
  }
  
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: linear-gradient(rgb(185, 235, 242), white);
  }
  
  .container2 {
    background-color: #3dd4d8; 
  }
  
  .flex_container {
    padding: 0 100px;
  }

  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  #accountCreationForm {
    padding-top: 5%;
    text-align: left; 
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 4.5fr  1fr;
    justify-items: center;
  }
  
  .step-title {
    width: 70%;
    padding: 15px;
    margin: 0 0 0 12%;
    border-radius: 8px;
    margin-bottom: 15px;  
    background-color: white; 
  }
  
  button {
    font-size: 1.5rem;
  }

  .tab {
    color: #fff;
    background-color: #3dd4d8;
    padding: 10px 20px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
  }
  
  label {
    display: block;
    text-align: left;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 120%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #3dd4d8;
    color: #fff;
    margin-bottom: 15px;
    font-size: 1.5rem;
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus {
    outline: none;
    background-color: #29b6c0;
  }
  

  .button {
    background-color: #32e278;
    position: relative;
    top: 30vh;
    color: #fff;
    border: none;
    padding: 12px 20px;
    margin: 0 100px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #2ac967;
  }
  
  input[id="secretPhrase"] {
    width: 80%;
    margin: 0;
    border: none;
    border-radius: 5px;
    background-color: #4291a3;
    color: #fff;
    text-align: center;
  }
  
  input[id="secretPhrase"]:focus {
    outline: none;
    background-color: #357a88;
  }
  

  .create-button {
    background-color: #3ba0d4;
    color: #fff;
    justify-self: center;
    align-self: center;
    border: none;
    padding: 15px 20px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
    grid-column: 1 / -1;
  }
  
  .create-button:hover {
    background-color: #2c82aa;
  }

  .useless-button {
    background-color: #e5e81e;
    color: #000000;
    border: none;
    padding: 12px 20px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .grid-divs {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .icon-button {
    background-color: #32e278;
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
  }
  
  .icon-menu {
    top: 10px;
    left: 10px;
  }
  
  .icon-profile {
    top: 10px;
    right: 10px;
  }
  </style>