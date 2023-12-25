<template>
  <el-menu class="base-menu" :default-active="activePath" :mode="props.mode" :ellipsis="false" @select="handleSelect">
    <menu-item v-for="menu in menuData" :menu-data="menu" :key="menu.id"></menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import MenuItem from './menu-item.vue'
// 定义父组件传过来的值
const props = defineProps({
  menuData: {
    type: Array,
    default: () => {
      return [];
    },
  },
  mode: {
    type: String,
    default: 'horizontal'
  },
  activePath: {
    type: String,
    default: '0'
  }
});

// 定义子组件向父组件传值/事件
const emits = defineEmits(['select']);

const handleSelect = (key: string, keyPath: string, item: Object) => {
  emits('select', key, keyPath, item)
}

</script>

<style lang="less" scoped>
.base-menu {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>