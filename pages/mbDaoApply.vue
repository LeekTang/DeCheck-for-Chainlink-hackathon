<template>
    <div class="bg-[#070312] min-h-screen px-[24px] pb-[60px]">
        <mbHeader>
            <template v-slot:left>
                EXPLORER
            </template>
        </mbHeader>
        <div class="w-[100%] pt-[16px] min-h-screen overflow-y-auto overscroll-y-contain"
            style="font-family: Hezaedrus-Medium;">
            <img class="object-cover w-[100%] mb-[16px]" src="/images/mobile/dao/genesis.svg" alt="">
            <panel class="py-[12px]" :type="type" progress="pending"></panel>
            <panel class="py-[12px]" :type="type" progress="pending"></panel>
            <article class="text-[14px] text-center text-textGray py-[6px,32px]" style="font-family: Hezaedrus-regular;">
                DeCheck will determine if you have
                code review capability based on your reviews</article>

            <div class="h-[40px] text-[white] text-[16px] bg-[white] rounded-[12px] text-center text-center mt-[32px] leading-[40px]
            bg-gradient-to-r from-[#129CC8] to-[#56269B]" @click="submit">
                APPLY
            </div>
        </div>
    </div>
</template>

<script setup>
import mbHeader from '@/src/components/mobile/mbHeader.vue'
import panel from '~/src/components/mobile/dao/panel.vue.js'
import { toRefs, onMounted, reactive } from 'vue';
const route = useRoute();
const { type } = route.query;

onMounted(() => {

})
</script>
<style scoped></style>