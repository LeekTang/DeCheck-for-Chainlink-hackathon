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
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { onMounted } from 'vue'
import { userStore } from '@/src/stores/user';
const store = userStore();

const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}

const initFireBase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCSLl0MGoILXK7DyZTLQho-eiCI-n7y7l0",
    authDomain: "decheck-e3f5a.firebaseapp.com",
    projectId: "decheck-e3f5a",
    storageBucket: "decheck-e3f5a.appspot.com",
    messagingSenderId: "975857598424",
    appId: "1:975857598424:web:8a9349ac27c9710fd6fcad",
    measurementId: "G-DCK4VDZZBV"
  };
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
};

onMounted(() => {
  initFireBase()
  store.isMobile = !!isMobile();
  window.addEventListener('resize', () => {
    setTimeout(() => {
      store.isMobile = !!isMobile();
    }, 200);
  })
})
</script>