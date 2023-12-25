<template>
  <div class="custom-time-picker-box">
    <PickerItem :listData="hours" :type="props.type" v-model="hour" />
    <PickerItem :listData="minutes" :type="props.type" v-model="minute" />
    <PickerItem v-if="props.showSeconds" :listData="seconds" :type="props.type" v-model="second" />
  </div>
  <div class="custom-time-picker-box__footer" v-if="props.showFooter">
    <div class="btn" @click="save">确认</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect, onMounted } from 'vue';
import PickerItem from './picker-item.vue';
import { hours, minutes, seconds } from './config.js';
import dayjs from 'dayjs';
defineOptions({
  name: 'CustomTimePickerBox'
});

const emits = defineEmits(['change', 'save']);
const props = defineProps({
  time: {
    type: String,
    default: dayjs().format('HH:mm:ss')
  },
  type: {
    type: String,
    default: 'circle'
  },
  showSeconds: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: false
  }
});
const hour = ref('00');
const minute = ref('00');
const second = ref('00');

const save = () => {
  emits('save');
};

watchEffect(() => {
  emits(
    'change',
    `${hour.value}:${minute.value}` + `${props.showSeconds ? `:${second.value}` : ''}`
  );
});

onMounted(() => {
  const [h, m, s] = props.time.split(':');
  hour.value = h;
  minute.value = m;
  second.value = s;
});
</script>
<style scoped lang="less">
.custom-time-picker-box {
  display: flex;
}

.custom-time-picker-box__footer {
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #414243;

  .btn {
    width: 48px;
    height: 24px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 24px;
    border-radius: 5px;
    background-color: rgba(104, 216, 254, 0.7);
    cursor: pointer;

    &:hover {
      background-color: rgba(104, 216, 254, 1);
    }
  }
}
</style>
