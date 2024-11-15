<template>
    <li :class="{ completed: todo.completed }" class="todo-item">
      <span @click="toggle(todo.id)" class="todo-text">{{ todo.text }}</span>
      <button @click="remove(todo.id)" class="delete-btn">Delete</button>
    </li>
</template>


<script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    todo: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(['toggle', 'remove']);
  
  const toggle = (id) => {
    emit('toggle', id);
  };
  
  const remove = (id) => {
    emit('remove', id);
  };
</script>
  
<style scoped>
    .completed {
        text-decoration: line-through;
    }
    .todo-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        margin: 10px 0;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    .todo-item:hover {
        transform: scale(1.05);
    }

    .todo-text {
        flex-grow: 1;
        cursor: pointer;
        font-size: 16px;
        transition: color 0.3s;
    }

    .todo-item.completed .todo-text {
        text-decoration: line-through;
        color: #999;
    }

    .delete-btn {
        padding: 5px 10px;
        background-color: #ff4d4f;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .delete-btn:hover {
        background-color: #e63b3b;
    }
</style>
  