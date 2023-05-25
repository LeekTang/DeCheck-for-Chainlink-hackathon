<template>
  <div class="flex justify-between items-center p-[1rem]">
    <div class="text-[1rem] text-[#fff]" style="font-family:Hezaedrus-Bold"><slot name="left"></slot></div>
    <div class="flex flex-row">
      <div class="h-[34px] w-[34px] p-[7px] rounded-full bg-[#1B1A1D] border border-[#ffffff1c]" @click="changeLanguage">
        <img src="/images/mobile/home/net.svg" class="h-[18px] w-[18px]" />
      </div>
      <NuxtLink to="/mbSearch" class="h-[34px] w-[34px] p-[7px] rounded-full bg-[#1B1A1D] border border-[#ffffff1c] ml-[1rem]">
        <img src="/images/mobile/home/search.svg" class="h-[18px] w-[18px]" />
      </NuxtLink>
      <div class="h-[34px] w-[34px] p-[7px] rounded-full bg-[#1B1A1D] border border-[#ffffff1c] ml-[1rem]">
        <img src="/images/mobile/home/mine.svg" class="h-[18px] w-[18px]" />
      </div>
    </div>
    <van-action-sheet v-model:show="state.screen" title="LANGUAGE" :closeable="false">
      <van-radio-group v-model="state.filterValue" checked-color="#9044FF">
        <van-cell-group inset :border="false" style="font-family: Hezaedrus-Medium;">
          <van-cell :border="false" v-for="item in language" :key="item.value" :title="item.title"
            :class="`${state.filterValue == item.value ? 'checked' : ''}`" clickable
            @click="state.filterValue = item.value">
            <template #right-icon>
              <van-radio :name=item.value />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="flex justify-around text-center my-[18px] text-[16px]" style="font-family: Hezaedrus-Medium;">
        <div
          class="h-[40px] w-[156px] leading-[40px] rounded-[12px] text-[#ffffff] bg-[#302D34] border border-[#ffffff54]"
          @click="closeFilter">Cancel</div>
        <div
          class="h-[40px] w-[156px] leading-[40px] rounded-[12px] text-[#070312] bg-[#ffffff] border border-[#ffffff54]"
          @click="closeFilter">ok</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  screen: false,
  filterValue: 'en'
})

const changeLanguage = () => {
  state.screen = true
}

const language = [
  { title: 'English', value: 'en' },
  { title: 'Chinese', value: 'zh' }
]

const closeFilter = () => {
  state.screen = false
}
</script>

<style scoped>
:deep(.van-popup) {
  background-color: #302D34;
}

:deep(.van-action-sheet__header) {
  color: #fff;
}

:deep(.van-cell) {
  background-color: #302D34;
  color: #fff
}

.checked {
  color: #9044FF !important;
}
</style>