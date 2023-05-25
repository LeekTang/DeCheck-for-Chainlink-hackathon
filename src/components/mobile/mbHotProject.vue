<template>
  <div class="px-[1rem]">
    <div class="text-[1rem] text-[#ffffffa8] mb-[1rem]" style="font-family:Hezaedrus-Bold">HOT PROJECT</div>
    <div>
      <swiper class="hotSwiper">
        <swiper-slide v-for="(item, index) in 6" :key="index">
          <div class="h-[180px] w-[144px] bg-[#1B1A1D] border border-[#ffffff1c] rounded-[12px] text-center">
            <img src="/images/defa.png" class="h-[100px] w-[100px] rounded-[0.5rem] mx-auto mt-[1rem]" />
            <p class="text-[12px] text-[#fff] mt-[0.6rem]" style="font-family:Hezaedrus-Medium">Project Name</p>
            <el-rate disabled  v-model="state.rate" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import Swipers from 'swiper'
SwiperCore.use([Autoplay, Navigation])

const state = reactive({
  rate: 3
})

onMounted(() => {
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
})
</script>

<style scoped></style>