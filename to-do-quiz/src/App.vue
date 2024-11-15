<template>
  <div class="todo-list-container">
    <input v-model="newTodo" @keyup.enter="add" placeholder="Add a new task" class="new-todo-input" />
    <div class="filters">
      <button @click="toggleFilter('all')" :class="{ active: filter === 'all' }">All</button>
      <button @click="toggleFilter('completed')" :class="{ active: filter === 'completed' }">Completed</button>
      <button @click="toggleFilter('incomplete')" :class="{ active: filter === 'incomplete' }">Incomplete</button>
    </div>
    <transition-group name="fade" tag="ul" class="todo-list">
      <TodoItem
        v-for="todo in todoStore.filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleStatus"
        @remove="deleteTodo"
      />
    </transition-group>
  </div>
</template>

<script setup>
  import { ref, computed, watch, nextTick } from 'vue';
  import { useTodoStore } from "@/stores/index"
  import TodoItem from '@/components/ToDoItem.vue';

  const todoStore = useTodoStore();
  const newTodo = ref('');

  const add = () => {
    todoStore.addTodo(newTodo.value);
    newTodo.value = '';
  };  

  const deleteTodo = (id) => {
    todoStore.deleteTodo(id);
  };

  const toggleStatus = (id) => {
    todoStore.toggleTodoStatus(id);
  };

  const toggleFilter = (filter) => {
    todoStore.filter = filter;
  }

  watch(filter, async () => {
    await nextTick();
    console.log('Filter changed:', filter.value);
  });
</script>

<style scoped>
.todo-list-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.new-todo-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filters button {
  padding: 8px 15px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filters button.active {
  background-color: #409eff;
  color: white;
}

.filters button:hover {
  background-color: #dcdfe6;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
