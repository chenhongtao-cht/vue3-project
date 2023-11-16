<template>
  <div>
    <ScrollNumber :number="num" color="#2995ff" :h="36"></ScrollNumber>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ScrollNumber from '@/components/scroll-number/index.vue';

let timer = null;
const num = ref(56789);

const init = () => {
  timer = setInterval(() => {
    num.value = Number.parseInt(Math.random() * 10000) + 2000;
  }, 2 * 1000);
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  clearInterval(timer);
  timer = null;
});
</script>

<style lang='less' scoped></style>