<template>
    <div class="mars3d-wrap">
        <div class="left-panel">
            <BaseMenu :mode="'vertical'" :menu-data="menuData" @select="handleSelect"></BaseMenu>
        </div>
        <div class="right-panel">
            <BaseMap>
                <components :is="currentComponent"></components>
            </BaseMap>
        </div>
    </div>
</template>

<script setup>
import BaseMenu from "@/components/base-menu/index.vue"
import BaseMap from '@/components/vue3-basemap-mars3d'
import { menuData } from "./config.js"
import { ref } from "vue"
import LineLayer from "./components/line-layer.vue"

const currentComponent = ref('LineLayer')


const handleSelect = (key) => { 
    
}
</script>

<style lang='less' scoped>
.mars3d-wrap {
    display: flex;
    height: 100%;
    .left-panel {
        width: 200px;
        height: 100%;
        background-color: #999;
    }
    .right-panel {
        flex: 1;
    }
}
</style>