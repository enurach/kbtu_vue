import { defineStore } from 'pinia'

export const useChat = defineStore('chat', {
  state: () => ({
    data: 
        [1, [
            { isUser: false, text: 'Hello!' },
            { isUser: true, text: 'Hi, how are you?' },
            ]
        ],
  }),

  actions: {
    sendMessage(newMessage, isUser, chat_id) {
        if (newMessage.trim() === '') return; // Prevent sending empty messages
        const message = {
            isUser: isUser,
            text: newMessage.trim()
        };
        if (this.data[chat_id]){
            this.data[chat_id].push(message);
        }
        else{
            this.data[chat_id] = [message];
        }
    },
  },

  getters: {
    getMessages: (state) => (chat_id) => {
        return state.data[chat_id];
      },
  }
})
