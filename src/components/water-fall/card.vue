<template>
  <div class="card">
    <div class="img" ref="dom" :style="{ backgroundColor: getRandomColor()}">
      <Transition>
        <img v-if="loaded" :src="props.data.img" alt="图片" />
      </Transition>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core';

const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  },
  color: {
    type: Array,
    default: () => [255, 255, 255]
  },
})

const dom = ref<HTMLDivElement>(null);
const loaded = ref(false);

const getRandomColor = () => {
  // const letters = '0123456789ABCDEF';
  // let color = '#';
  // for (let i = 0; i < 6; i++) {
  //   color += letters[Math.floor(Math.random() * 16)];
  // }
  // return color;
  return '#' + Math.random().toString(16).slice(-6);
};

const { stop } = useIntersectionObserver(dom, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    stop()
    loaded.value = true;
  }
});
</script>

<style scoped lang="less">
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid #dddddd;
  border-radius: 10px;
  .img {
    flex: 1;
    width: 100%;
    height: 0;
    // background: transparent;
    filter: contrast(100%) opacity(100%);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      overflow: hidden;
    }
  }
}
.v-enter-active,
.v-leave-active {
  opacity: 1;
  transition: opacity 0.8s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>