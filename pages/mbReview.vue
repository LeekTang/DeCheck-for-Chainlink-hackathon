<template>
  <div class="bg-[#070312] min-h-screen">
    <div class="flex items-center justify-between h-[56px] px-[1rem]">
      <img class="h-[24px] w-[24px]" src="/images/mobile/common/back.svg" @click="backHandle" />
    </div>
    <div class="flex px-[1rem]">
      <img src="/images/defa.png" class="h-[2.5rem] w-[2.5rem] rounded-[0.5rem] mr-[0.625rem]" />
      <div>
        <p class="text-[1rem] text-[#fff] font-medium" style="font-family: Hezaedrus-Medium;">NAME</p>
        <p class="text-[0.75rem] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular;">RATE THIS ITEM</p>
      </div>
    </div>
    <div class="border border-[#ffffff1c] mx-[1rem] mt-[1rem] px-[1rem] bg-[#1B1A1D] rounded-[0.75rem]">
      <van-rate v-model="state.rate" :size="28" color="#FFB524" class="justify-between my-[1rem]" />
    </div>
    <div class="bg-[#302D34] rounded-t-[0.75rem]">
      <div class="flex flex-wrap px-[1.5rem] ">
        <span v-for="item in tagList" :key="item"
          :class="`${item.state ? 'bg-[#fff] text-[0.75rem]' : 'bg-[#302D34] text-[#fff]'} border py-[0.175rem] px-[0.5rem] mt-[1rem] rounded-full mr-[0.75rem]`">
          {{ item.name }}
        </span>
      </div>
      <van-field v-model="state.values" autosize type="textarea" placeholder="请输入用户名" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  rate: 3,
  values: ''
})

const tagList = [
  { name: "General", state: false },
  { name: "Contract", state: false },
  { name: "Tokenomics", state: false },
  { name: "Team", state: false },
  { name: "BUG", state: false },
  { name: "Investment", state: false },
  { name: "Other", state: false },
]
</script>

<style scoped>
:deep(.van-rate) {
  display: flex;
}

:deep(.van-cell) {
  background: #302D34
}
</style>