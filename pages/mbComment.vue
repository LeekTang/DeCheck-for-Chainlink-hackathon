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
                    <div class="flex justify-start align-top mb-[1rem]">
                        <img :src="state.project.logo" @error="imgError"
                            class="object-cover overflow-hidden w-[40px] h-[40px] rounded-[8px] mr-[10px]">
                        <div>
                            <h4 class="text-[16px]">{{ state.project.name }}</h4>
                            <p class="text-textGray text-[12px]">RATE THIS ITEM</p>
                        </div>
                    </div>
                    <van-rate readonly  v-model="state.reviewDetail.score" size="20" void-icon="star" color="#FFB524" void-color="#FFFFFF54" />
                </div>
                <div class="bg-[white] text-[#070312] w-[117px] h-[32px] rounded-[12px] leading-[32px] text-center text-[14px]"
                    @click="viewClick">
                    View Project
                </div>
            </div>
            <div class="w-[100%] overflow-y-scroll text-[12px] mt-[25px]" style="font-family: Hezaedrus-regular;">
                <div class="flex justify-start">
                    <span class="text-textGray border border-[#FFFFFF1C] bg-[#1B1A1D] py-[6px] px-[8px] mr-[10px] rounded-[20px]"
                        v-for="(item, index) in state.reviewDetail.tags" :key="index">{{ item }}</span>
                </div>
            </div>
            <div class="flex justify-start overflow-y-scroll my-[16px]">
                <img :src="item" v-for="(item, index) in state.reviewDetail.attachment" :key="index"
                    class="w-[56px] h-[56px] flex-shrink-0 rounded-[12px] mr-[10px] bg-[#2E4560] overflow-hidden object-cover" />
            </div>
            <p class="text-[14px] whitespace-pre-wrap" style="font-family: Hezaedrus-regular;"
                v-html="state.reviewDetail.content"></p>
        </div>
        <van-action-sheet v-model:show="show" @select="onSelect">
            <div class="pt-[1rem] pb-[2.4rem]" style="font-family: Hezaedrus-Medium;">
                <van-cell title="Edit Comments" :border="false" is-link @click="reviewHandle" />
                <van-cell title="Delete This Comment" :border="false" is-link @click="deleteReview" />
            </div>
        </van-action-sheet>
        <!-- 删除弹窗 -->
        <van-popup v-model:show="state.deletePop" class="flex flex-col justify-between">
        <p class="text-[#fff] text-[14px]" style="font-family: Hezaedrus-Regular;">Clear your search history?</p>
        <div class="text-[16px] text-[#fff] font-medium text-right" style="font-family: Hezaedrus-Medium;">
            <span class="mr-[32px]" @click="deleteCancel">CANCEL</span>
            <span @click="deleteSure">DELETE</span>
        </div>
        </van-popup>
    </div>
</template>
<script setup>
import { toRefs, onMounted, reactive } from 'vue';
import mbHeader from '@/src/components/mobile/mbHeader.vue';
import request from '@/src/utils/request'
import { imgError } from '@/src/utils/utils'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute()

const state = reactive({
    show: false,
    reviewID: '',
    reviewDetail: [],
    project: [],
    deletePop: false
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

const deleteReview = () => {
    state.deletePop = true
}

const deleteSure = () => {
    request.get(`/plugin/decheck/api/project/review/del/${state.reviewID}`).then(res => {
        state.deletePop = false;
        state.show = false
        goBack()
    })
}

const deleteCancel = () => {
    state.deletePop = false;
    state.show = false
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

:deep(.van-popup--center) {
  width: 315px;
  height: 120px;
  background-color: #302D34;
  border-radius: 12px;
  padding: 18px 24px;
}
</style>