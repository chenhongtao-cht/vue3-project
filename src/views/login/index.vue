<template>
  <div class="login-wrap">
    <div class="login-card">
      <UserLogin />
    </div>
  </div>
</template>
<script setup lang="ts">
import UserLogin from './components/user-login.vue'

</script>

<style lang="less" scoped>
.login-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("./images/bankground.png");
  background-size: 100% 100%;
}
.login-card {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>