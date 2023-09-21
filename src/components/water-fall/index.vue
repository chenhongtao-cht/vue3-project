<template>
  <div class="water-fall-container" ref="container">
    <div class="water-fall-content" ref="content" :style="{ padding: `${props.gap}px`}">
     <div class="content-item" v-for="(item, index) in itemRenderList" :key="item[props.rowKey] ?? index" :style="{
        width: `${itemWidth}px`,
        height: `${item.height}px`,
        transform: `translate(${item.left}px, ${item.top}px)`,
      }">
       <slot :data="item">
        <Card :data="item"></Card>
      </slot>
    </div>
  </div>
</div>
</template>

<script setup lang='ts'>
///https://github.com/lhlyu/vue-virtual-waterfall/blob/main/src/example.vue
import { computed, ref, watch } from 'vue';
import { useScroll } from '@vueuse/core';
import Card from './card.vue';
import { useElementSize } from '@vueuse/core';

interface ImgItem { 
  id: string,
  img: string,
  width: string,
  height: string | number,
  [propName: string]: any; // 任意类型
}
type IProps = {
  rowKey?: string,
  gap?: number,
  hasMore: boolean,
  imgList: ImgItem[],
  itemMinWidth?: number,
  minColumnCount?: number,
  ratio?: 'auto' | '1:1' | '3:4',
  isResize?: boolean,
};

const emits = defineEmits(['load-more']);

const props = withDefaults(defineProps<IProps>(), {
  rowKey: 'id',
  gap: 10,
  hasMore: true,
  imgList: () => [],
  itemMinWidth: 250,
  minColumnCount: 2,
  ratio: 'auto',
  isResize: false
});

const container = ref<HTMLDivElement>(null);
const content = ref<HTMLDivElement>(null);
const contentSize = useElementSize(content);
const hasCalcImgList = new Map();
const contentWidth = computed(() => {
  if (props.isResize) {
    return contentSize.width.value && contentSize.width.value - 2 * props.gap;
  } else { 
    return content.value && content.value.clientWidth - 2 * props.gap;
  }
});
// 计算列数
const columnCount = computed<number>(() => {
  if (!contentWidth.value) {
    return 0
  }
  const cWidth = contentWidth.value + props.gap * 2;
  if (cWidth >= props.itemMinWidth * props.minColumnCount) {
    return Math.ceil(cWidth / props.itemMinWidth)
  }
  return props.minColumnCount
});

// 计算每个item占据的宽度: (容器宽度 - 间隔) / 列数
const itemWidth = computed<number>((): number => {
  if (!contentWidth.value || columnCount.value <= 0) {
    return 0
  }
  return Math.floor((contentWidth.value - (columnCount.value - 1) * props.gap) / columnCount.value);
});

// 每列距离顶部的距离
const columnsTop = computed(() =>  new Array(columnCount.value).fill(0));


// 声明一个map缓存已处理的数据
const itemRenderList = computed(() => {
  let handleList = [];
  props.imgList.forEach(item => {
    if (!props.isResize && hasCalcImgList.has(item.id)) {
      handleList.push(hasCalcImgList.get(item.id));
    } else { 
      const itemValue = calcImgPosition(item);
      hasCalcImgList.set(item.id, itemValue);
      handleList.push(itemValue);
    }
  });
  
  return handleList;
});

const calcImgPosition = (item: ImgItem) => {
  
  const currentIndex = getColumnIndex();
  const currentColumnValue = columnsTop.value[currentIndex];
  
  const left = currentIndex * (itemWidth.value + props.gap) + props.gap;
  const top = currentColumnValue + props.gap;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  
  const height = calcItemHeight(item);
  columnsTop.value[currentIndex] += (height + props.gap);

  return {...item, left, top, height}
};

// 获取当前元素应该处于哪一列
const getColumnIndex = (): number => {
  return columnsTop.value.indexOf(Math.min(...columnsTop.value));
};

// 根据图片宽高计算渲染图片高度
const calcItemHeight = (item: ImgItem): number => {
  let height = 0;
  // 按比例
  switch (props.ratio) {
    case 'auto':
      return +(item.height) * (itemWidth.value / +item.width) + height;
    case '1:1':
      return itemWidth.value + height;
    case '3:4':
      return (itemWidth.value / 3) * 4 + height;
  }
}

const state = useScroll(container, {
  offset: { bottom: 2000 },
});

watch(() => state.arrivedState.bottom, () => {
  props.hasMore && emits('load-more');
}, {
  deep: true
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
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .water-fall-content {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    will-change: height;
  }
  .content-item {
    position: absolute;
    content-visibility: auto;
  }
}

</style>