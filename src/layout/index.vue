<template>
  <div class="layout-wrap">
    <header class="header-wrap" v-if="!isLogin">
      <h2 class="title">CHT练习</h2>
      <Smenu />
    </header>
    <div class="router-wrap" ref="routerWrapRef">
      <router-view v-if="isLoadingGlobalContextReady"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import Smenu from './components/menu.vue';

  // loading setting
  const routerWrapRef = ref(null);
  const isLoadingGlobalContextReady = ref(true);
  const route = useRoute();

const isLogin = computed(() => {  
    console.log(route.path, "route.path");
      
    return route.path === "/login"
  });
  
  onMounted(() => {
    isLoadingGlobalContextReady.value = true;
  });

</script>

<style lang="less" scoped>
.layout-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .header-wrap {
    display: flex;
    align-items: center;
    padding-left: 20px;
    line-height: 60px;
    font-size: 16px;
    .title {
      min-width: 200px;
    }
  }
  .router-wrap {
    overflow: auto;
    flex: 1;
    min-height: 0;
    background: #f3f4fa;
    position: relative;
  }
}

</style>
