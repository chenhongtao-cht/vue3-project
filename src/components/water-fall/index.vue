<template>
  <div class="water-fall-container" ref="container">
    <div class="water-fall-content" ref="content" :style="{padding: `${gap}px`}">
     <div class="content-item" v-for="(item, index) in itemRenderList" :key="item[props.rowKey] ?? index" :style="{
        width: `${itemWidth}px`,
        transform: `translate(${data.left}px, ${data.top}px)`,
      }">
       <slot :data="item">
        <Card :data="item"></Card>
      </slot>
    </div>
  </div>
</div>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from 'vue';
import { useScroll } from '@vueuse/core';
import Card from './card.vue';

const emits = defineEmits(['load-more']);
const props = defineProps({
  rowKey: {
    type: String,
    default: 'id'
  },
  gap: {
    type: Number,
    default: 15
  },
  hasMore: {
    type: Boolean,
    default: true
  },
  imgList: {
    type: Array,
    default: () => []
  },
  itemMinWidth: {
    type: Number,
    default: 250
  },
  minColumnCount: {
    type: Number,
    default: 2
  },
});

const container = ref<HTMLDivElement>(null);
const content = ref<HTMLDivElement>(null);
const contentWidth = computed(() => {
  return content.value.clientWidth;
});

// 计算列数
const columnCount = computed<number>(() => {
  if (!contentWidth.value) {
    return 0
  }
  const cWidth = contentWidth.value + props.gap * 2;
  if (cWidth >= props.itemMinWidth * 2) {
    return Math.ceil(cWidth / props.itemMinWidth)
  }
  return props.minColumnCount
});

// 计算每个item占据的宽度: (容器宽度 - 间隔) / 列数
const itemWidth = computed<number>(() => {
  if (!contentWidth.value || columnCount.value <= 0) {
    return 0
  }
  return Math.floor((contentWidth.value - (columnCount.value - 1) * props.gap) / columnCount.value);
});

// 每列距离顶部的距离
const columnsTop = ref(new Array(columnCount.value).fill(0));

const itemRenderList = computed(() => {
  return props.imgList;
});

const drawWaterFall = () => {

};

// 获取当前元素应该处于哪一列
const getColumnIndex = (): number => {
  return columnsTop.value.indexOf(Math.min(...columnsTop.value));
}

const state = useScroll(container, {
  offset: { bottom: 2000 },
});

watch(() => state.arrivedState.bottom, () => { 
  props.hasMore && emits('load-more');
}, {
  deep: true
})

watch(() => props.imgList, () => {
  drawWaterFall();
});

</script>

<style lang='less' scoped>
.fixed {
  position: fixed;
  top: 20px;
  right: 20px;
}
.water-fall-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  // scrollbar-width: none;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  .water-fall-content {

  }
  .content-item {

  }
}

</style>