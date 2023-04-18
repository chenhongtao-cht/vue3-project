<template>
  <el-menu
    :default-active="activePath"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <menu-item v-for="menu in menuData" :menu-data="menu" :key="menu.id"></menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import MenuItem from "./menu-item.vue"
import { useMenuStore } from '@/stores/menu/index.js';
import { useRoute } from 'vue-router';

const store = useMenuStore();
const menuData = computed(() => store.menuData);

const route = useRoute();
const activePath = computed(() => {
  if (!route) {
    return '';
  }
  return route.fullPath;
});

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>