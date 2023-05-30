<template>
    <div class="bg-[#070312] min-h-screen px-[16px] pb-[60px]">
        <mbHeader>
            <template v-slot:left>
                MY PROFILE
            </template>
        </mbHeader>
        <div class="w-[100%] pt-[16px] min-h-screen overflow-y-auto overscroll-y-contain"
            style="font-family: Hezaedrus-Medium;">
            <div class="flex justify-center">
                <div class="avatar w-[72px] h-[72px] overflow-hidden relative">
                    <img class="rounded-[100%] overflow-hidden" src="/images/mobile/dao/genesis.svg" alt="">
                    <img class="absolute right-0 bottom-0" src="/images/mobile/profile/certified.svg" alt="">
                </div>
            </div>
            <div class="flex justify-center text-[14px] py-[16px] mb-[16px]">
                <span class="text-[white] pr-[5px]">0xBfcb...0574</span>
                <img src="/images/mobile/common/edit.svg" alt="">
            </div>
            <div class="text-[14px] text-[white] flex">
                <div class="flex-col w-[50%] pr-[8px]">
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c] ">
                        <img src="/images/mobile/profile/message.svg" alt="">
                        <h4 class="pt-[10px]">DCK Reward</h4>
                    </div>
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c] ">
                        <img src="/images/mobile/profile/mail.svg" alt="">
                        <h4 class="pt-[10px]">Invite Reward</h4>
                    </div>
                </div>
                <div class="flex-col w-[50%] pl-[8px]">
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c] ">
                        <img src="/images/mobile/profile/gift.svg" alt="">
                        <h4 class="pt-[10px]">Lucky Box</h4>
                    </div>
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c] ">
                        <img src="/images/mobile/profile/bounty.svg" alt="">
                        <h4 class="pt-[10px]">DeCheck Bounty</h4>
                    </div>
                </div>
            </div>
            <h3 class="text-textGray text-[14px]">MY REVIEWS ({{ proNumber }})</h3>
            <div class="flex-col text-[white] py-[16px]">
                <van-skeleton title avatar :row="3" :loading="loading">
                    <div class="mb-[16px] rounded-[12px] p-[16px] border border-solid bg-[#1B1A1D] border-[#ffffff1c]"
                        @click="() => checkDetail(1)">
                        <div class="flex justify-between pb-[5px]">
                            <div class="text-[16px]">PROJECT NAME</div>
                            <span class="text-[#ffffff6c] text-[12px]"
                                style="font-family: Hezaedrus-regular;">2023-06-23</span>
                        </div>
                        <div>
                            <el-rate v-model="rate" />
                        </div>
                        <article class="text-[12px] line-clamp-3" style="font-family: Hezaedrus-regular;">
                            Within our ventures, the expansion circuit of Ethereum is inevitable. It is just a matter of how
                            to
                            make decisions on different projects with different...
                        </article>
                    </div>
                </van-skeleton>
            </div>
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

const state = reactive({
    rate: 3,
    loading: true,
    proNumber: 20,
})

onMounted(() => {
    state.loading = false;
})
const checkDetail = (param) => {
    router.push({
        name: 'mbComment',
        query: { id: 1 }
    })
}
const { rate, loading, proNumber } = toRefs(state)
</script>
<style scoped></style>