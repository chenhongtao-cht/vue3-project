<template>
  <div>
    {{ test }}
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

</style>
