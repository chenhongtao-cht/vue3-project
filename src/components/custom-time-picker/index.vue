<template>
  <div class="custom-time-picker dark">
    <el-popover ref="popoverRef" placement="bottom" trigger="click" popper-class="cu-time-picker-popover" :hide-after="0"
      @hide="handleHide">
      <template #reference>
        <el-input v-model="input" placeholder="请选择时间" clearable />
      </template>
      <PickerBox @change="handleChange" @save="handleSave" :time="props.modelValue" :showSeconds="props.showSeconds" />
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PickerBox from './picker-box.vue';

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '09:54:59'
  },
  date: {
    type: String,
    default: '2023-12-22'
  },
  showSeconds: {
    type: Boolean,
    default: true
  }
});

const popoverRef = ref(null);
const input = ref('');

const handleChange = (val: string) => {
  const hour = +val.split(':')[0];
  let date = props.date;
  if (hour <= 5) {
    date = props.date
      .split('-')
      .map((item, index) => {
        let val = index == 2 ? +item + 1 : item;

        return val.toString().padStart(2, '0');
      })
      .join('-');
  }
  input.value = `${date} ${val}`;
};

const handleSave = () => {
  popoverRef.value.hide();
};

const handleHide = () => {
  emits('update:modelValue', input.value);
};
</script>

<style lang="less" scoped>
.custom-time-picker {
  font-size: 12px;
  width: 180px;
}
</style>

<style lang="less">
.cu-time-picker-popover {
  padding: 2px !important;
}
</style>
