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
      <div v-for="item in state.recommend" :key="item" @click="projectHandle(item, true)"
        class="h-[48px] pl-[16px] flex items-center border-b border-[#ffffff1c] bg-[#1B1A1D]">
        <img src="/images/mobile/home/sm-search.svg" class="h-[16px] w-[16px] mr-[8px]" />
        <p class="text-[#ffffff] text-[14px]" style="font-family: Hezaedrus-Regular;">{{ item.name }}</p>
      </div>
    </template>
    <!-- 历史记录 -->
    <div class="mt-[1.5rem]" v-if="Object.keys(state.recordList).length > 0">
      <div class="flex justify-between items-center px-[1rem]">
        <p class="text-[#fff] text-[12px]" style="font-family: Hezaedrus-Bold;">MY SEARCHES</p>
        <img src="/images/mobile/common/trash.svg" class="h-[1rem] w-[1rem]" @click="deleteShow" />
      </div>
      <div class="mt-[1.5rem] h-[2rem] px-[1rem] flex overflow-x-scroll">
        <span v-for="item in state.recordList" :key="item" @click="historyClick(item)"
          class="px-[10px] flex-shrink-0 inline-block h-[2rem] leading-[2rem] bg-[#302D34] text-[12px] text-[#fff] rounded-full mr-[1rem]"
          style="font-family: Hezaedrus-Regular;">{{ item.name }}</span>
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
        <div v-for="item in hot" :key="item"
          class="flex items-center justify-between text-[#fff] text-[12px] h-[3rem] leading-[3rem] px-[1rem] mb-[10px] rounded-[12px] bg-[#1B1A1D] border border-[#ffffff1c]"
          style="font-family: Hezaedrus-Medium;" @click="hotProject(item)">
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
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import request from '@/src/utils/request'
import { abbr } from '@/src/utils/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
import { userStore } from '@/src/stores/user'
const store = userStore()

const state = reactive({
  inputValue: '',
  rate: 3,
  showBlur: false,
  deletePop: false,
  recordList: [],
  recommend: []
})

const userSearch = () => {
  if (store.isSign) {
    if (localStorage.getItem('historyList')) {
      state.recordList = state.recordList.concat(JSON.parse(localStorage.getItem('historyList')))
      request({ url: `/plugin/decheck/api/user/recent-search/update`, method: 'post', data: state.recordList }).then(res => {
        localStorage.removeItem('historyList')
      })
    } else {
      request.get(`/plugin/decheck/api/user/recent-search`).then(res => {
        if(res){
          state.recordList = res
        }
      })
    }
  } else {
    if (localStorage.getItem('historyList')) {
      state.recordList = state.recordList.concat(localStorage.getItem('historyList').split(','))
    }
  }
}

const updateHandle = (e) => {
  if (e) {
    request.get(`/plugin/decheck/api/project/page?page=1&pageSize=10&keyword=${e}`).then((res) => {
      state.recommend = res.list
    })
    state.showBlur = true
  } else {
    state.showBlur = false
  }
}

const searchHandle = () => {
  if (state.inputValue) {
    state.recordList.unshift(state.inputValue)
    localStorage.setItem('historyList', state.recordList)
    state.inputValue = ""
    state.showBlur = false
  }
}

const historyClick = (item) => {
  state.inputValue = item.name
  updateHandle(item.name)
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
  localStorage.removeItem('historyList')
}

const backHandle = () => {
  router.back()
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

const hotProject = (item) => {
  if (item.address) {
    request.get(`/plugin/decheck/api/security/token/${item.chain}/${item.address}`).then(res => {
      if (res) {
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

const projectHandle = (item, ishistory) => {
  if (ishistory) {
    if(state.recordList.length > 0){
      if (item.id == state.recordList[0].id && item.name == state.recordList[0].name || state.recordList == null) {
        return false
      } else {
        state.recordList.unshift({ id: item.id, name: item.name })
        localStorage.setItem('historyList', JSON.stringify(state.recordList))
      }
    }else{
      state.recordList = [];
      state.recordList.push({ id: item.id, name: item.name })
      localStorage.setItem('historyList', JSON.stringify(state.recordList))
    }
  }
  router.push({
    name: 'mbProjectDetail',
    query: {
      id: item.id
    }
  })
}

onMounted(() => {
  userSearch();
})

onBeforeUnmount(() => {

})
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

:deep(.van-popup) {
  width: 315px;
  height: 120px;
  background-color: #302D34;
  border-radius: 12px;
  padding: 18px 24px;
}
</style>