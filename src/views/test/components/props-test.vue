<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
import {  toRefs } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: "1" 
    },
    content: {
        type: String,
        default: "2" 
    }
});

// 直接解构并保持响应式
const { title, content } = toRefs(props);
</script>
