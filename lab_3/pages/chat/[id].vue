<template>
    <div class="chat-container">
      <!-- Scrollable message area -->
      <div class="messages-container" ref="messagesContainer">
        <div v-for="(message, index) in chatStore.getMessages(chat_id)" :key="index" :class="{'user-message': message.isUser, 'friend-message': !message.isUser}">
          <img :src="message.isUser ? `/images/${user.avatar}` : `/images/${friend.avatar}`" alt="Avatar" class="avatar" />
          <div class="user-data">
            <p class="name">{{ message.isUser ? 'You' : friend.name }}</p>
            <p style="color: greenyellow;">For now</p>
          </div>
          <div class="message-details">
            <p class="message">{{ message.text }}</p>
          </div>
        </div>
      </div>
  
      <!-- Message input and send button -->
      <div class="message-input-container">
        <input 
          v-model="newMessage" 
          type="text" 
          placeholder="Type your message..." 
          class="message-input" 
          @keyup.enter="sendMessage" 
        />
        <button @click="sendMessage" class="send-button">Send</button>
      </div>
    </div>
  </template>
  
<script setup>
  import { useUserStore } from '~/stores/users';
  import { useRoute } from 'vue-router';
  import { useChat } from '~/stores/chat';

  const route = useRoute()
  const chat_id = Number(route.params.id); 

  const userStore = useUserStore();
  const chatStore = useChat();

  const user_id = computed(() => {
    if (userStore.loggedInUser)
        return userStore.loggedInUser.id;
    return 0;
  });

  const friend = userStore.getById(chat_id);
  const user = userStore.getById(user_id.value);

  definePageMeta({
        middleware: 'auth',
    });

  
  const newMessage = ref('');
  const messagesContainer = ref(null);
  
  // Scroll to the bottom when a new message is added
  onUpdated(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
  
  const sendMessage = () => {
    chatStore.sendMessage(newMessage.value, true, chat_id);
    newMessage.value = ''; // Clear the input field
    chatStore.sendMessage("you are blocked dont write me again", false, chat_id);
  };
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 80vh;
    padding: 16px;
    gap: 12px;
  }
  
  .messages-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 8px;
    padding: 8px;
    margin-bottom: 16px;
  }
  
  .user-data {
    display: flex;
    flex-direction: column;
  }

  .user-message, .friend-message {
    display: flex;
    align-items: center;
    max-width: 60%;
  }
  
  .user-message {
    align-self: flex-end;
    text-align: right;
    flex-direction: row-reverse;
  }
  
  .friend-message {
    align-self: flex-start;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 8px;
  }
  
  .message-details {
    background: #f1f1f1;
    border-radius: 8px;
    padding: 8px 12px;
  }
  
  .user-message .message-details {
    background: #d1eaff;
  }
  
  .name {
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .message {
    margin: 0;
  }
  
  /* Input and button container */
  .message-input-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .message-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .send-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .send-button:hover {
    background-color: #0056b3;
  }
  </style>
  