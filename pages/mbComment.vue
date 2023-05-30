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
                            <img src="/images/mobile/dao/genesis.svg" alt="">
                        </div>
                        <div>
                            <h4 class="text-[16px]">NAME</h4>
                            <p class="text-textGray text-[12px]">RATE THIS ITEM</p>
                        </div>
                    </div>
                    <el-rate :size="20" allow-half v-model="rate" />
                </div>
                <div
                    class="bg-[white] text-[#070312] w-[117px] h-[32px] rounded-[12px] leading-[32px] text-center text-[14px]">
                    View Project</div>
            </div>
            <div class="w-[100%] overflow-y-scroll text-[12px] mt-[25px]" style="font-family: Hezaedrus-regular;">
                <div class="flex justify-start">
                    <span
                        class="text-textGray border border-[#FFFFFF1C] py-[6px] px-[8px] mr-[10px] rounded-[20px]">BUG</span>
                    <span
                        class="text-textGray border border-[#FFFFFF1C] py-[6px] px-[8px] mr-[10px] rounded-[20px]">BUG</span>
                    <span
                        class="text-textGray border border-[#FFFFFF1C] py-[6px] px-[8px] mr-[10px] rounded-[20px]">BUG</span>
                </div>
            </div>
            <div class="w-[100%] overflow-y-scroll my-[16px]">
                <div class="flex justify-start">
                    <div class="w-[56px] h-[56px] rounded-[12px] bg-[#2E4560] overflow-hidden object-cover">
                        <img src="" alt="">
                    </div>
                </div>
            </div>
            <p class="text-[14px] " style="font-family: Hezaedrus-regular;">
                Within our ventures, the expansion circuit of Ethereum is inevitable. It is just a matter of how to make
                decisions on different projects with different technical points in different areas. arbitrum was often
                contrasted with optimism (op) and zksync.
                At that time, zksync2.0 had not been put on the line yet, and there was a lot of uncertainty about it, but
                its leading technology was beyond doubt, so we put zkrollup on hold for a while and compared it with op. If
                not to pick out the details, in general, arbitrum and op have one difference. Is that op at that time can
                only do 99% compatible with EVM, it does its own EVM execution level some instruction set is not enough
                support, but arbitrum is the first to do 100% compatible with EVM,
                Although it may seem a difference of 1%, but compared with op and arbitrum, arbitrum has a very big
                difference in the rapid roll-out of the market execution level. By the end of '21, there was some money
                available to try out some local dog projects on arbitrum. And then there were some good projects, like GMX,
                or some derivatives, because this kind of financial derivative is naturally suitable for layer2 to do. This
                case fully illustrates the importance of technological innovation itself, as well as how to better advance
                quickly in the market strategy.
            </p>
        </div>
        <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />

    </div>
</template>
<script setup>
import { toRefs, onMounted, reactive } from 'vue';
import mbHeader from '@/src/components/mobile/mbHeader.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const state = reactive({
    show: false,
    rate: 3,
})

const actions = [
    { name: '选项一' },
    { name: '选项二' },
    { name: '选项三' },
];

const onSelect = (item) => {
    show.value = false;
};

const goBack = () => {
    router.go(-1);
}
const handleMore = () => {
    state.show = true
}


const { show, rate } = toRefs(state);
</script>
<style scoped>
:deep(.van-action-sheet__item) {
    background: #302D34;
    color: white;
    font-size: 16px;
}
</style>