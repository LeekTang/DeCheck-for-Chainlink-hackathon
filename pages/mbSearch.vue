<template>
  <div class="bg-[#070312] min-h-screen">
    <div class="flex items-center px-[16px] h-[56px] bg-[#1B1A1D]">
      <img class="h-[24px] w-[24px] mr-[16px]" src="/images/mobile/common/back.svg" @click="backHandle" />
      <van-search v-model="state.inputValue" @update:model-value="updateHandle" @search="searchHandle"
        class="bg-[#302D34] h-[32px] flex-1 rounded-full mr-[16px]">
        <template #left-icon>
          <img src="/images/mobile/home/sm-search.svg" class="h-[16px] w-[16px]" />
        </template>
      </van-search>
      <p class="text-[14px] text-[#fff] w-[58px]" style="font-family: Hezaedrus-Medium;" @click="searchHandle">SEARCH</p>
    </div>
    <!-- 搜索推荐 -->
    <template v-if="state.showBlur">
      <div v-for="item in 9" :key="item" @click="projectHandle"
        class="h-[48px] pl-[16px] flex items-center border-b border-[#ffffff1c] bg-[#1B1A1D]">
        <img src="/images/mobile/home/sm-search.svg" class="h-[16px] w-[16px] mr-[8px]" />
        <p class="text-[#ffffff] text-[14px]" style="font-family: Hezaedrus-Regular;">OpenSea</p>
      </div>
    </template>
    <!-- 历史记录 -->
    <div class="mt-[1.5rem]" v-if="state.recordList.length > 0">
      <div class="flex justify-between items-center px-[1rem]">
        <p class="text-[#fff] text-[12px]" style="font-family: Hezaedrus-Bold;">MY SEARCHES</p>
        <img src="/images/mobile/common/trash.svg" class="h-[1rem] w-[1rem]" @click="deleteShow" />
      </div>
      <div class="mt-[1.5rem] h-[2rem] px-[1rem] flex overflow-x-scroll">
        <span v-for="item in state.recordList" :key="item"
          class="px-[10px] flex-shrink-0 inline-block h-[2rem] leading-[2rem] bg-[#302D34] text-[12px] text-[#fff] rounded-full mr-[1rem]"
          style="font-family: Hezaedrus-Regular;">{{ item }}</span>
      </div>
    </div>
    <!-- 删除弹窗 -->
    <van-popup v-model:show="state.deletePop" class="flex flex-col justify-between">
      <p class="text-[#fff] text-[14px]" style="font-family: Hezaedrus-Regular;">Clear your search history?</p>
      <div class="text-[16px] text-[#fff] font-medium text-right" style="font-family: Hezaedrus-Medium;">
        <span class="mr-[32px]" @click="deleteCancel">CANCEL</span>
        <span @click="deleteSure">DELETE</span>
      </div>
    </van-popup>
    <!-- 热门推荐 -->
    <div class="mt-[1.5rem]">
      <div class="px-[1rem]">
        <p class="text-[#fff] text-[12px]" style="font-family: Hezaedrus-Bold;">MOST SEARCHES</p>
      </div>
      <div class="mt-[1.5rem] px-[1rem]">
        <div v-for="item in 4" :key="item"
          class="flex items-center text-[#fff] text-[12px] h-[3rem] leading-[3rem] px-[1rem] mb-[10px] rounded-[12px] bg-[#1B1A1D] border border-[#ffffff1c]"
          style="font-family: Hezaedrus-Medium;" @click="projectHandle">
          <div class="w-[10rem] flex items-center">
            <img src="/images/defa.png" class="h-[24px] w-[24px] rounded-[8px] mr-[10px]" />
            <span class="text-[12px] h-[12px] leading-[12px]">TTF</span>
          </div>
          <div class="w-[8rem] text-[#ffffff]">$0.0<sub>9</sub>3492</div>
          <div :class="`${item % 2 ? 'text-[#FF5353]' : 'text-[#11B466]'} flex-1`">58.34%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const state = reactive({
  inputValue: '',
  rate: 3,
  showBlur: false,
  deletePop: false,
  recordList: []
})

const updateHandle = (e) => {
  if (e) {
    state.showBlur = true
  } else {
    state.showBlur = false
  }
}

const searchHandle = () => {
  if (state.inputValue) {
    state.recordList.unshift(state.inputValue)
    state.inputValue = ""
    state.showBlur = false
  }
}

const deleteShow = () => {
  state.deletePop = true
}

const deleteCancel = () => {
  state.deletePop = false
}

const deleteSure = () => {
  state.deletePop = false
  state.recordList = []
}

const backHandle = () => {
  router.back()
}

const projectHandle = () => {
  router.push({
    name: 'mbProjectDetail'
  })
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none
}

:deep(.van-search) {
  padding: 0;
  background: #302D34;

}

:deep(.van-search__content) {
  background: #302D34;
  border: none;
  border-radius: 30px;
}

:deep(.van-field__body input) {
  color: #fff;
}

:deep(.van-popup){
  width: 315px;
  height: 120px;
  background-color: #302D34;
  border-radius: 12px;
  padding: 18px 24px;
}
</style>