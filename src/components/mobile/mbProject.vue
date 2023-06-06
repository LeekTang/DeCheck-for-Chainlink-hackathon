<template>
  <div class="mt-[1.5rem]">
    <div class="text-[1rem] text-[#ffffffa8] px-[1rem]" style="font-family: Hezaedrus-Bold;">PROJECTS</div>
    <div class="mt-[1rem] flex px-[1rem] text-[14px]" style="font-family: Hezaedrus-Medium;">
      <div
        :class="`${ state.tabIndex == 1 ? 'bg-[#fff]' : 'bg-[#1B1A1D] text-[#ffffffa8]'} h-[2rem] leading-[2rem] px-[1rem]  text-center rounded-[12px] border border-[#ffffff1c] mr-[1rem] flex items-center`"
        @click="ordClick">
        {{ filter[state.filterValue].title }}
        <img src="/images/mobile/common/down.svg" class="h-[16px] w-[16px] ml-[16px]"/>
      </div>
      <div
        :class="`${state.tabIndex == 2 ? 'bg-[#fff]' : 'bg-[#1B1A1D] text-[#ffffffa8]' } h-[2rem] leading-[2rem] px-[1.5rem] text-center rounded-[12px] border border-[#ffffff1c]`" @click="watchClick">
        Wacth List</div>
    </div>
    <van-action-sheet v-model:show="state.screen" title="FILTER" :closeable="false">
      <van-radio-group v-model="state.filterValue" checked-color="#9044FF">
        <van-cell-group inset :border="false" style="font-family: Hezaedrus-Medium;">
          <van-cell :border="false" v-for="item in filter" :key="item.value" :title="item.title"
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
    <div class="bg-[#1B1A1D] rounded-t-[1rem] mt-[1rem] mb-[3.5rem]">
      <div class="flex justify-between text-[14px] text-[#ffffffa8] px-[1rem] h-[43px] leading-[43px] border-b border-[#ffffff1c]"
        style="font-family: Hezaedrus-Regular;">
        <div class="w-[10rem]">Name</div>
        <div class="w-[8rem]">Price</div>
        <div class="">24h%</div>
      </div>
      <div>
        <van-list v-model:loading="state.loading" :finished="state.finished" loading-text="In the load" finished-text="No more data" @load="onLoad">
          <div v-for="(item,index) in state.projectList" :key="index" @click="proClick(item.id, item.projectId)"
            class="flex justify-between h-[2.5rem] leading-[2.5rem] text-[#fff] text-[12px] mx-[1rem] border-b border-[#ffffff1c] font-medium"
            style="font-family: Hezaedrus-Medium;">
            <div class="w-[10rem] flex items-center">
              <span class="w-[24px]" v-show="index < 100">{{ index + 1 }}</span>
              <div class="flex">
                <img :src="item.logo" @error="imgError" class="h-[1.7rem] w-[1.7rem] rounded-[8px] mr-[10px]" />
                <div class="h-[27px] flex flex-col justify-between">
                  <van-text-ellipsis :content="item.name" class="text-[12px] h-[12px] " style="line-height: 12px;"></van-text-ellipsis>
                  <van-rate readonly  v-model="item.score" size="9" void-icon="star" color="#FFB524" void-color="#FFFFFF54" />
                </div>
              </div>
            </div>
            <div class="w-[8rem] ">$0.0<sub>9</sub>3492</div>
            <div :class="`${item % 2 ? 'text-[#FF5353]' : 'text-[#11B466]'} `">58.34%</div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { imgError } from '@/src/utils/utils'
import request from '@/src/utils/request'
import { useRouter } from 'vue-router'
const router = useRouter()

const state = reactive({
  loading: false,
  finished: false,
  projectList: [],
  screen: false,
  filterValue: 0,
  page:1,
  pageSize: 20,
  searchInput: "",
  tabIndex: 1
})

const filter = [
  { title: 'ALL', value: 0 },
  { title: 'New', value: 1 },
  { title: 'Hot', value: 2 },
]

const ordClick = () => {
  state.screen = !state.screen
  state.tabIndex = 1
  state.page = 1;
  state.projectList = []
  getProList();
}

const watchClick = () => {
  state.tabIndex = 2
  state.page = 1;
  state.projectList = []
  getWatchList();
}

const getWatchList = () => {
  request.get(`/plugin/decheck/api/user/collects/page?page=${state.page}&pageSize=${state.pageSize}`).then(res=>{
    state.loading = false
    state.page = state.page + 1;
    if(res.list == null){
      state.finished = true
    }else{
      state.projectList = state.projectList.concat(res.list)
      state.projectList.forEach(ele => {
        ele.score = Number(ele.score)
      });
    }
  })
}

const onLoad = () => {
  if(state.tabIndex == 1){
    getProList();
  }else if (state.tabIndex == 2){
    getWatchList();
  }
}

const getProList = () => {
  request({ url: `/plugin/decheck/api/project/page?page=${state.page}&pageSize=${state.pageSize}&keyword=${state.searchInput}`,method : 'get'}).then((res) => {
    state.loading = false
    state.page = state.page + 1;
    if(res.list == null){
      state.finished = true
    }else{
      state.projectList = state.projectList.concat(res.list)
      state.projectList.forEach(ele => {
        ele.score = Number(ele.score)
      });
    }
  })
}

const proClick = (id,pid) => {
  router.push({
    name: 'mbProjectDetail',
    query: {
      id: state.tabIndex == 1 ? id : pid
    }
  })
}

const closeFilter = () => {
  state.screen = false
}

onMounted(() => {

})
</script>

<style scoped>

:deep(.van-rate__item){
  transform:scale(0.75);
  padding-right: 2px;
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