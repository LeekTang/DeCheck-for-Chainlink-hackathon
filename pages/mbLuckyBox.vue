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
      <p>LUCKT</p>
      <p>BOX</p>
    </div>
    <div class="h-[332px] mt-[-50px] relative">
      <div class="relative antio">
        <img src="/images/mobile/profile/box-s.svg" class="h-[211px] w-[194px] mx-auto" />
        <svg width="230px" height="148px" viewBox="0 0 258 140" class="absolute top-[40px] left-2/4 translate-x-[-50%]">
          <image x="-14" y="-14" width="28" height="28" href="/images/mobile/profile/Star.svg">
            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
              <mpath xlink:href="#motion-path" />
            </animateMotion>
          </image>
          <path fill-rule="evenodd" stroke="#CFC1FF" clip-rule="evenodd" id="motion-path"
            d="M75.3066 0.864423C75.0638 0.846176 74.8214 0.828288 74.5795 0.810757C54.6636 -0.632023 37.3417 0.346194 24.4361 3.6766C11.6047 6.98783 2.7877 12.7257 0.546524 21.0899C-1.12083 27.3126 1.10142 34.0984 6.19574 40.945C11.2983 47.8027 19.3836 54.8682 29.7782 61.7485C50.5764 75.5151 80.8148 88.6675 115.565 97.9789C150.316 107.29 183.079 111.019 207.974 109.496C220.417 108.735 230.951 106.659 238.799 103.271C246.634 99.8888 251.952 95.1232 253.619 88.9005C255.824 80.6716 251.245 71.4621 242.098 62.3321C232.901 53.1513 218.841 43.7914 201.39 35.1758C201.196 35.0798 201.001 34.9838 200.805 34.8879L201.495 37.4605C218.377 45.8855"
            fill="url(#paint0_linear_966_16542)" />
        </svg>
        <img src="/images/mobile/profile/Star.svg" class="h-[20px] w-[20px] absolute top-[30px] right-[80px] star1" />
        <img src="/images/mobile/profile/Star.svg" class="h-[16px] w-[16px] absolute top-[40px] left-[90px] star2" />
        <img src="/images/mobile/profile/Star.svg" class="h-[12px] w-[12px] absolute bottom-[30px] right-[60px] star2" />
        <img src="/images/mobile/profile/Star.svg" class="h-[24px] w-[24px] absolute bottom-[-30px] left-[60px] star1" />
      </div>
      <img src="/images/mobile/profile/platform-more.svg"
        class="h-[325px] w-[256px] absolute bottom-[-22px] left-2/4 translate-x-[-50%]" />
    </div>
    <div class="text-center hearBg">
      <p class="text-[16px] leading-[16px] text-[#FFFFFFA8] font-normal pt-[46px]" style="font-family: Hezaedrus-Regular;">I have
        collected</p>
      <p class="text-[24px] leading-[24px] text-[#ffffff] font-bold mt-[10px]" style="font-family: Hezaedrus-Bold;">
        10,000,000</p>
      <div
        class="h-[40px] leading-[40px] w-[312px] border border-[#FFFFFF1C] divBg rounded-[12px] mx-auto mt-[20px] text-[16px] text-[#ffffff] font-medium"
        style="font-family: Hezaedrus-Medium;">open</div>
    </div>
    <div class="mt-[24px] bg-[#302D34] rounded-t-[12px] p-[16px] pb-[60px]">
      <p class="text-[14px] leading-[14px] text-[#FFFFFFA8] font-bold mb-[16px]" style="font-family: Hezaedrus-Bold;">
        HISTORY</p>
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
import { reactive, onMounted } from 'vue';
import mbHeader from '@/src/components/mobile/mbHeader.vue'
import web3js from '@/src/utils/link'
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

const getLastTime = () => {
  web3js.lastLuckyTime()
}

onMounted(()=>{
  getLastTime()
})
</script>

<style scoped>
.linear-text {
  background-image: linear-gradient(228.17deg, #5BD7FF 0%, #AC73FF 100%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.divBg {
  background: linear-gradient(228.17deg, #36CEFF 0%, #8E40FF 100%);
}

.antio {
  animation: glodRa 2s linear infinite alternate;
}

@keyframes glodRa {
  0% {
    -webkit-transform: translateY(10px);
  }

  25% {
    -webkit-transform: translateY(18px);
  }

  50% {
    -webkit-transform: translateY(24px);
  }

  75% {
    -webkit-transform: translateY(32px);
  }

  100% {
    -webkit-transform: translateY(40px);
  }
}

.star1 {
  animation: starAni 1s linear infinite alternate;
}

@keyframes starAni {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0.8;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.3;
  }

  100% {
    opacity: 0;
  }
}

.star2 {
  animation: starAni2 1s linear infinite alternate;
}

@keyframes starAni2 {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.8;
  }

  100% {
    opacity: 1;
  }
}

.hearBg{
  background: url('/images/mobile/profile/hear.svg') no-repeat;
  background-size: cover;
}
</style>