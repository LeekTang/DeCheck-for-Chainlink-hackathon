<template>
  <div class="px-[1rem]">
    <div class="text-[1rem] text-[#ffffffa8] mb-[1rem]" style="font-family:Hezaedrus-Bold">HOT PROJECT</div>
    <div>
      <swiper class="hotSwiper">
        <swiper-slide v-for="(item, index) in state.hotPorject" :key="index">
          <div class="h-[180px] w-[144px] bg-[#1B1A1D] border border-[#ffffff1c] rounded-[12px] text-center">
            <img :src="item.logo" class="h-[100px] w-[100px] rounded-[0.5rem] mx-auto mt-[1rem]" />
            <van-text-ellipsis :content="item.name" class="text-[12px] text-[#fff] mt-[0.6rem]" style="font-family:Hezaedrus-Medium"></van-text-ellipsis>
            <el-rate disabled  v-model="item.score" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import request from '@/src/utils/request'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import Swipers from 'swiper'
SwiperCore.use([Autoplay, Navigation])

const state = reactive({
  rate: 3,
  hotPorject: []
})

const getHotProject = () => {
  state.hotPorject = JSON.parse(localStorage.getItem('hotProject')) || [];
  if(state.hotPorject.length > 0 ){
    state.loading = false
  }
  new Swipers('.hotSwiper', {
    slidesPerView: 2.3,
    initialSlide: 1,
    observer: true,
    observeParents: true,
    spaceBetween: 16,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  })
  request.get(`/plugin/decheck/api/project/hot`).then((res) => {
    state.loading = false
    res.forEach(ele => {
      if(ele.tokenAddr){
        ele.tokenList = Object.entries(ele.tokenAddr)
      }
      ele.score = Number(ele.score).toFixed(0)
    });
    state.hotPorject = res
    localStorage.setItem('hotProject',JSON.stringify(state.hotPorject))
  })
}

onMounted(() => {
  getHotProject()
})
</script>

<style scoped>
.text-hidden {
  width: 185px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>