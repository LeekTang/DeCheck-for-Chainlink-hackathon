<template>
    <div
        class="w-[100%] flex justify-between items-center px-[16px] mb-[10px] rounded-[12px] bg-[#1B1A1D] border border-[#ffffff1c]">
        <div class="flex flex-col items-start text-center">
            <h4 class="text-[16px] text-[white]">{{ type }}</h4>
            <div :class="`text-${textColor} text-[12px]`">{{ statusText }}</div>
        </div>
        <div>
            <van-circle v-if="progress === 'pending'" v-model:current-rate="currentRate" :speed="100" color="#9044FF"
                layer-color="rgba(255, 255, 255, 0.66)" :stroke-width="100" rate="100" size="18px" />
            <img v-else-if="progress === 'failure'" src="/images/mobile/common/warn.svg" alt="">
            <img v-else class="text-[14px]" src="/images/mobile/common/vector.svg" alt="">
        </div>
    </div>
</template>
<script setup>

import { toRefs, onMounted, ref } from 'vue';

const currentRate = ref(0);
const props = defineProps({
    type: String,
    progress: String,
})

onMounted(() => {
    const timer = setTimeout(() => {
        currentRate.value++
    }, 10)
})

const colorOption = {
    pending: 'textGray',
    success: '[#11B466]',
    failure: '[#FF5353]',
}

const textOption = {
    pending: 'Under review...',
    success: 'Qualified',
    failure: 'Unqualified',
}
let { type, progress = 'success' } = props;

const textColor = colorOption[progress];
const statusText = textOption[progress];

</script>
<style scoped></style>