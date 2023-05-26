<template>
  <div class="bg-[#070312] min-h-screen flex flex-col">
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
    <div class="bg-[#302D34] rounded-t-[0.75rem] mt-[1rem] flex-1 flex flex-col">
      <div class="flex flex-wrap px-[1.5rem] ">
        <span v-for="item in tagList" :key="item" @click="checkClick(item)"
          :class="`${item.state ? 'bg-[#fff] text-[#070312] border' : 'bg-[#302D34] text-[#fff] border-dotted border border-[#ffffff54]'}  text-[0.75rem]  py-[0.175rem] px-[0.5rem] mt-[1rem] rounded-full mr-[0.75rem]`">
          {{ item.name }}
        </span>
      </div>
      <van-field v-model="state.values" :autosize="{minHeight: 200}" type="textarea" class="flex-1" :border="false" placeholder="Write your review"/>
      <div class="flex justify-between bg-[#302D34] px-[1.5rem] w-full py-[1rem] border-t border-[#ffffff1c]">
        <div>
          <van-uploader v-model="state.fileList">
            <img src="/images/mobile/common/picture.svg" class="h-[1.5rem] w-[1.5rem]"/>
            <p class="text-[0.75rem] text-[#ffffff56]" style="font-family: Hezaedrus-Regular;">Pictures and videos</p>
          </van-uploader>
        </div>
        <div class="border border-[#ffffff1c] rounded-[0.75rem] h-[2.75rem] leading-[2.75rem] w-[5.625rem] text-center text-[#fff] submit text-[1rem] font-bold" style="font-family: Hezaedrus-bold;">
          Submit
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const state = reactive({
  rate: 3,
  values: '',
  fileList: []
})

const tagList = reactive([
  { name: "General", state: false },
  { name: "Contract", state: true },
  { name: "Tokenomics", state: false },
  { name: "Team", state: false },
  { name: "BUG", state: false },
  { name: "Investment", state: false },
  { name: "Other", state: false },
])

const checkClick = (item) => {
  console.log('aaaa',tagList)
  if (tagList.filter((ele) => ele.state).length < 3 || item.state) {
    item.state = !item.state;
  } else {
    showToast({
      message: t('tagLimit'),
    })
  }
};
</script>

<style scoped>
:deep(.van-rate) {
  display: flex;
}

:deep(.van-cell) {
  background: #302D34;
  padding: 1.5rem;
}

:deep(.van-field__control){
  color: #fff;
}

:deep(.van-toast){
  background: #fff;
  color: black;
}

.submit{
  background: linear-gradient(217.97deg, #129CC8 13.89%, #56269B 77.75%);
}
</style>