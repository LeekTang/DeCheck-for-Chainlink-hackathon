<template>
    <div class="bg-[#070312] min-h-screen pb-[60px]">
        <mbHeader>
            <template v-slot:left>
                {{ t('profile') }}
            </template>
        </mbHeader>
        <div class="w-[100%] pt-[16px] px-[16px] min-h-screen overflow-y-auto overscroll-y-contain"
            style="font-family: Hezaedrus-Medium;">
            <div class="flex justify-center">
                <div class="avatar w-[72px] h-[72px] overflow-hidden relative">
                    <img class="rounded-[100%] overflow-hidden" src="/images/mobile/dao/genesis.svg" alt="">
                    <img class="absolute right-0 bottom-0" src="/images/mobile/profile/certified.svg" alt="">
                </div>
            </div>
            <div class="flex justify-center text-[14px] py-[16px] mb-[16px]">
                <span class="text-[white] pr-[5px]" v-if="store.userInfo.account">{{ abbr(store.userInfo.account) || '-'
                }}</span>
                <img src="/images/mobile/common/edit.svg" alt="">
            </div>
            <div class="text-[14px] text-[white] flex">
                <div class="flex-col w-[50%] pr-[8px]">
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c] "
                        @click="urlPush('mbDck')">
                        <img src="/images/mobile/profile/message.svg" alt="">
                        <h4 class="pt-[10px]">{{ t('dck') }}</h4>
                    </div>
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c] "
                        @click="state.soonShow = true">
                        <img src="/images/mobile/profile/mail.svg" alt="">
                        <h4 class="pt-[10px]">{{ t('invite') }}</h4>
                    </div>
                </div>
                <div class="flex-col w-[50%] pl-[8px]">
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c] "
                        @click="urlPush('mbLuckyBox')">
                        <img src="/images/mobile/profile/gift.svg" alt="">
                        <h4 class="pt-[10px]">{{ t('lucky') }}</h4>
                    </div>
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c] "
                        @click="state.soonShow = true">
                        <img src="/images/mobile/profile/bounty.svg" alt="">
                        <h4 class="pt-[10px]">{{ t('bounty') }}</h4>
                    </div>
                </div>
            </div>
            <h3 class="text-textGray text-[14px]">{{ t('myreviews') }} ({{ state.proNumber }})</h3>
            <div class="text-center h-[6rem] leading-[6rem]" v-if="state.loading">
                <van-loading color="#0094ff" />
            </div>
            <template v-else>
                <div class="flex-col text-[white] mt-[1rem]" v-for="item in state.reviewList" :key="item.id">
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c]"
                        @click="checkDetail(item.id)">
                        <div class="flex justify-between pb-[5px]">
                            <div class="text-[16px]">{{ item.projectName }}</div>
                            <span class="text-[#ffffff6c] text-[12px]" style="font-family: Hezaedrus-regular;">{{
                                timestampToTime(item.createAt, true) }}</span>
                        </div>
                        <div>
                            <van-rate readonly v-model="item.score" size="15" void-icon="star" color="#FFB524"
                                void-color="#FFFFFF54" />
                        </div>
                        <article class="text-[12px] line-clamp-3 whitespace-pre-wrap"
                            style="font-family: Hezaedrus-regular;" v-html="item.content">
                        </article>
                    </div>
                </div>
            </template>
            <van-dialog v-model:show="state.soonShow" :showConfirmButton="false">
                <div class="w-[312px] p-[24px]">
                    <div class="text-[16px] text-[#fff]" style="font-family: Hezaedrus-bold;">COMMING SOON</div>
                    <div class="bg-[#FFFFFF] h-[40px] leading-[40px] rounded-[12px] mt-[24px] text-center font-medium"
                        style="font-family: Hezaedrus-Bold;" @click="state.soonShow = false">OKEY</div>
                </div>
            </van-dialog>
        </div>
        <tabBar></tabBar>
    </div>
</template>     
<script setup>
import { reactive, toRefs, onMounted } from 'vue';
import mbHeader from '@/src/components/mobile/mbHeader.vue';
import tabBar from '@/src/components/mobile/mbTabBar.vue';
import { useRouter } from 'vue-router'
const router = useRouter();
import { abbr, timestampToTime } from '@/src/utils/utils'
import request from '@/src/utils/request'
import { userStore } from '@/src/stores/user'
const store = userStore()
import web3js from '@/src/utils/link'
const runConfig = useRuntimeConfig()
import { useI18n } from  'vue-i18n'
const { t } = useI18n();

const state = reactive({
    loading: true,
    proNumber: 0,
    page: 1,
    pageSize: 20,
    reviewList: [],
    soonShow: false
})

const connectClick = () => {
    web3js.connect().then((res) => {
        if (res == undefined) { return; }
        web3js.change().then(chanres => {
            if (chanres == true) {
                goSignOut()
            }
        })
        web3js.getSign().then(signres => {
            if (signres.signMessage) {
                let data = {
                    aggregateType: 7,
                    appId: runConfig.public.VITE_LOGIN_ID,
                    authId: signres.account,
                    strSign: signres.signMessage,
                    type: 4,
                    data: runConfig.public.VITE_SIGN_TEXT
                }
                request({ url: `/center/apis/user/user-login/login`, method: 'post', data: data, baseURL: runConfig.public.VITE_LOGIN_URL }).then(loginres => {
                    localStorage.setItem('token', loginres.tokenValue)
                    store.userInfo = { account: signres.account }
                    store.isSign = true;
                    getReview()
                })
            }
        })
    })
}

const getReview = () => {
    request.get(`/plugin/decheck/api/user/review/page?page=${state.page}&pageSize=${state.pageSize}`).then(res => {
        state.loading = false
        state.proNumber = res.total
        state.reviewList = res.list
    })
}

onMounted(() => {
    if (!store.isSign) {
        connectClick()
    } else {
        getReview()
    }
})
const checkDetail = (id) => {
    router.push({
        name: 'mbComment',
        query: { id: id }
    })
}

const urlPush = (url) => {
    if(url){
        router.push({
            name: url
        })
    }
}

</script>
<style scoped>:deep(.van-popup) {
    background: #302D34;
    border-radius: 12px;
}</style>