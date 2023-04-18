<template>
  <ElIcon>
    <svg v-if="isLocal" aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>

    <span v-else ref="elRef" :class="$attrs.class">
      <span class="iconify" :data-icon="symbolId"></span>
    </span>
  </ElIcon>
</template>

<script setup lang="ts">
import { computed, unref, ref, watch, nextTick } from 'vue';
import { ElIcon } from 'element-plus';
import Iconify from '@purge-icons/generated';

const props = defineProps({
  // icon name
  icon: {
    type: String,
    default: ''
  }
});

const elRef = ref(null);

const isLocal = computed(() => props.icon.startsWith('svg-icon:'));

const symbolId = computed(() => {
  return unref(isLocal) ? `#icon-${props.icon.split('svg-icon:')[1]}` : props.icon;
});

const updateIcon = async (icon) => {
  if (unref(isLocal)) return;

  const el = unref(elRef);
  if (!el) return;

  await nextTick();

  if (!icon) return;

  const svg = Iconify.renderSVG(icon, {});
  if (svg) {
    el.textContent = '';
    el.appendChild(svg);
  } else {
    const span = document.createElement('span');
    span.className = 'iconify';
    span.dataset.icon = icon;
    el.textContent = '';
    el.appendChild(span);
  }
};

watch(
  () => props.icon,
  (icon) => {
    updateIcon(icon);
  }
);
</script>
