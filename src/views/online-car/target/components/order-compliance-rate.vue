<template>
    <div class="order-compliance-rate">
        <el-table :data="tableData" ref="table">
          <el-table-column prop="platform" label="平台" />
          <el-table-column prop="orderCount" label="订单总数"/>
          <el-table-column prop="compliantOrdersCount" label="合规订单数" />
          <el-table-column prop="compliantOrdersRate" label="订单合规率" />
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
const baseScore = ref(10);

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
        const itemCompliantOrdersRate = +(item.orderCount) === 0 ? 0 : item.compliantOrdersCount / item.orderCount
        const itemValue = {
            platform: item.platform,
            orderCount: item.orderCount,
            compliantOrdersCount: item.compliantOrdersCount,
            compliantOrdersRate: (itemCompliantOrdersRate * 100).toFixed(4) + "%",
            score: getScroeValue(itemCompliantOrdersRate)
        }
        res.push(itemValue)
    })
    tableData.value = res
};

const getScroeValue = (val: number = 0) => { 
    return val * baseScore.value
}

// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style lang="less" scoped>
.order-compliance-rate {
    width: 100%;
    height: 100%;
}
</style>