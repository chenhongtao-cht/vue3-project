<template>
    <div>
      <el-card>
        <div class="title" style="text-align:center">
          <span>欢迎使用本系统</span>
        </div>
        <!-- <Register v-if="store.mode === 'register'" />
        <ForgetPassword v-if="store.mode === 'forgetPassword'" /> -->
        <el-form v-if="store.mode === 'userLogin'" ref="loginFormRef" :hide-required-asterisk="true" label-width="54px"
          :model="loginState.loginForm" :rules="loginState.loginRule">
          <el-form-item label="账号" prop="username">
            <el-input size="large" v-model="loginState.loginForm.username" :prefix-icon="User">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input size="large" v-model="loginState.loginForm.password" show-password :prefix-icon="Lock">
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-row class="captcha">
              <el-col :span="16">
                <el-input v-model="loginState.loginForm.captcha" size="large" :prefix-icon="Message"></el-input>
              </el-col>
              <el-col :span="6">
                <span @click="createCaptcha" class="captcha-img">{{ loginState.captchaImg }}</span>
              </el-col>
            </el-row>
          </el-form-item>
          <div style="width:100%">
            <el-button size="large" style="width:100%;" :loading="loading" @click="loginState.userLogin">登 录</el-button>
          </div>
          <div class="forget_register">
            <span>忘记密码</span>
            <span>注册账号</span>
          </div>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { User, Lock, Message } from '@element-plus/icons-vue'
  // import ForgetPassword from './components/forget-password.vue'
  // import Register from './components/register.vue'
  import { useControlStore } from '@/stores/control';

  const store = useControlStore()
  const router = useRouter();
  const loginFormRef = ref()
  const loading = ref(false)
  const captchaLoading = ref(false)
  const loginState = reactive({
    captchaImg: '',
    loginForm: {
      username: 'admin',
      password: 'admin',
      captcha: '0123'
    },
    loginRule: {
      username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    },
    userLogin: (): void => {
      loginFormRef.value.validate((valid: boolean) => {
        if (!valid) {
          return
        }
        loading.value = true
        router.push('/online-car/statistics')
      })
    }
  })
  
  // 生成验证码
  const createCaptcha = () => {
    captchaLoading.value = true
    new Promise((resolve) => {
      const res = String(Math.floor( Math.random() * 8999) + 1000);
      resolve(res)
    }).then((val: any) => {
      loginState.captchaImg = val
      loginState.loginForm.captcha = val
      captchaLoading.value = false
    })
  }
  createCaptcha()
  </script>
    
  <style scoped lang="less">
  .title {
    font-size: 24px;
    font-weight: 700;
    color: #000;
    margin-bottom: 20px;
  }
  .forget_register {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    cursor: pointer;
    color: #999;
  
    span:hover {
      color: #409eff;
    }
  }
  
  .captcha-img {
    display: block;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    background-color: #cfcdcd;
    padding-left: 5px;
    cursor: pointer;
    user-select: none;
  }
  </style>