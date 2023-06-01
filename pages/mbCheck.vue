<template>
  <div class="bg-[#070312] min-h-screen">
    <mbHeader>
      <template v-slot:left>
        CHECK
      </template>
    </mbHeader>
    <div class="border border-[#ffffff1c] bg-[#1B1A1D] p-[1rem] m-[1rem] rounded-[0.75rem]">
      <div
        class="h-[2rem] leading-[2rem] max-w-[9.25rem] px-[1rem]  text-center rounded-[12px] border border-[#ffffff1c] bg-[#fff] mr-[1rem] text-[0.875rem] font-medium flex items-center"
        style="font-family: Hezaedrus-Medium;" @click="state.chainShow = true">
        {{ state.chainName }}
        <img src="/images/mobile/common/down.svg" class="h-[16px] w-[16px] ml-[16px]" />
      </div>
      <input class="inputClass mt-[1rem] text-[0.75rem]" v-model="state.inputValue" placeholder="Search contract address" />
      <div
        class="h-[2.5rem] leading-[2.5rem] rounded-[0.75rem] btnBg text-[#fff] text-[1rem] font-medium text-center mt-[2rem]"
        style="font-family: Hezaedrus-Medium;" @click="searchClick">
        SEARCH
      </div>
    </div>
    <div class="mt-[2rem]">
      <div class="px-[1rem]">
        <p class="text-[#fff] text-[12px]" style="font-family: Hezaedrus-Bold;">MOST SEARCHES</p>
      </div>
      <div class="mt-[1rem] px-[1rem] pb-[3.125rem]">
        <div v-for="item in hot" :key="item"
          class="flex items-center justify-between text-[#fff] text-[12px] h-[3rem] leading-[3rem] px-[1rem] mb-[10px] rounded-[12px] bg-[#1B1A1D] border border-[#ffffff1c]"
          style="font-family: Hezaedrus-Medium;" @click="projectHandle(item)">
          <div class="w-[4.5rem] flex items-center">
            <img src="/images/defa.png" class="h-[24px] w-[24px] rounded-[8px] mr-[10px]" />
            <span class="text-[12px] h-[12px] leading-[12px]">{{ item.name }}</span>
          </div>
          <div class="text-[#FFFFFFA8] w-[3rem]">{{ item.chainName }}</div>
          <div class="flex items-center">
            <span>{{ abbr(item.address) }}</span>
            <img src="/images/right-icon.svg" class="h-[1rem] w-[0.8rem] ml-[0.8rem]" />
          </div>
        </div>
      </div>
      <van-action-sheet v-model:show="state.chainShow" title="CONTRACTS">
        <van-radio-group v-model="state.chainId" checked-color="#9044FF">
          <van-cell-group inset :border="false" style="font-family: Hezaedrus-Medium;">
            <van-cell :border="false" v-for="item in options" :key="item.value" :title="item.label"
              :class="`${state.chainId == item.value ? 'checked' : ''}`" clickable @click="selectChain(item)">
              <template #right-icon>
                <van-radio :name=item.value />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-action-sheet>
    </div>
    <tabBar></tabBar>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import mbHeader from '@/src/components/mobile/mbHeader.vue'
import tabBar from '@/src/components/mobile/mbTabBar.vue'
import { abbr } from '@/src/utils/utils'
import request from '@/src/utils/request'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

const state = reactive({
  chainShow: false,
  chainId: '1',
  chainName: 'Ethereum',
  inputValue: ''
})

const options = [
  { value: "1", label: "Ethereum" },
  { value: "56", label: "BSC" },
  { value: "42161", label: "Arbitrum" },
  { value: "137", label: "Polygon" },
  { value: "324", label: "zkSync Era" },
  { value: "43114", label: "Avalanche" },
  { value: "10", label: "Optimism" },
  { value: "66", label: "OKC" },
  { value: "128", label: "Heco" },
  { value: "25", label: "Cronos" },
  { value: "100", label: "Gnosis" },
  { value: "250", label: "Fantom" },
  { value: "321", label: "KCC" },
  { value: "10001", label: "ETHW" },
  { value: "59140", label: "Linea" },
  { value: "1666600000", label: "Harmony" },
  { value: "tron", label: "Tron" },
  { value: "201022", label: "FON" },
]

const selectChain = (e) => {
  state.chainName = e.label;
  state.chainId = e.value
  state.chainShow = false
}

const hot = [
  { name: "PEPE", chain: '1', chainName: 'Ethereum', address: "0x6982508145454ce325ddbe47a25d4ec3d2311933" },
  { name: "AIDOGE", chain: '42161', chainName: 'Arbitrum', address: "0x09e18590e8f76b6cf471b3cd75fe1a1a9d2b2c2b" },
  { name: "DOGE", chain: '56', chainName: 'BSC', address: "0xba2ae424d960c26247dd6c32edc70b295c744c43" },
  { name: "LINK", chain: '1', chainName: 'Ethereum', address: "0x514910771af9ca656af840dff83e8264ecf986ca" },
  { name: "UNI", chain: '1', chainName: 'Ethereum', address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" },
  { name: "ARB", chain: '42161', chainName: 'Arbitrum', address: "0x912CE59144191C1204E64559FE8253a0e49E6548" },
  { name: "GMX", chain: '1', chainName: 'Ethereum', address: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a" },
  { name: "OP", chain: '10', chainName: 'Optimism', address: "0x4200000000000000000000000000000000000042" },
  { name: "BLUR", chain: '1', chainName: 'Ethereum', address: "0x5283d291dbcf85356a21ba090e6db59121208b44" },
  { name: "LOOKS", chain: '1', chainName: 'Ethereum', address: "0xf4d2888d29d722226fafa5d9b24f9164c092421e" },
]

const projectHandle = (item) => {
  state.chainId = item.chain;
  state.inputValue = item.address;
  searchClick()
}

const searchClick = () => {
  if(state.inputValue){
    request.get(`/plugin/decheck/api/security/token/${state.chainId}/${state.inputValue}`).then(res=>{
      if(res){
        router.push({
          name: 'mbProjectDetail',
          query: {
            id: res.projectId
          }
        })
      }
    })
  }
}
</script>

<style scoped>
.inputClass {
  background: #302D34;
  border: 1px solid #ffffff1c;
  height: 3rem;
  width: 100%;
  border-radius: 0.75rem;
  color: #fff;
  padding: 1rem;
}

.btnBg {
  background: linear-gradient(228.17deg, #36CEFF 0%, #8E40FF 100%);
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