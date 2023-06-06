<template>
  <div class="px-[1rem]">
    <div class="text-[1rem] text-[#ffffffa8] mb-[1rem]" style="font-family:Hezaedrus-Bold">HOT PROJECT</div>
    <div>
      <swiper class="hotSwiper">
        <swiper-slide v-for="(item, index) in state.hotPorject" :key="index" style="width: 144px;">
          <div class="h-[180px] w-[144px] bg-[#1B1A1D] border border-[#ffffff1c] rounded-[12px] text-center">
            <img :src="item.logo" class="h-[100px] w-[100px] rounded-[0.5rem] mx-auto mt-[1rem]" />
            <van-text-ellipsis :content="item.name" class="text-[12px] text-[#fff] mt-[0.6rem]" style="font-family:Hezaedrus-Medium"></van-text-ellipsis>
            <van-rate readonly  v-model="item.score" size="15" void-icon="star" color="#FFB524" void-color="#FFFFFF54" />
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
    slidesPerView: parseInt(((document.documentElement.clientWidth - 32) / 144) * 10) /10,
    // initialSlide: 1,
    observer: true,
    observeParents: true,
    spaceBetween: 16,
  })
  request.get(`/plugin/decheck/api/project/hot`).then((res) => {
    state.loading = false
    res.forEach(ele => {
      if(ele.tokenAddr){
        ele.tokenList = Object.entries(ele.tokenAddr)
      }
      ele.score = Number(ele.score)
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