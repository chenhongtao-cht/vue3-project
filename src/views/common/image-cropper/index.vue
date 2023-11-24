<template>
  <BaseTab v-model="activeTab" :tab-list="tabList"></BaseTab>
  <div class="center">
    <VueCropper v-if="activeTab == 'first'" :image="getImgUrl(imgUrl)"></VueCropper>
    <Cropper v-else></Cropper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseTab from './base-tab/index.vue';
import VueCropper from "@/components/image-cropper/vue-cropper.vue";
import Cropper from "./cropper.vue";
import { watch } from 'fs';

const tabList = [{
  label: 'first',
  value: 'first'
}, {
  label: 'second',
  value: 'second'
}];
const imgUrl = ref('3');
const activeTab = ref('first');


const getImgUrl = (img) => {
  return new URL(`./images/${img}.png`, import.meta.url).href;
};

</script>

<style lang="less" scoped>
.center {
  width: 100%;
  height: calc(100% - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>