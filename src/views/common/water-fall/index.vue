<template>
  <div class="water-fall-panel">
    <WaterFallPanel :img-list="imgList" :has-more="hasMore" @load-more="handleLoadMoreData"></WaterFallPanel>
  </div>
</template>

<script setup lang='ts'>
import WaterFallPanel from '@/components/water-fall/index.vue';
import { onMounted, reactive, ref } from 'vue';
import Api from './api.js';

const imgList = ref([]);
const hasMore = ref(true);

const imgData = reactive({
  currentPage: 1,
  pageSize: 80
})

const handleLoadMoreData = async () => { 
  const res = await Api.getImageList({ ...imgData });
  if (res && res.length) {
    imgList.value = [...imgList.value, ...res];
    imgData.currentPage += 1;
    hasMore.value = true;
  } else { 
    hasMore.value = false;
  }
}

onMounted(() => { 
  handleLoadMoreData();
})

</script>

<style lang='less' scoped>
.water-fall-panel {
  width: 100%;
  height: 100%;
}

</style>