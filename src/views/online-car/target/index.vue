<template>
  <div class="online-car-panel">
    <div class="online-car-panel-top">

      <el-select v-model="curSelectedDate" class="m-2" placeholder="请选择季度">
        <el-option
          v-for="item in DateOPtion"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="online-car-panel-bottom">
      <el-tabs
        v-model="activeName"
        s type="border-card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="市场占有率" name="marketShare">
          <MarketShare :quarter="curSelectedDate"></MarketShare>
        </el-tab-pane>
        <el-tab-pane label="等候时长" name="waitingTime">
          <WaitingTime :quarter="curSelectedDate"></WaitingTime>
        </el-tab-pane>
        <el-tab-pane label="亡人事故率" name="deathAccidentRate">
          <DeathAccidentRate :quarter="curSelectedDate"></DeathAccidentRate>
        </el-tab-pane>
        <el-tab-pane label="营运违章率" name="operationViolationRate">
          <OperationViolationRate :quarter="curSelectedDate"></OperationViolationRate>
        </el-tab-pane>
        <el-tab-pane label="订单合规率" name="orderComplianceRate">
          <OrderComplianceRate :quarter="curSelectedDate"></OrderComplianceRate>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { DateOPtion} from "../config.js"
import type { TabsPaneContext } from 'element-plus'
import MarketShare from "./components/market-share.vue"
import WaitingTime from "./components/waiting-time.vue"
import DeathAccidentRate from "./components/death-accident-rate.vue"
import OperationViolationRate from "./components/operation-violation-rate.vue"
import OrderComplianceRate from "./components/order-compliance-rate.vue"

const activeName = ref('marketShare')
const curSelectedDate = ref('202301')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}
</script>
<style lang="less" scoped>
.online-car-panel {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  .online-car-panel-top {
    height: 50px;
  }
}
</style>