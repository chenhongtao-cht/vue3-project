<template>
    <div class="waiting-time">
        <el-table :data="tableData" ref="table">
          <el-table-column prop="platform" label="平台" />
          <el-table-column prop="realTimeOrderCount" label="订单总数"/>
          <el-table-column prop="waitTimeSeconds" label="等候时长（秒）" />
          <el-table-column prop="waitTimeMinutes" label="等候时长（分）" />
          <el-table-column prop="averageWaitingTime" label="订单平均等候时长" />
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
const baseScore = ref(2);

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
        const itemWaitTimeMinutes = +(item.waitTimeSeconds) / 60;
        const itemRealTimeOrderCount = +item.realTimeOrderCount;
        const itemAverageWaitingTime = itemRealTimeOrderCount === 0 ? 0: itemWaitTimeMinutes / itemRealTimeOrderCount;

        const itemValue = {
            platform: item.platform,
            realTimeOrderCount: itemRealTimeOrderCount,
            waitTimeSeconds: item.waitTimeSeconds,
            waitTimeMinutes: itemWaitTimeMinutes,
            averageWaitingTime: itemAverageWaitingTime,
            score: getScroeValue(itemAverageWaitingTime)
        }
        res.push(itemValue)
    })
    tableData.value = res
};

const getScroeValue = (val: number = 0) => {
    let rate = 1;
    if (val <= 4) {
        rate = 1; 
    } else if( val > 4 && val <= 6) { 
        rate = 1 - (val - 4) * 0.15/2
    }else if( val > 6 && val <= 8) { 
        rate = 0.85 - (val - 6) * 0.25/2
    }else if( val > 8 && val <= 10) { 
        rate = 0.6 - (val - 8) * 0.60/2
    }else if( val > 10) { 
        rate = 0
    }

    return rate * baseScore.value
}

// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style lang="less" scoped>
.waiting-time {
    width: 100%;
    height: 100%;
}
</style>