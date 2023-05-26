<template>
    <div class="flex flex-col p-[16px] rounded-[12px] overflow-hidden bg-[#1B1A1D] border border-[#ffffff1c]">
        <img class="object-cover" :src="pic" alt="">
        <h4 class="text-[12px] my-[16px] text-textGray text-center line-clamp-2">
            {{ content }}
        </h4>
        <div class="h-[32px] text-[14px] bg-[white] rounded-[12px] text-center leading-[32px]" @click="submit" round>
            {{ btnText }}
        </div>
    </div>
</template>
<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    pic: String,
    content: String,
    btnText: String,
    submit: Function,
})
const { content, btnText, submit, pic } = toRefs(props);

</script>
<style scoped></style>