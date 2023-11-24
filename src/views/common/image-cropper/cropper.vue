<template>
  <div class="image-cropper-second">
    <input type="file" accept="image/*" @change="onChange" />
    <img v-if="previewImage" :src="previewImage" alt="预览图" style="max-width: 100%; max-height: 100%;">
    <Cropper v-if="cropperVisible" :imagePath="imagePath" fileType="blob" @save="onSave" @cancel="onCancel" />
  </div>
</template>

<script lang="ts">


import { reactive, toRefs } from 'vue';
import Cropper from "@/components/image-cropper/Cropper.vue";
const URL = window.URL || window.webkitURL;
export default {
  name: 'App',
  components: {
    Cropper
  },
  setup() {
    const state = reactive({
      cropperVisible: false,
      imagePath: '',
      previewImage: null
    })

    const onChange = (e) => {
      const file = e.target.files[0]
      state.imagePath = URL.createObjectURL(file);
      state.cropperVisible = true
    };

    const onSave = (res) => {
      if (typeof res === 'string') {
        state.previewImage = res
      } else {
        state.previewImage = URL.createObjectURL(res)
      }
      state.cropperVisible = false
    };

    const onCancel = () => {
      state.cropperVisible = false
    };

    return {
      ...toRefs(state),
      onChange,
      onSave,
      onCancel
    };
  }
}
</script>

<style lang="less" scoped>
.image-cropper-second {
  width: 100%;
  height: 100%;
}
</style>
