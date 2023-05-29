<template>
  <template v-if="!state.isMobile">
    <div class="relative min-w-[1200px] w-full text-gray-700 bg-[#0a0118]">
      <HeaderView />
      <TopView />
      <Introduce />
      <HotRevi />
      <Superiority />
      <Contract />
      <BottomBar />
    </div>
  </template>
  <template v-else>
    <div class="bg-[#070312] min-h-screen">
      <mbHeader>
        <template v-slot:left>
          EXPLORER
        </template>
      </mbHeader>
      <mbHot></mbHot>
      <mbPor></mbPor>
      <tabBar></tabBar>
    </div>
  </template>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import HeaderView from '@/src/components/Header.vue';
import TopView from '@/src/components/TopModel.vue'
import Introduce from '@/src/components/Introduce.vue'
import HotRevi from '@/src/components/hotRevi.vue'
import Superiority from '@/src/components/Superiority.vue'
import Contract from '@/src/components/Contract.vue'
import BottomBar from '@/src/components/BottomBar.vue'
import mbHeader from '@/src/components/mobile/mbHeader.vue'
import mbHot from '@/src/components/mobile/mbHotProject.vue'
import mbPor from '@/src/components/mobile/mbProject.vue'
import tabBar from '@/src/components/mobile/mbTabBar.vue'

const state = reactive({
  isMobile: false
})

onMounted(() => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  state.isMobile = !!flag;
  window.addEventListener('resize', () => {
    setTimeout(() => {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      state.isMobile = !!flag;
    }, 200);
  })

  var lis = document.querySelectorAll('.myhoverbox');
  for (var i = 0; i < lis.length; i++) {
    // 鼠标经过li触发事件
    lis[i].addEventListener('mouseover', function () {
      // 这样拿到的元素 就是当前鼠标放置的li的子元素
      var light = this.querySelector('.light');
      light.style.display = 'block';
      // 现在开始绑定位置，鼠标移动触发事件
      this.addEventListener('mousemove', function (e) {
        // 获取鼠标当前位置 距离li左侧距离算法是             鼠标距离屏幕左侧的距离 - li距离屏幕左侧的距离
        var x = e.pageX - this.offsetLeft - light.offsetWidth / 2;
        // 距离顶部的计算方法也一样
        var y = e.pageY - this.offsetTop - light.offsetHeight / 2;
        // 开始绑定给light
        light.style.left = x + 'px';
        light.style.top = y + 'px';

        // 还存在一个问题 就是鼠标不是在light的中心，只需要x-light的宽除2即可
      })
    })

    // 鼠标离开li隐藏light
    lis[i].addEventListener('mouseout', function () {
      var light = this.querySelector('.light');
      light.style.display = 'none';
    })
  }

})
</script>
<style scoped>
</style>