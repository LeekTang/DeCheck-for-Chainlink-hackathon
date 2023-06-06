<template>
  <div class="bg-[#070312] text-[white] min-h-screen">
    <mbHeader>
      <template v-slot:left>
        <div @click="goBack">
          <img src="/images/mobile/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:right>
        <div @click="handleMore">
          <img src="/images/mobile/common/more.svg" alt="">
        </div>
      </template>
    </mbHeader>
    <div class="text-[50px] text-center font-black leading-[45px] linear-text" style="font-family: Hezaedrus-Black;">
      <p>10,000,000</p>
      <p>DCK</p>
    </div>
    <div class="mt-[30px] bg h-[247px] relative">
      <div>
        <img src="/images/mobile/profile/gold.svg" class="h-[148px] w-[140px] mt-[-37px] mx-auto antio" />
        <img src="/images/mobile/profile/platform.svg"
          class="h-[325px] w-[256px] absolute bottom-[-22px] left-2/4 translate-x-[-50%]" />
      </div>
    </div>
    <div class="text-center mt-[46px]">
      <p class="text-[16px] leading-[16px] text-[#FFFFFFA8] font-normal" style="font-family: Hezaedrus-Regular;">I have
        collected</p>
      <p class="text-[24px] leading-[24px] text-[#ffffff] font-bold mt-[10px]" style="font-family: Hezaedrus-Bold;">
        10,000,000</p>
      <div
        class="h-[40px] leading-[40px] w-[312px] border border-[#FFFFFF1C] divBg rounded-[12px] mx-auto mt-[20px] text-[16px] text-[#ffffff] font-medium"
        style="font-family: Hezaedrus-Medium;">COLLECT</div>
    </div>
    <div class="mt-[24px] bg-[#302D34] rounded-t-[12px] p-[16px] pb-[60px]">
      <p class="text-[14px] leading-[14px] text-[#FFFFFFA8] font-bold mb-[16px]" style="font-family: Hezaedrus-Bold;">
        COLLECT HISTORY</p>
      <div class="flex justify-between item-center h-[40px] leading-[40px]" v-for="item in historyList" :key="item.id">
        <div>
          <span class="text-[14px] leading-[14px] text-[#FFFFFFA8] font-medium mr-[10px]"
            style="font-family: Hezaedrus-Medium;">DCK</span>
          <span class="text-[14px] leading-[14px] text-[#ffffff] font-bold" style="font-family: Hezaedrus-Bold;">{{
            item.num }}</span>
        </div>
        <div class="text-[12px] text-[#FFFFFFA8] font-normal" style="font-family: Hezaedrus-Regular;">{{ item.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mbHeader from '@/src/components/mobile/mbHeader.vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const historyList = [
  { id: 1, num: 100000, time: '2023-05-24' },
  { id: 2, num: 300, time: '2023-05-24' },
  { id: 3, num: 400, time: '2023-05-24' },
  { id: 4, num: 100, time: '2023-05-24' },
  { id: 5, num: 3000, time: '2023-05-24' },
  { id: 6, num: 40000, time: '2023-05-24' },
  { id: 7, num: 4500, time: '2023-05-24' },
  { id: 8, num: 135000, time: '2023-05-24' },
  { id: 9, num: 15000, time: '2023-05-24' },
  { id: 10, num: 500, time: '2023-05-24' },
]

const goBack = () => {
  router.go(-1);
}
</script>

<style scoped>
.linear-text {
  background-image: linear-gradient(228.17deg, #5BD7FF 0%, #AC73FF 100%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.bg {
  background: url('/images/mobile/profile/dck-bg.svg') no-repeat;
  background-size: 100% 100%;
}

.divBg {
  background: linear-gradient(228.17deg, #36CEFF 0%, #8E40FF 100%);
}

.antio {
  animation: glodRa 2s linear infinite alternate;
}

@keyframes glodRa {
  0% {
    -webkit-transform: rotateY(0deg) translateY(10px);
  }

  25% {
    -webkit-transform: rotateY(90deg) translateY(18px);
  }

  50% {
    -webkit-transform: rotateY(180deg) translateY(24px);
  }

  75% {
    -webkit-transform: rotateY(270deg) translateY(32px);
  }

  100% {
    -webkit-transform: rotateY(360deg) translateY(40px);
  }
}</style>