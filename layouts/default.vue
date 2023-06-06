<template>
  <div class="flex flex-col">
    <slot></slot>
    <el-backtop :bottom="isMobile ? 80 : 180" :right="isMobile ? 20 : 100">
      <img class="h-[1rem] w-[1rem] bg-[#fff] rounded-full" src="/images/backtop.svg" />
    </el-backtop>
  </div>
</template>

<script setup>
import '../assets/css/index.css'
import { ElBacktop } from 'element-plus';
import { onMounted } from 'vue'
import { userStore } from '@/src/stores/user';
const store = userStore();

const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}

onMounted(() => {
  store.isMobile = !!isMobile();
  window.addEventListener('resize', () => {
    setTimeout(() => {
      store.isMobile = !!isMobile();
    }, 200);
  })
})
</script>