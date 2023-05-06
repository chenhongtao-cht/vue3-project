<template>
  <div class="online-car-company-panel">
    <div class="online-car-company-panel-top">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="企业">
                <el-select v-model="formData.platform" placeholder="请选择企业">
                    <el-option
                        v-for="item in PlatformOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="季度">
                <el-select
                    v-model="formData.quarter"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="选择季度"
                    >
                    <el-option
                        v-for="item in DateOPtion"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="online-car-panel-bottom">
        <p class="bottom-title">{{ tableTitle || "" }}</p>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="quarter" label="季度" width="150" />
            <el-table-column label="市场占有率" align="center">
                <el-table-column prop="marketShare" label="市场占有率" align="center"/>
                <el-table-column prop="marketShareScroe" label="得分" align="center"/>
            </el-table-column>
            <el-table-column label="等候时长" align="center">
                <el-table-column prop="averageWaitingTime" label="平均等候时长（分）" align="center"/>
                <el-table-column prop="waitingTimeScroe" label="得分" align="center"/>
            </el-table-column>
            <el-table-column label="亡人事故率" align="center">
                <el-table-column prop="deathAccidentRate" label="亡人事故率" align="center"/>
                <el-table-column prop="deathAccidentScroe" label="得分" align="center" />
            </el-table-column>
            <el-table-column label="营运违章率" align="center">
                <el-table-column prop="operationViolationRate" label="营运违章率" align="center"/>
                <el-table-column prop="operationViolationScroe" label="得分" align="center"/>
            </el-table-column>
            <el-table-column label="订单合规率" align="center">
                <el-table-column prop="compliantOrdersRate" label="订单合规率" align="center"/>
                <el-table-column prop="compliantOrdersScroe" label="得分" align="center"/>
            </el-table-column>
        </el-table>
    </div>
  </div>
  
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import Api from "./api"
import { DateOPtion, PlatformOption, onlineCarData, getMarketShare, getWaitingTime, getDeathAccidentRate, getOperationViolationRate, getCompliantOrdersRate, getQuarterLabel } from "../config.js"

const formData = reactive({
  platform: '首汽约车',
  quarter: ['202301'],
})

const tableData = ref([]);
const tableTitle = ref("");

// 初始化表格数据
const getTableData = () => {
    tableTitle.value = formData.platform;
    let res = []
    const dataSource = onlineCarData.filter(item => item.platform === formData.platform && formData.quarter.includes(item.quarter)).sort((a, b) => a.quarter - b.quarter);
    dataSource.forEach(item => { 
        const itemValue = {
            quarter: getQuarterLabel(item.quarter),
            ...getMarketShare(item),
            ...getWaitingTime(item),
            ...getDeathAccidentRate(item),
            ...getOperationViolationRate(item),
            ...getCompliantOrdersRate(item)
        }
        res.push(itemValue)
    })
    tableData.value = res
};

const onSubmit = () => {
  getTableData()
}

const Init = async () => { 
    const res = await Api.getOnlineCarInfoList({
        quarter: "202301"
    })
    console.log(res,"res");
    
}
// 页面加载时
onMounted(() => {
    Init();
	getTableData();
});
</script>
<style lang="less" scoped>
.online-car-company-panel {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  .online-car-company-panel-top {
    height: 50px;
  }
  .bottom-title {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
  }
}
</style>