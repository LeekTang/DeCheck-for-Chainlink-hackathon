<template>
  <div class="bg-[#070312] min-h-screen px-[16px] ">
    <div class="flex items-center justify-between h-[56px]">
      <img class="h-[24px] w-[24px]" src="/images/mobile/common/back.svg" @click="backHandle" />
      <div class="flex items-center">
        <img class="h-[24px] w-[24px] rounded-[8px] mr-[8px]" src="/images/defa.png"/>
        <p class="text-[18px] text-[#ffffff] font-medium" style="font-family: Hezaedrus-Medium;">NAME</p>
      </div>
      <div class="h-[24px] w-[24px]"></div>
    </div>
    <div class="flex justify-between text-[#ffffff] mt-[24px]" style="font-family: Hezaedrus-Medium;">
      <div>
        <p class="text-[18px]">4.6</p>
        <van-rate readonly :color="state.color" v-model="state.rate"  :size="16"/>
      </div>
      <div class="text-right text-[14px] flex flex-col justify-between">
        <p>$1822.53</p>
        <p :class="true ? 'text-[#11B466]' : 'text-[#FF5353]'">58.35%</p>
      </div>
    </div>
    <div>
      <div class="h-[40px] border border-[#ffffff1c]">
        <p>Contracts</p>
        <p class=""></p>
        <img src="" class="h-[16px] w-[16px]"/>
      </div>
    </div>
  </div>  
</template>

<script setup>
import { reactive } from 'vue'
const state = reactive({
  rate: 3,
  color: '#ffd21e',
  contracts: 'Ethereum,TomoChain,BNB,Orcte,Hziekqwn',
  links: [
    { title: 'Website', icon: '', address: ''},
    { title: 'Twitter', icon: '', address: ''},
    { title: 'Telegram', icon: '', address: ''},
    { title: 'Discore', icon: '', address: ''},
    { title: 'Reddit', icon: '', address: ''},
    { title: 'Github', icon: '', address: ''},
    { title: 'Website', icon: '', address: ''},
  ]
})
</script>

<style scoped>

</style>