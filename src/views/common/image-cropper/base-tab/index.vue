<template>
  <div class="custom-tab">
    <div class="custom-tab__item" v-for="(item, index) in props.tabList" :key="item.value" @click="handleClickTabs(item)">
      <div class="item-title" :class="{ active: item.value == props.modelValue }">
        {{ item?.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits('update:modelValue');
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  tabList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

const handleClickTabs = (item) => {
  emits('update:modelValue', item.value);
};
</script>
<style scoped lang="less">
.custom-tab {
  display: flex;
  margin-left: 10px;
}

.custom-tab__item {
  margin-right: 24px;
}

.item-title {
  cursor: pointer;
  color: #000;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;

  &.active {
    position: relative;
    font-size: 18px;
    font-weight: 700;
    color: rgb(25, 167, 248);

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 2px;
      background: rgb(25, 167, 248);
      bottom: -7px;
      left: 0;
    }
  }
}
</style>
