<template>
  <div class="cu-picker-content" ref="pickerRef">
    <div class="cu-picker-line"></div>
    <div class="cu-picker-list">
      <ul class="cu-picker-list__ul" ref="listRef">
        <li class="cu-picker-list__item" v-for="(el, index) in renderData" :key="index">
          {{ el.value }}
        </li>
      </ul>
    </div>
    <ul class="cu-picker-wheel" ref="wheelRef">
      <li class="cu-picker-wheel__item" :class="{ hidden: setHidden(el.index) }" :style="setWheelItemDeg(el.index)"
        :index="el.index" v-for="(el, index) in renderData" :key="index" @click="handleWheelClick(el.index)">
        {{ el.value }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
defineOptions({
  name: 'CustomTimePickerItem'
});

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  listData: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    default: 'line'
  },
  modelValue: {
    type: String,
    default: '00'
  }
});

const pickerRef = ref(null);
const listRef = ref(null);
const wheelRef = ref(null);

const currentTimeStamp = ref(null);
const spin = ref({ start: -9, end: 9, branch: 9 });
const finger = ref({ startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0 });

const renderData = computed(() => {
  let temp = [];
  for (let k = spin.value.start; k <= spin.value.end; k++) {
    let data = {
      value: getSpinData(k),
      index: k
    };
    temp.push(data);
  }
  return temp;
});

const getSpinData = (index) => {
  index = index % props.listData.length;
  return props.listData[index >= 0 ? index : index + props.listData.length];
};

/* 根据type 控制滚轮显示效果 */
const setHidden = (index) => {
  if (props.type === 'line') {
    return index < 0 || index > props.listData.length - 1;
  } else {
    return false;
  }
};

const setWheelItemDeg = (index) => {
  return {
    transform: `rotate3d(1, 0, 0, ${(-index * 20) % 360}deg) translate3d(0px, 0px, 100px)`
  };
};

const setWheelDeg = (updateDeg, type = 'other', time = 1000) => {
  if (type === 'end') {
    wheelRef.value.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
    wheelRef.value.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`;
  } else {
    wheelRef.value.style.webkitTransition = '';
    wheelRef.value.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`;
  }
};

const setListTransform = (translateY = 0, marginTop = 0, type = 'other', time = 1000) => {
  if (type === 'end') {
    listRef.value.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
    listRef.value.style.webkitTransform = `translateY(${translateY - spin.value.branch * 34}px)`;
    listRef.value.style.marginTop = `${-marginTop}px`;
    listRef.value.setAttribute('scroll', translateY);
  } else {
    listRef.value.style.webkitTransition = '';
    listRef.value.style.webkitTransform = `translateY(${translateY - spin.value.branch * 34}px)`;
    listRef.value.style.marginTop = `${-marginTop}px`;
    listRef.value.setAttribute('scroll', translateY);
  }
};

/* 设置css */
const setStyle = (move, type = 'other', time = 0) => {
  const singleHeight = 34;
  const deg = 20;
  const singleDeg = deg / singleHeight;
  let currentListMove = finger.value.transformY;
  let updateMove = move + Number(currentListMove);
  let updateDeg, spinAim, margin, endMove, endDeg;
  if (type === 'end' && props.type === 'line') {
    /*这里只在释放的时候判断 实现缓动效果*/
    /* 根据滚轮类型 line or cycle 判断 updateMove最大距离 */
    if (updateMove > 0) {
      updateMove = 0;
    }
    if (updateMove < -(props.listData.length - 1) * singleHeight) {
      updateMove = -(props.listData.length - 1) * singleHeight;
    }
  }

  updateDeg = -updateMove * singleDeg;
  spinAim = Math.round(updateDeg / 20);
  margin = Math.round(updateMove / singleHeight) * singleHeight; // 如果不这么写 会导致没有滚动效果
  /* 计算touchEnd移动的整数距离 */
  endMove = margin;
  endDeg = Math.round(updateDeg / deg) * deg;
  if (type === 'end') {
    setListTransform(endMove, margin, type, time);
    setWheelDeg(endDeg, type, time);
  } else {
    setListTransform(updateMove, margin);
    setWheelDeg(updateDeg);
  }
  updateSpin(spinAim);
  getPickValue(endMove);
};

/* 更新spin */
const updateSpin = (spinAim) => {
  spin.value.start = spin.value.branch * -1 + spinAim;
  spin.value.end = spin.value.start + spin.value.branch * 2;
};

/* 获取选中值 */
const getPickValue = (move) => {
  const index = Math.round(-move / 34);
  const pickValue = getSpinData(index);
  emits('update:modelValue', pickValue);
};

const init = () => {
  let index, move;
  nextTick(() => {
    finger.value = { startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0 };
    index = props.listData.indexOf(props.modelValue);
    if (index === -1) {
      console.warn('当前初始值不存在，请检查后listData范围！！');
      setListTransform();
      getPickValue(0);
    } else {
      move = index * 34;
      /* 因为往上滑动所以是负 */
      setStyle(-move);
      setListTransform(-move, -move);
    }
  });
};

const handleWheelClick = (index) => {
  const move = index * 34;
  /* 因为往上滑动所以是负 */
  setStyle(-move);
  setListTransform(-move, -move);
};

const onWheel = (event) => {
  event.preventDefault();
  let move = 0;
  if (!currentTimeStamp.value) {
    currentTimeStamp.value = event.timeStamp || Date.now();
    return;
  }
  // props.type == 'line' 时 move的范围 [0, props.listData.length - 1 * 34]
  if (props.type === 'line') {
    move = +listRef.value.getAttribute('scroll') - (event.deltaY / 100) * 34;
    if (move > 0) {
      move = 0;
    }
    if (move < -(props.listData.length - 1) * 34) {
      move = -(props.listData.length - 1) * 34;
    }
  } else {
    move = +listRef.value.getAttribute('scroll') - (event.deltaY / 100) * 34;
  }

  const diff = event.timeStamp - currentTimeStamp.value;

  if (diff < 1000) {
    setStyle(move);
  }
  currentTimeStamp.value = event.timeStamp;
};

const itemTouchStart = (event) => {
  let finger = event.changedTouches[0];
  finger.value.startY = finger.pageY;
  finger.value.startTime = event.timestamp || Date.now();
  finger.value.transformY = listRef.value.getAttribute('scroll');
  event.preventDefault();
};

const itemTouchMove = (event) => {
  let finger = event.changedTouches[0];
  finger.value.lastY = finger.pageY;
  finger.value.lastTime = event.timestamp || Date.now();
  /* 设置css */
  let move = finger.value.lastY - finger.value.startY;

  setStyle(move);
  event.preventDefault();
};

const itemTouchEnd = (event) => {
  let finger = event.changedTouches[0];
  finger.value.lastY = finger.pageY;
  finger.value.lastTime = event.timestamp || Date.now();
  let move = finger.value.lastY - finger.value.startY;

  let time = finger.value.lastTime - finger.value.startTime;
  let v = move / time;
  let a = 1.8;
  /* 设置css */
  if (time <= 300) {
    move = v * a * time;
    time = 1000 + time * a;
    setStyle(move, 'end', time);
  } else {
    setStyle(move, 'end');
  }
};

onMounted(() => {
  pickerRef.value.addEventListener('touchstart', itemTouchStart);
  pickerRef.value.addEventListener('touchmove', itemTouchMove);
  pickerRef.value.addEventListener('touchend', itemTouchEnd);
  pickerRef.value.addEventListener('wheel', onWheel);
  init();
});

onBeforeUnmount(() => {
  pickerRef.value.removeEventListener('touchstart', itemTouchStart);
  pickerRef.value.removeEventListener('touchmove', itemTouchMove);
  pickerRef.value.removeEventListener('touchend', itemTouchEnd);
  pickerRef.value.removeEventListener('wheel', onWheel);
});
</script>

<style lang="less" scoped>
.cu-picker-content {
  --cu-picker-color-background: #fff;
  --cu-picker-color-text: #000;
  --cu-picker-color-subtext: #999;
  --cu-picker-color-border: #2c97f1;
  overflow: hidden;
  width: 100%;
  text-align: center;
  height: 220px;
  background: var(--cu-picker-color-background);
  position: relative;
}

.cu-picker-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 93px;
  z-index: 3;
  height: 34px;
  transform: translate3d(0px, 0px, 110px);

  &:after,
  &:before {
    position: absolute;
    top: 0;
    content: '';
    display: table;
    background: var(--cu-picker-color-border);
    width: 100%;
    height: 2px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }

  &:before {
    bottom: -1px;
    top: auto;
  }
}

.cu-picker-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 93px;
  overflow: hidden;
  height: 34px;
  transform: translate3d(0px, 0px, 110px);
  z-index: 2;
  background: var(--cu-picker-color-background);
}

.cu-picker-list__ul {
  position: relative;
}

.cu-picker-list__item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 34px;
  font-size: 16px;
  color: var(--cu-picker-color-text);
  cursor: pointer;
}

.cu-picker-wheel {
  position: absolute;
  left: 0;
  right: 0;
  top: 93px;
  transform-style: preserve-3d;
  height: 34px;
  z-index: 1;
}

.cu-picker-wheel__item {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  color: var(--cu-picker-color-subtext);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 34px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: var(--cu-picker-color-text);
  }

  &.hidden {
    visibility: hidden;
    opacity: 0;
  }
}
</style>
