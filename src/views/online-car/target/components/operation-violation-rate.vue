<template>
    <div class="operation-violation-rate">
        <el-table :data="tableData" ref="table">
          <el-table-column prop="platform" label="平台" />
          <el-table-column prop="onlineOperatingVehicles" label="上线运营车辆数"/>
          <el-table-column prop="operatingViolationsCount" label="违章宗数" />
          <el-table-column prop="operationViolationRate" label="营运违章率" />
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
const baseScore = ref(14);

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
        const itemOperationViolationRate = +(item.onlineOperatingVehicles) === 0 ? 0 : +(item.operatingViolationsCount) / Number(item.onlineOperatingVehicles)
        const itemValue = {
            platform: item.platform,
            onlineOperatingVehicles: item.onlineOperatingVehicles,
            operatingViolationsCount: item.operatingViolationsCount,
            operationViolationRate: (itemOperationViolationRate * 100) + "%",
            score: getScroeValue(itemOperationViolationRate)
        }
        res.push(itemValue)
    })
    tableData.value = res
};

const getScroeValue = (val: number = 0) => { 
    let rate = 1;
    if (+val === 0) {
        rate = 1
    } else if(+val > 1) { 
        rate = 0
    } else if(+val > 0 && +val <= 1) { 
        rate = 1 - val
    }

    return rate * baseScore.value
}

// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style lang="less" scoped>
.operation-violation-rate {
    width: 100%;
    height: 100%;
}
</style>