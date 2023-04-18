<template>
    <div class="market-share-table">
        <el-table :data="tableData" ref="table">
          <el-table-column prop="platform" label="平台" />
          <el-table-column prop="onlineOperatingVehicles" label="上线运营车辆数"/>
          <el-table-column prop="allVehicles" label="各平台企业营运车辆数" />
          <el-table-column prop="marketShare" label="市场占有率" />
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
const baseScore = ref(4);

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
    dataSource.value = onlineCarData.filter(item => item.quarter === props.quarter);
    let res = []
    const allVehicles = getAllVehicles();
    dataSource.value.forEach(item => { 
        const itemValue = {
            platform: item.platform,
            onlineOperatingVehicles: item.onlineOperatingVehicles,
            allVehicles: allVehicles,
            marketShare: ((item.onlineOperatingVehicles / allVehicles) * 100).toFixed(4) + "%",
            score: getScroeValue(item.onlineOperatingVehicles / allVehicles)
        }
        res.push(itemValue)
    })
    tableData.value = res
};

// 获取所有车辆数
const getAllVehicles = () => { 
    return dataSource.value.reduce((prev, cur) => {
        return prev + Number(cur.onlineOperatingVehicles)
    }, 0)
}

// 计算得分
const getScroeValue = (val: number = 0) => { 
    if (val > 0.5) {
        return baseScore.value
    } else { 
        return val * baseScore.value * 2
    }
}

// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style lang="less" scoped>
.market-share-table {
    width: 100%;
    height: 100%;
}
</style>