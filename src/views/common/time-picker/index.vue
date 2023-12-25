<template>
  <div class="time-picker-panel">
    <CustomTimePicker />
  </div>
</template>

<script setup lang='ts'>
import CustomTimePicker from '@/components/custom-time-picker/index.vue';

</script>

<style lang='less' scoped>
.time-picker-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>