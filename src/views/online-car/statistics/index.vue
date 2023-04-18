<template>
  <div class="online-car-statistics-panel">
    <div class="online-car-statistics-panel-top">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="企业">
                <el-select v-model="formData.platform" placeholder="请选择企业" clearable >
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
    <div class="online-car--statistics-panel-bottom">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="item in Object.entries(KEYMAP)" :key="item[0]" :label="item[1]" :prop="item[0]" align="center">
            </el-table-column>
        </el-table>
    </div>
  </div>
  
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted  } from 'vue'
import { onlineCarData, KEYMAP, getQuarterLabel, PlatformOption, DateOPtion } from "../config.js"

const formData = reactive({
  platform: '',
  quarter: ['202301'],
})

const tableData = ref([]);

// 初始化表格数据
const getTableData = () => {
    let dataSource = [];

    if (formData.platform !== "") {
        dataSource = onlineCarData.filter(item => item.platform === formData.platform && formData.quarter.includes(item.quarter)).sort((a, b) => a.quarter - b.quarter)
    } else { 
        dataSource = onlineCarData.filter(item => formData.quarter.includes(item.quarter)).sort((a, b) => a.quarter - b.quarter);
    }

    dataSource =  dataSource.map(item => { 
        return {
            ...item,
            quarter: getQuarterLabel(item.quarter),
        }
    })
    
    tableData.value = dataSource
};

const onSubmit = () => {
  getTableData()
}

// 页面加载时
onMounted(() => {
	getTableData();
});

</script>
<style lang="less" scoped>
.online-car-statistics-panel {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  .online-car-statistics-panel-top {
    height: 50px;
  }
}
</style>