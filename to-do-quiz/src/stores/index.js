import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    filter: 'all'
  }),

  actions: {
    addTodo(text) {
      if (text) {
        this.todos.push({ id: Date.now(), text, completed: false });
      }
    },

    deleteTodo(id) {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) this.todos.splice(index, 1);
    },

    toggleTodoStatus(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  getters: {
    filteredTodos: (state) => {
        if (state.filter === 'completed') {
          return state.todos.filter(todo => todo.completed);
        } else if (state.filter === 'incomplete') {
          return state.todos.filter(todo => !todo.completed);
        }
        return state.todos;
      },
  }
});
