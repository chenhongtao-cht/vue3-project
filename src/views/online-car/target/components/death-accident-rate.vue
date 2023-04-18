<template>
    <div class="death-accident-rate">
        <el-table :data="tableData" ref="table">
          <el-table-column prop="platform" label="平台" />
          <el-table-column prop="onlineOperatingVehicles" label="上线运营车辆数"/>
          <el-table-column prop="deathAccidentNumber" label="亡人事故数" />
          <el-table-column prop="deathAccidentRate" label="亡人事故率" />
          <el-table-column prop="score" label="得分" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { onlineCarData } from "../../config.js"
import { onMounted, ref, watch } from 'vue';

const table = ref();
const dataSource = ref([]);
// 定义变量内容
const tableData = ref([]);
// 基础指标分数
const baseScore = ref(9);

// 定义父组件传过来的值
const props = defineProps({
	// 搜索表单
	quarter: {
		type: String,
		default: "",
	},
});

watch(
	() => props.quarter,
	() => {
		getTableData();
	}
);

// 初始化表格数据
const getTableData = () => {
    dataSource.value = onlineCarData.filter(item => item.quarter === props.quarter)
    let res = []
    dataSource.value.forEach(item => {
        const itemDeathAccidentRate = Number(item.onlineOperatingVehicles) === 0 ? 0: +(item.fatalTrafficAccidentsCount) / Number(item.onlineOperatingVehicles)
        const itemValue = {
            platform: item.platform,
            onlineOperatingVehicles: item.onlineOperatingVehicles,
            deathAccidentNumber: item.fatalTrafficAccidentsCount,
            deathAccidentRate: (itemDeathAccidentRate * 100).toFixed(6) + "%",
            score: getScroeValue(itemDeathAccidentRate)
        }
        res.push(itemValue)
    })
    tableData.value = res
};

const getScroeValue = (val: number = 0) => { 
    return ""
}

// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style lang="less" scoped>
.death-accident-rate {
    width: 100%;
    height: 100%;
}
</style>