<template>
    <div class="bg-[#070312] min-h-screen pb-[60px]">
        <mbHeader>
            <template v-slot:left>
                {{ t('Explorer') }}
            </template>
        </mbHeader>
        <div class="pt-[16px] px-[11px] min-h-screen overflow-y-auto overscroll-y-contain"
            style="font-family: Hezaedrus-Medium;">
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
        <van-dialog v-model:show="state.soonShow" :showConfirmButton="false">
            <div class="w-[312px] p-[24px]">
                <div class="text-[16px] text-[#fff]" style="font-family: Hezaedrus-bold;">COMMING SOON</div>
                <div class="bg-[#FFFFFF] h-[40px] leading-[40px] rounded-[12px] mt-[24px] text-center font-medium"
                    style="font-family: Hezaedrus-Bold;" @click="downClick">OKEY</div>
            </div>
        </van-dialog>
        <van-popup v-model:show="popup" class="bg-[#1B1A1D]" position="bottom">
            <div class="bg-[#1B1A1D] p-[24px] text-center rounded-[12px]" style="font-family: Hezaedrus-Medium;">
                <img class="h-[19.5rem] w-[19.5rem]" :src="popupData.pic" alt="">
                <h4 class="text-[white] text-[18px] mt-[24px] mb-[10px]">{{ popupData.title }}</h4>
                <p class="text-textGray text-[14px] pb-[10px] leading-[18px]" style="font-family: Hezaedrus-regular;">
                    {{ popupData.tips1 }}
                </p>
                <p class="text-textGray text-[14px] leading-[18px]" style="font-family: Hezaedrus-regular;">
                    {{ popupData.tips2 }}
                </p>
                <p class="text-[white] text-[12px] pt-[10px] mb-[32px]">{{ popupData.btips }}</p>
                <div :class="`${popupData.bg ? 'bg-[#FFFFFF54] text-[#FFFFFFA8' : 'bg-[white]'} h-[32px] text-[16px]  rounded-[12px] leading-[32px]`"
                    @click="popupData.popAction">
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
import web3js from '@/src/utils/link'
import { useI18n } from  'vue-i18n'
const { t } = useI18n();

const activePopup = (index) => {
    state.popup = true;
    state.popupData = toRefs(state.list[index]);
};

const reviewPopAction = () => {
    const { disable, title, bg } = state.popupData;
    if (!disable && !bg) {
        window.open('https://zealy.io/c/decheckdao/invite/EZ4ltKmkbuJ7_zvKkXptZ', '_blank')
        // router.push({
        //     name: "mbDaoApply",
        //     query: { type: title }
        // })
    } else {
        state.soonShow = true
    }
}

const downClick = () => {
    state.soonShow = false
    web3js.isReviewerNFT().then(res=>{
        console.log(res)
    })
}

const state = reactive({
    soonShow: false,
    popup: false,
    popupData: {
        title: "Reviewer",
        content: 'Lets make things better!',
        btnText: 'DETAILS',
        popBtnText: 'GO',
        pic: '/images/mobile/dao/auditor.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
        bg: true
    },
    list: [{
        title: "REVIEWER",
        content: 'Lets make things better!',
        tips1: 'The reviewer is the core identity of decheck DAO and also the foundation of DeCheck DAO DID.',
        tips2: 'Reviewer NFT is the only role identity token for reviewers in the DeCheck DAO.',
        btips: 'Become a Reviewer by airdrop mission',
        btnText: 'DETAILS',
        popBtnText: 'GO',
        pic: '/images/mobile/dao/reviewer.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
        bg: false
    }, {
        title: "Auditor",
        content: 'Code is law!',
        tips1: 'DeCheck DAO welcomes people with coding skills to apply to become our Auditor roles.',
        tips2: 'Harvest DeCheck Treasury incentives in the DeCheck DAO through your coding abilities.',
        btips: 'Become a Auditor by DID application',
        btnText: 'DETAILS',
        popBtnText: 'COMMING SOON',
        pic: '/images/mobile/dao/auditor.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
        bg: true
    }, {
        title: "RESEARCHER",
        content: 'Next big thing!',
        tips1: 'DeCheck DAO welcomes people with coding skills to apply to become our Auditor roles.',
        tips2: 'Harvest DeCheck Treasury incentives in the DeCheck DAO through your coding abilities.',
        btips: 'Become a Auditor by DID application',
        btnText: 'DETAILS',
        popBtnText: 'COMMING SOON',
        pic: '/images/mobile/dao/researcher.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
        bg: true
    }, {
        title: "PRODUCER",
        content: 'Craftsmanship!',
        tips1: 'DeCheck DAO welcomes people with coding skills to apply to become our Auditor roles.',
        tips2: 'Harvest DeCheck Treasury incentives in the DeCheck DAO through your coding abilities.',
        btips: 'Become a Auditor by DID application',
        btnText: 'DETAILS',
        popBtnText: 'COMMING SOON',
        pic: '/images/mobile/dao/producer.svg',
        disable: false,
        callback: activePopup,
        popAction: reviewPopAction,
        bg: true
    }]
})

const { list, popup, popupData } = toRefs(state);

</script>
<style scoped>
:deep(.van-popup) {
    background: #302D34;
    border-radius: 12px;
}</style>