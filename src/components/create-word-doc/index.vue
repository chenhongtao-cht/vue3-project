<template>
  <div class="create-word-doc-wrap">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
      <el-form-item label="驾驶员姓名" prop="driverName">
        <el-input v-model="ruleForm.driverName" />
      </el-form-item>
      <el-form-item label="驾驶员车牌号" prop="driverCarNumber">
        <el-input v-model="ruleForm.driverCarNumber" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">
          确定
        </el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
const ruleFormRef = ref()
const ruleForm = ref({
  driverName: 'Hello',
  driverCarNumber: '',
});

const rules = reactive({
  driverName: [
    { required: true, message: '请输入驾驶员姓名', trigger: 'blur' },
  ],
  driverCarNumber: [
    { required: true, message: '请输入驾驶员车牌号', trigger: 'blur' },
  ],
});

const submitForm = () => { };
const resetForm = () => { };

</script>

<style lang='less' scoped>
.create-word-doc-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>