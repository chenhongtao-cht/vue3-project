<template>
  <div class="upload-item">
    <el-upload action="#" :auto-upload="false" :file-list="props.FileList" list-type="picture-card"
      :on-change="handleChange" :on-remove="handleRemove">
    </el-upload>
  </div>
</template>

<script setup lang='ts'>
const emits = defineEmits(['change', 'remove']);
const props = defineProps({
  key: {
    type: String,
    default: ''
  },
  FileList: {
    type: Array,
    default: () => []
  }
});

const handleChange = (uploadFile, uploadFiles) => {
  emits('change', props.key, uploadFile);
};

const handleRemove = (uploadFile, uploadFiles) => {
  emits('remove', props.key, uploadFile);
};
</script>

<style lang='less' scoped></style>