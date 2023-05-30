<template>
  <div class="mt-[1.5rem]">
    <div class="text-[1rem] text-[#ffffffa8] px-[1rem]" style="font-family: Hezaedrus-Bold;">PROJECTS</div>
    <div class="mt-[1rem] flex px-[1rem] text-[14px]" style="font-family: Hezaedrus-Medium;">
      <div
        class="h-[2rem] leading-[2rem] px-[1rem]  text-center rounded-[12px] border border-[#ffffff1c] bg-[#fff] mr-[1rem] flex items-center"
        @click="state.screen = !state.screen">
        {{ filter[state.filterValue].title }}
        <img src="/images/mobile/common/down.svg" class="h-[16px] w-[16px] ml-[16px]"/>
      </div>
      <div
        class="h-[2rem] leading-[2rem] px-[1.5rem] text-center rounded-[12px] border border-[#ffffff1c] bg-[#1B1A1D] text-[#ffffffa8]">
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
    <div class="bg-[#1B1A1D] rounded-t-[1rem] mt-[1rem]">
      <div class="flex text-[14px] text-[#ffffffa8] px-[1rem] h-[43px] leading-[43px] border border-[#ffffff1c]"
        style="font-family: Hezaedrus-Regular;">
        <div class="w-[10rem]">Name</div>
        <div class="w-[8rem]">Price</div>
        <div class="flex-1">24h%</div>
      </div>
      <div>
        <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(item,index) in state.projectList" :key="index" @click="proClick(item.id)"
            class="flex h-[2.5rem] leading-[2.5rem] text-[#fff] text-[12px] mx-[1rem] border-b border-[#ffffff1c]"
            style="font-family: Hezaedrus-Medium;">
            <div class="w-[10rem] flex items-center">
              <span class="w-[24px]" v-show="index < 100">{{ index + 1 }}</span>
              <div class="flex">
                <img :src="item.logo" class="h-[1.6rem] w-[1.6rem] rounded-[8px] mr-[10px]" />
                <div class="h-[24px] flex flex-col justify-between">
                  <van-text-ellipsis :content="item.name" class="text-[12px] h-[12px] mb-[0.4rem] leading-[12px]"></van-text-ellipsis>
                  <el-rate disabled v-model="item.score" />
                </div>
              </div>
            </div>
            <div class="w-[8rem] ">$0.0<sub>9</sub>3492</div>
            <div :class="`${item % 2 ? 'text-[#FF5353]' : 'text-[#11B466]'} flex-1`">58.34%</div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
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
  searchInput: ""
})

const filter = [
  { title: 'ALL', value: 0 },
  { title: 'New', value: 1 },
  { title: 'Hot', value: 2 },
]

const onLoad = () => {
  getProList();
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
        ele.score = Number(ele.score).toFixed(0)
      });
    }
  })
}

const proClick = (id) => {
  router.push({
    name: 'mbProjectDetail',
    query: {
      id: id
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
:deep(.el-rate) {
  height: 8px;
}

:deep(.el-rate__item) {
  width: 14px;
}

:deep(.el-icon svg) {
  height: 14px;
  width: 14px;
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