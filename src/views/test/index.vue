<template>
    <PropsTest :title="title" :content="content"></PropsTest>
    <div class="text-red-500 bg-black flex justify-center text-base">{{text}}</div>
</template>

<script setup lang="ts">
import PropsTest from "./components/props-test.vue"
import { ref, onMounted } from 'vue'

const title = ref('标题1')
const content = ref('内容1')
const text = ref('2222')

onMounted(() => {
    text.value = '1111'
    title.value = "标题改变"
    content.value = "内容改变"
});
</script>
