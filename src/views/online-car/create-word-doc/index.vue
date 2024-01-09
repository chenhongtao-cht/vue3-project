<template>
  <div class="create-word-doc-wrap">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="180px" class="demo-ruleForm" status-icon>
      <div class="item-row">
        <el-form-item label="驾驶员姓名" prop="driverName">
          <el-input v-model="ruleForm.driverName" clearable />
        </el-form-item>
        <el-form-item label="前后车牌是否一致">
          <el-switch v-model="ruleForm.isHasOther" />
        </el-form-item>
      </div>
      <div class="item-row">
        <el-form-item label="驾驶员车牌号" prop="driverCarNumber">
          <el-input v-model="ruleForm.driverCarNumber" clearable />
        </el-form-item>
        <el-form-item label="驾驶员车牌号（后）" prop="driverCarNumberOther" v-if="ruleForm.isHasOther">
          <el-input v-model="ruleForm.driverCarNumberOther" placeholder="前后车牌一致不需要填写" clearable />
        </el-form-item>
      </div>
      <div class="item-row">
        <el-form-item label="违法车辆和驾驶人照片" prop="carAndDriverImg">
          <Upload key="carAndDriverImg" :file-list="ruleForm.carAndDriverImg" @change="handleUploadChange"
            @remove="handleUploadRemove"></Upload>
        </el-form-item>
        <el-form-item label="违法车辆和驾驶人照片(其他)" prop="carAndDriverImgOther" v-if="ruleForm.isHasOther">
          <Upload key="carAndDriverImgOther" :file-list="ruleForm.carAndDriverImgOther" @change="handleUploadChange"
            @remove="handleUploadRemove"></Upload>

        </el-form-item>
      </div>
      <div class="item-row">
        <el-form-item label="涉案车辆的VIN码照片" prop="carVINImg">
          <Upload key="carVINImg" :file-list="ruleForm.carVINImg" @change="handleUploadChange"
            @remove="handleUploadRemove"></Upload>
        </el-form-item>
        <el-form-item label="违法行为人身份证复印件" prop="driverCardImg">
          <Upload key="driverCardImg" :file-list="ruleForm.driverCardImg" @change="handleUploadChange"
            @remove="handleUploadRemove"></Upload>
        </el-form-item>
      </div>
      <div class="item-row">
        <el-form-item label="驾驶证复印件" prop="driverLicenceImg">
          <Upload key="driverLicenceImg" :file-list="ruleForm.driverLicenceImg" @change="handleUploadChange"
            @remove="handleUploadRemove"></Upload>
        </el-form-item>
      </div>
      <div class="item-row">
        <el-form-item label="行驶证复印件" prop="carLicenceImg">
          <Upload key="carLicenceImg" :file-list="ruleForm.carLicenceImg" @change="handleUploadChange"
            @remove="handleUploadRemove"></Upload>
        </el-form-item>

        <el-form-item label="行驶证复印件(其他)" prop="carLicenceImgOther" v-if="ruleForm.isHasOther">
          <Upload key="carLicenceImgOther" :file-list="ruleForm.carLicenceImgOther" @change="handleUploadChange"
            @remove="handleUploadRemove"></Upload>
        </el-form-item>
      </div>
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
import { ref, reactive, watch, computed } from 'vue';
import { exportWordFile } from './export-word.js';
import { uniqueId, cloneDeep } from 'lodash-es';
import Upload from './upload.vue';

const ruleFormRef = ref()
const ruleForm = ref({
  driverName: '',
  isHasOther: false,
  driverCarNumber: '',
  driverCarNumberOther: '',
  carAndDriverImg: [],
  carAndDriverImgOther: [],
  carVINImg: [],
  driverCardImg: [],
  driverLicenceImg: [],
  carLicenceImg: [],
  carLicenceImgOther: []
});

const rules = reactive({
  driverName: [
    { required: true, message: '请输入驾驶员姓名', trigger: 'blur' },
  ],
  driverCarNumber: [
    { required: true, message: '请输入驾驶员车牌号', trigger: 'blur' },
  ],
  carAndDriverImg: [
    { required: true, message: '请上传违法车辆和驾驶人照片', trigger: 'blur' }
  ],
  carVINImg: [
    { required: true, message: '请上传违法车辆和驾驶人照片', trigger: 'blur' }
  ],
  driverCardImg: [
    { required: true, message: '请上传违法车辆和驾驶人照片', trigger: 'blur' }
  ],
  driverLicenceImg: [
    { required: true, message: '请上传违法车辆和驾驶人照片', trigger: 'blur' }
  ],
  carLicenceImg: [
    { required: true, message: '请上传违法车辆和驾驶人照片', trigger: 'blur' }
  ]
});

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('文件流异常'));
    };
  });
};

const handleUploadChange = (key, uploadFile) => {
  const imgUrl = URL.createObjectURL(uploadFile.raw);

  //图片格式为blob,所以我这里使用blobToBase64()将图片转化为base64
  blobToBase64(uploadFile.raw).then((res) => {
    ruleForm.value[key].push({
      id: uploadFile.uid,
      name: uploadFile.name,
      imageData: res
    });
  });
};

const handleUploadRemove = (key, uploadFile) => {
  const index = ruleForm.value[key].findIndex((item) => (item.id = uploadFile.uid));
  ruleForm.value[[key]].splice(index, 1);
};

const submitForm = () => {
  exportWordFile('demo.docx', { ...ruleForm.value },);
};
const resetForm = () => {
  ruleFormRef.value && ruleFormRef.value.resetFields();
};

const handleCarDriverChange = (uploadFile, uploadFiles) => {
  handleUploadChange('carAndDriverImg', uploadFile);
};
const handleCarDriverRemove = (uploadFile, uploadFiles) => {
  handleUploadRemove('carAndDriverImg', uploadFile);
};

const handleCarDriverOtherChange = (uploadFile, uploadFiles) => {
  console.log('change', uploadFile, uploadFiles);

};
const handleCarDriverOtherRemove = (uploadFile, uploadFiles) => {
  console.log('remove', uploadFile, uploadFiles);
};

const handleVINChange = (uploadFile, uploadFiles) => {
  console.log('change', uploadFile, uploadFiles);

};
const handleVINRemove = (uploadFile, uploadFiles) => {
  console.log('remove', uploadFile, uploadFiles);
};

const handleCardChange = (uploadFile, uploadFiles) => {
  console.log('change', uploadFile, uploadFiles);

};
const handleCardRemove = (uploadFile, uploadFiles) => {
  console.log('remove', uploadFile, uploadFiles);
};

const handleDriverLicenceChange = (uploadFile, uploadFiles) => {
  console.log('change', uploadFile, uploadFiles);

};
const handleDriverLicenceRemove = (uploadFile, uploadFiles) => {
  console.log('remove', uploadFile, uploadFiles);
};

const handleCarLicenceChange = (uploadFile, uploadFiles) => {
  console.log('change', uploadFile, uploadFiles);

};
const handleCarLicenceRemove = (uploadFile, uploadFiles) => {
  console.log('remove', uploadFile, uploadFiles);
};

const handleCarLicenceOtherChange = (uploadFile, uploadFiles) => {
  console.log('change', uploadFile, uploadFiles);

};
const handleCarLicenceOtherRemove = (uploadFile, uploadFiles) => {
  console.log('remove', uploadFile, uploadFiles);
};

watch(() => ruleForm.value.driverCarNumber, (val) => {
  console.log(val, 'val');

});
</script>

<style lang='less' scoped>
.create-word-doc-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;

  .demo-ruleForm {
    width: 70%;
  }

  .item-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-gap: 20px;
  }

  .el-input {
    width: 200px;
  }
}
</style>