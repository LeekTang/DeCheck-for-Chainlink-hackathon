<template>
  <div class="bg-[#070312] min-h-screen px-[16px] ">
    <div class="flex items-center justify-between h-[56px]">
      <img class="h-[24px] w-[24px]" src="/images/mobile/common/back.svg" @click="backHandle" />
      <div class="flex items-center">
        <img class="h-[24px] w-[24px] rounded-[8px] mr-[8px]" src="/images/defa.png" />
        <p class="text-[18px] text-[#ffffff] font-medium" style="font-family: Hezaedrus-Medium;">NAME</p>
      </div>
      <div class="h-[24px] w-[24px]"></div>
    </div>
    <div class="flex justify-between text-[#ffffff] mt-[24px]" style="font-family: Hezaedrus-Medium;">
      <div>
        <p class="text-[18px]">4.6</p>
        <van-rate readonly color="#ffd21e" v-model="state.rate" :size="16" />
      </div>
      <div class="text-right text-[14px] flex flex-col justify-between">
        <p>$1822.53</p>
        <p :class="true ? 'text-[#11B466]' : 'text-[#FF5353]'">58.35%</p>
      </div>
    </div>
    <div class="mt-[24px]">
      <div class="h-[64px] border border-[#ffffff1c] flex items-center justify-between
        p-[16px] rounded-[12px] bg-[#1B1A1D] mb-[10px]" style="font-family: Hezaedrus-Regular;">
        <div class="h-[32px] w-[100px] flex items-center justify-between py-[9px] px-[16px] bg-[#ffffff] rounded-[12px]"
          @click="state.chainShow = true">
          <p class="text-[14px] text-[#070312]">{{ state.chainName }}</p>
          <img src="/images/mobile/common/down.svg" class="h-[16px] w-[16px]" />
        </div>
        <div class="flex items-center">
          <p class="text-[#ffffff] text-[12px]" style="font-family: Hezaedrus-Medium;">{{ state.chainAddress }}</p>
          <img src="/images/mobile/common/copy.svg" class="h-[16px] w-[16px] ml-[1rem]" />
        </div>
      </div>
    </div>
    <van-action-sheet v-model:show="state.chainShow" title="CONTRACTS">
      <van-radio-group v-model="state.chainId" checked-color="#9044FF" @change="selectChain">
        <van-cell-group inset :border="false" style="font-family: Hezaedrus-Medium;">
          <van-cell :border="false" v-for="item in options" :key="item.value" :title="item.label"
            :class="`${state.chainId == item.value ? 'checked' : ''}`" clickable @click="state.chainId = item.value">
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
    <div class="flex items-center justify-between mt-[10px]">
      <div
        class="py-[8px] px-[16px] h-[66px] w-[102px] flex flex-col items-center justify-between bg-[#1B1A1D] rounded-[12px]">
        <img src="/images/mobile/project/collect-not.svg" class="h-[24px] w-[24px]" />
        <p class="text-[14px] text-[#fff]" style="font-family: Hezaedrus-Medium;">Collect</p>
      </div>
      <div
        class="py-[8px] px-[16px] h-[66px] w-[102px] flex flex-col items-center justify-between bg-[#1B1A1D] rounded-[12px]">
        <img src="/images/mobile/project/link.svg" class="h-[24px] w-[24px]" />
        <p class="text-[14px] text-[#fff]" style="font-family: Hezaedrus-Medium;">Links</p>
      </div>
      <div
        class="py-[8px] px-[16px] h-[66px] w-[102px] flex flex-col items-center justify-between bg-[#1B1A1D] rounded-[12px]">
        <img src="/images/mobile/project/share.svg" class="h-[24px] w-[24px]" />
        <p class="text-[14px] text-[#fff]" style="font-family: Hezaedrus-Medium;">Share</p>
      </div>
    </div>
    <div class="flex h-[28px] leading-[28px] overflow-x-scroll mt-[32px]" style="font-family: Hezaedrus-Bold;">
      <span v-for="(item, index) in tabList" :key="index" @click="tabHandle(item.value)"
        :class="`${item.value == state.tabIndex ? 'text-[#fff] tabItem' : 'text-[#ffffff54]'}  relative text-[14px] flex-shrink-0 inline-block mr-[24px]`">
        {{ item.title }}
      </span>
    </div>
    <div class="text-[#fff] mt-[1rem]" v-if="state.tabIndex == 1">
      <div class="p-[16px] border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem]">
        <p class="text-[16px] text-[#fff] font-bold" style="font-family: Hezaedrus-Bold;">RATE THIS ITEM</p>
        <van-rate v-model="state.reviewRate" :size="30" color="#FFB524" class="justify-between my-[1rem]" />
        <p class="text-[14px] text-[#9044FF]" style="font-family: Hezaedrus-Bold;">WRITE A REVIEW</p>
      </div>
      <div class="mt-[2rem]">
        <p class="text-[14px] text-[#fff] font-bold" style="font-family: Hezaedrus-Bold;">Reviews</p>
        <div class="flex mt-[1rem]">
          <div
            class="h-[2rem] flex items-center px-[0.75rem] py-[0.56rem] border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem] mr-[1rem]">
            <p class="text-[0.875rem] text-[#fff]" style="font-family: Hezaedrus-Medium;">Hottest</p>
            <img src="/images/mobile/common/down-white.svg" class="h-[16px] w-[16px]" />
          </div>
          <div
            class="h-[2rem] flex items-center px-[0.75rem] py-[0.56rem] border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem]">
            <p class="text-[0.875rem] text-[#fff]" style="font-family: Hezaedrus-Medium;">All</p>
            <img src="/images/mobile/common/down-white.svg" class="h-[16px] w-[16px]" />
          </div>
        </div>
      </div>
      <div>
        <div v-for="item in reviewList" :key="item.id" class="py-[1rem] border-b border-[#ffffff1c]">
          <div class="flex justify-between items-center">
            <div class="flex">
              <img src="/images/reviewer.svg" class="h-[2rem] w-[2rem] rounded-full mr-[0.625rem]" />
              <div class="text-[0.75rem]" style="font-family: Hezaedrus-Medium;">
                <p class="flex items-center  text-[#fff]">{{ item.address }} <img v-if="item.attestation"
                    src="/images/mobile/project/authen.svg" class="h-[0.875rem] w-[0.875rem] ml-[0.2rem]" /></p>
                <p :class="`${item.attestation ? 'linear-text' : ''}`">Reviewed: {{ item.reviewed }}</p>
              </div>
            </div>
            <div>
              <van-rate v-model="item.rate" color="#FFB524" size="13" />
              <p class="text-[0.75rem] text-[#ffffff85]" style="font-family: Hezaedrus-Regular;">{{ item.time }}</p>
            </div>
          </div>
          <div class="mt-[1rem]">
            <span v-for="(tag, index) in item.tag" :key="index"
              class="text-[0.75rem] text-[#fff] py-[0.25rem] px-[0.5rem] bg-[#1B1A1D] mr-[0.5rem]"
              style="font-family: Hezaedrus-Regular;">
              {{ tag }}
            </span>
          </div>
          <div class="text-[0.75rem] py-[0.75rem]" style="font-family: Hezaedrus-Regular;">{{ item.content }}</div>
          <span
            :class="`${item.like ? 'bg-[#1B1A1D]' : 'bg-[#fff]'} border border-[#ffffff1c] inline-block rounded-[0.5rem] min-w-[3.5rem]`">
            <div class="flex items-center h-[1.5rem] px-[0.57rem]">
              <img :src="item.like ? '/images/mobile/project/like.svg' : '/images/mobile/project/like-not.svg'"
                class="h-[1rem] w-[1rem] mr-[0.25rem]" />
              <p :class="`${item.like ? 'text-[#ffffff]' : 'text-[#1B1A1D]'} text-[0.75rem]`">{{ item.likeNum }}</p>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="text-[#fff]" v-else-if="state.tabIndex == 2">222222</div>
    <div class="text-[#fff]" v-else>333333333333333333</div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import link from '~/src/utils/link'
const state = reactive({
  rate: 3,
  chainShow: false,
  chainId: '',
  chainName: '',
  chainAddress: '',
  links: [
    { title: 'Website', icon: '', address: '' },
    { title: 'Twitter', icon: '', address: '' },
    { title: 'Telegram', icon: '', address: '' },
    { title: 'Discore', icon: '', address: '' },
    { title: 'Reddit', icon: '', address: '' },
    { title: 'Github', icon: '', address: '' },
    { title: 'Website', icon: '', address: '' },
  ],
  tabIndex: 1,
  reviewRate: 0,
})

const options = [
  { value: "1", label: "Ethereum", address: '0xBfCb...0577' },
  { value: "10", label: "Optimism", address: '0xBfCb...0576' },
  { value: "25", label: "Cronos", address: '0xBfCb...0575' },
  { value: "56", label: "BSC", address: '0xBfCb...0574' },
  { value: "66", label: "OKC", address: '0xBfCb...0573' },
  { value: "100", label: "Gnosis", address: '0xBfCb...0572' },
  { value: "128", label: "Heco", address: '0xBfCb...0571' },
]

const selectChain = () => {
  let chain = options.filter(item => {
    return item.value == state.chainId
  })
  state.chainName = chain[0].label;
  state.chainAddress = chain[0].address;
}

const closeFilter = () => {
  state.chainShow = false
}

const tabList = [
  { title: 'DECHECK REVIEW', value: 1 },
  { title: 'CHECK REPORT', value: 2 },
  { title: 'RISK CHECK', value: 3 },
]

const tabHandle = (value) => {
  state.tabIndex = value;
}

const reviewList = [
  { id: 1, address: '0xB939...09c2', attestation: true, rate: 4, time: '2023-06-23', reviewed: 25, tag: ['General', 'Contract', 'Tokenomics'], content: 'Within our ventures, the expansion circuit of Ethereum is inevitable. It is just a matter of how to make decisions on different projects with different technical points in...', like: true, likeNum: 12331232 },
  { id: 2, address: '0xB939...09c2', attestation: false, rate: 3, time: '2023-06-23', reviewed: 25, tag: ['General', 'Contract', 'Tokenomics'], content: 'Within our ventures, the expansion circuit of Ethereum is inevitable. It is just a matter of how to make decisions on different projects with different technical points in...', like: false, likeNum: 1321322 },
  { id: 3, address: '0xB939...09c2', attestation: false, rate: 2, time: '2023-06-23', reviewed: 25, tag: ['General', 'Contract', 'Tokenomics'], content: 'Within our ventures, the expansion circuit of Ethereum is inevitable. It is just a matter of how to make decisions on different projects with different technical points in...', like: true, likeNum: 12 },
  { id: 4, address: '0xB939...09c2', attestation: true, rate: 4, time: '2023-06-23', reviewed: 25, tag: ['General', 'Contract', 'Tokenomics'], content: 'Within our ventures, the expansion circuit of Ethereum is inevitable. It is just a matter of how to make decisions on different projects with different technical points in...', like: false, likeNum: 12 },
]

onMounted(() => {
  state.chainId = options[0].value
  state.chainName = options[0].label
  state.chainAddress = options[0].address
})
</script>

<style scoped>
.text-hidden {
  width: 185px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

::-webkit-scrollbar {
  display: none
}

.tabItem:before {
  content: '';
  height: 4px;
  width: 32px;
  background-color: #9044FF;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  transition: all 1s ease;
}

:deep(.van-rate) {
  display: flex;
}

.linear-text {
  background-image: linear-gradient(235.07deg, #19B5E8 7.95%, #8C4CE8 91.48%);
  color: transparent;
  -webkit-background-clip: text;
}

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