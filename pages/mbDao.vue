<template>
    <div class="bg-[#070312] min-h-screen px-[11px] pb-[60px]">
        <mbHeader>
            <template v-slot:left>
                EXPLORER
            </template>
        </mbHeader>
        <div class="pt-[16px] min-h-screen overflow-y-auto overscroll-y-contain" style="font-family: Hezaedrus-Medium;">
            <div class="flex flex-wrap  w-[100%]">
                <div class="p-[5px] w-[50%]" v-for="({ content, pic, btnText, callback, disable }, index) in list"
                    :key="index">
                    <card :content="content" :pic="pic" :btnText="btnText" :submit="() => !disable && callback(index)">
                    </card>
                </div>
            </div>
            <div class="bg-[#1B1A1D] p-[16px] m-[5px] rounded-[12px] border border-[#ffffff1c]">
                <img class="object-cover w-[100%]" src="/images/mobile/dao/genesis.svg" alt="">
                <article class="text-[white] text-[12px] pt-[16px] text-center">
                    Mozilla Firefox is an open-source web browser developed by Mozilla. Firefox has been the second most
                    popular web browser since January, 2018
                </article>
            </div>
        </div>
        <van-popup v-model:show="popup" class="bg-[#1B1A1D]" position="bottom" :style="{ height: 'auto' }">
            <div class="bg-[#1B1A1D] h-[100%] p-[24px] pb-[60px] text-center" style="font-family: Hezaedrus-Medium;">
                <img class="object-cover w-[100%]" :src="popupData.pic" alt="">
                <h4 class="text-[white] text-[18px] mt-[24px] mb-[10px]">{{ popupData.title }}</h4>
                <article class="text-textGray text-[14px] pb-[10px]" style="font-family: Hezaedrus-regular;">
                    {{ popupData.content }}<br />
                    <span class="text-[white] text-[12px] pt-[10px] mb-[32px]">Mozilla Firefox is an open-source</span>
                </article>
                <div class="h-[32px] text-[16px] bg-[white] rounded-[12px] leading-[32px]" @click="popupData.popAction">
                    {{ popupData.popBtnText }}
                </div>
            </div>
        </van-popup>
        <tabBar></tabBar>
    </div>
</template>
<script setup>
import { reactive, onMounted, toRefs } from 'vue';
import mbHeader from '@/src/components/mobile/mbHeader.vue'
import tabBar from '@/src/components/mobile/mbTabBar.vue'
import card from '@/src/components/mobile/dao/card.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activePopup = (index) => {
    state.popup = true;
    state.popupData = toRefs(state.list[index]);
};

const reviewPopAction = () => {
    const { disable, title } = state.popupData;
    console.log('popupData', popupData)
    if (!disable) {
        router.push({
            name: "mbDaoApply",
            query: { type: title }
        })
    }
}

const state = reactive({
    popup: false,
    popupData: {
        title: "AUDITOR",
        content: 'Become a Reviewer by airdrop mission Become a Reviewer by airdrop mission',
        btnText: 'DETAILS',
        popBtnText: 'GO',
        pic: '/images/mobile/dao/auditor.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
    },
    list: [{
        title: "AUDITOR",
        content: 'Become a Reviewer by airdrop mission Become a Reviewer by airdrop mission',
        btnText: 'DETAILS',
        popBtnText: 'GO',
        pic: '/images/mobile/dao/auditor.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
    }, {
        title: "PRODUCER",
        content: 'Become a Reviewer by airdrop mission Become a Reviewer by airdrop mission',
        btnText: 'DETAILS',
        popBtnText: 'APPLY',
        pic: '/images/mobile/dao/producer.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
    }, {
        title: "RESEARCHER",
        content: 'Become a Reviewer by airdrop mission Become a Reviewer by airdrop mission',
        btnText: 'DETAILS',
        popBtnText: 'COMMING SOON',
        pic: '/images/mobile/dao/researcher.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
    }, {
        title: "REVIEWER",
        content: 'Become a Reviewer by airdrop mission Become a Reviewer by airdrop mission',
        btnText: 'DETAILS',
        popBtnText: 'COMMING SOON',
        pic: '/images/mobile/dao/reviewer.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
    }]
})

const { list, popup, popupData } = toRefs(state);

</script>
<style scoped></style>