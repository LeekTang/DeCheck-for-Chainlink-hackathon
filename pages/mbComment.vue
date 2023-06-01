<template>
    <div class="bg-[#070312] text-[white] min-h-screen pb-[60px]">
        <mbHeader>
            <template v-slot:left>
                <div @click="goBack">
                    <img src="/images/mobile/common/back.svg" alt="">
                </div>
            </template>
            <template v-slot:right>
                <div @click="handleMore">
                    <img src="/images/mobile/common/more.svg" alt="">
                </div>
            </template>
        </mbHeader>
        <div class="w-[100%] px-[16px]  pt-[16px] min-h-screen overflow-y-auto overscroll-y-contain"
            style="font-family: Hezaedrus-Medium;">
            <div class="flex justify-between align-top">
                <div class="">
                    <div class="flex justify-start align-top">
                        <div class="object-cover overflow-hidden w-[40px] h-[40px] rounded-[8px] mr-[10px]">
                            <img :src="state.project.logo" alt="">
                        </div>
                        <div>
                            <h4 class="text-[16px]">{{ state.project.name }}</h4>
                            <p class="text-textGray text-[12px]">RATE THIS ITEM</p>
                        </div>
                    </div>
                    <el-rate :size="20" allow-half v-model="state.reviewDetail.score" />
                </div>
                <div
                    class="bg-[white] text-[#070312] w-[117px] h-[32px] rounded-[12px] leading-[32px] text-center text-[14px]" @click="viewClick">
                    View Project
                </div>
            </div>
            <div class="w-[100%] overflow-y-scroll text-[12px] mt-[25px]" style="font-family: Hezaedrus-regular;">
                <div class="flex justify-start">
                    <span class="text-textGray border border-[#FFFFFF1C] py-[6px] px-[8px] mr-[10px] rounded-[20px]"
                        v-for="(item, index) in state.reviewDetail.tags" :key="index">{{ item }}</span>
                </div>
            </div>
            <div class="w-[100%] overflow-y-scroll my-[16px]">
                <div class="flex justify-start">
                    <div class="w-[56px] h-[56px] rounded-[12px] bg-[#2E4560] overflow-hidden object-cover">
                        <img :src="item" alt="" v-for="(item, index) in state.reviewDetail.attachment" :key="index">
                    </div>
                </div>
            </div>
            <p class="text-[14px] whitespace-pre-wrap" style="font-family: Hezaedrus-regular;"
                v-html="state.reviewDetail.content"></p>
        </div>
        <van-action-sheet v-model:show="show" @select="onSelect">
            <div class="py-[1rem]">
                <van-cell title="Edit Comments" is-link @click="reviewHandle"/>
                <van-cell title="Delete This Comment" is-link />
            </div>
        </van-action-sheet>
    </div>
</template>
<script setup>
import { toRefs, onMounted, reactive } from 'vue';
import mbHeader from '@/src/components/mobile/mbHeader.vue';
import request from '@/src/utils/request'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute()

const state = reactive({
    show: false,
    reviewID: '',
    reviewDetail: [],
    project: []
})

const onSelect = (item) => {
    show.value = false;
};

const goBack = () => {
    router.go(-1);
}
const handleMore = () => {
    state.show = true
}

const viewClick = () => {
    router.push({
        name: 'mbProjectDetail',
        query: {
            id: state.project.id
        }
    })
}

const getDetail = () => {
    request.get(`/plugin/decheck/api/project/review/detail/${state.reviewID}`).then(res => {
        state.reviewDetail = res
        request.get(`/plugin/decheck/api/project/detail/${res.projectId}`).then(ress => {
            state.project = ress
        })
    })
}

const reviewHandle = () => {
  router.push({
    name: 'mbReview',
    query: {
      id: state.project.id,
      reviewID: state.reviewDetail.id
    }
  })
}

const { show, rate } = toRefs(state);

onMounted(() => {
    state.reviewID = route.query.id ? route.query.id : "";
    getDetail()
})
</script>
<style scoped>
:deep(.van-action-sheet__item) {
    background: #302D34;
    color: white;
    font-size: 16px;
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
</style>