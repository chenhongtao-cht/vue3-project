<template>
  <div class="content">
    <div class="item">{{'neirong'}}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
interface PeopleInfo {
    name: string;
    year?: string;
    sex?: string;
    address?: string;
}

const test = ref("333");
</script>

<style lang='less' scoped>
.content {
  padding: 15px;
  position: relative;
  background-color: red;
  width: 100%;
  height: 100%;
  .item {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 60px;
    height: 120px;
    background-color: green;
  }
}

</style>
