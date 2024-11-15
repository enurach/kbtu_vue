<template>
    <div class="rating">
      <span
        v-for="star in stars"
        :key="star"
        :class="star <= Math.floor(rating) ? 'full-star' : 'empty-star'"
        :style="getStarStyle(star)"
      >
        &#9733;
      </span>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
  })
  
  const stars = computed(() => Array.from({ length: 5 }, (_, i) => i + 1))
  
  function getStarStyle(star) {
    if (star <= Math.floor(props.rating)) return {}
    if (star === Math.ceil(props.rating)) {
      const filledPercentage = (props.rating % 1) * 100
      return {
        background: `linear-gradient(90deg, gold ${filledPercentage}%, white ${filledPercentage}%)`,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        color: 'gold',
      }
    }
    return {}
  }
  </script>
  
  <style scoped>
  .rating {
    display: flex;
    font-size: 2.5rem;
  }
  .full-star {
    color: gold;
  }
  .empty-star {
    color: white;
  }
  </style>
  