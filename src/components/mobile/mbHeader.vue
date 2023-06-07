<template>
  <div class="flex justify-between items-center p-[1rem]">
    <div class="text-[1rem] text-[#fff]" style="font-family:Hezaedrus-Bold">
      <slot name="left"></slot>
    </div>
    <slot v-if="showRight" name="right"></slot>
    <div v-else class="flex flex-row">
      <div class="h-[34px] w-[34px] p-[7px] rounded-full bg-[#1B1A1D] border border-[#ffffff1c]" @click="changeLanguage">
        <img src="/images/mobile/home/net.svg" class="h-[18px] w-[18px]" />
      </div>
      <NuxtLink to="/mbSearch"
        class="h-[34px] w-[34px] p-[7px] rounded-full bg-[#1B1A1D] border border-[#ffffff1c] ml-[1rem]">
        <img src="/images/mobile/home/search.svg" class="h-[18px] w-[18px]" />
      </NuxtLink>
      <div class="h-[34px] w-[34px] p-[7px] rounded-full bg-[#1B1A1D] border border-[#ffffff1c] ml-[1rem]" v-if="store.isSign == false">
        <img src="/images/mobile/home/mine.svg" class="h-[18px] w-[18px]" @click="connectClick"/>
      </div>
      <van-popover v-model:show="state.showPopover" theme="dark" placement="bottom-end" v-else>
        <template #reference>
          <div class="h-[34px] w-[34px] p-[2px] rounded-full bg-[#1B1A1D] border border-[#ffffff1c] ml-[1rem]">
            <img src="/images/avatar.png" />
          </div>
        </template>
        <div class="py-[5px] px-[1rem] bg-[#302D34] rounded-[12px] text-[12px] font-medium">
          <p class="text-[#FFFFFFA8] py-[10px] border-b border-[#FFFFFF1C]">{{ abbr(store.userInfo.account) }}</p>
          <p class="text-[#FF5353] py-[10px]" @click="goSignOut">Log Out</p>
        </div>
      </van-popover>
    </div>
    <van-action-sheet v-model:show="state.screen" title="LANGUAGE" :closeable="false">
      <van-radio-group v-model="state.filterValue" checked-color="#9044FF">
        <van-cell-group inset :border="false" style="font-family: Hezaedrus-Medium;">
          <van-cell :border="false" v-for="item in language" :key="item.value" :title="item.title"
            :class="`${state.filterValue == item.value ? 'checked' : ''}`" clickable
            @click="state.filterValue = item.value">
            <template #right-icon>
              <van-radio :name=item.value />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="flex justify-around text-center my-[18px] text-[16px]" style="font-family: Hezaedrus-Medium;">
        <div
          class="h-[40px] w-[156px] leading-[40px] rounded-[12px] text-[#ffffff] bg-[#302D34] border border-[#ffffff54]"
          @click="closeFilter">Cancel</div>
        <div
          class="h-[40px] w-[156px] leading-[40px] rounded-[12px] text-[#070312] bg-[#ffffff] border border-[#ffffff54]"
          @click="onSetLanguage">ok</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, useSlots } from 'vue'
import web3js from '@/src/utils/link'
import request from '@/src/utils/request'
import { abbr } from '@/src/utils/utils'
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();
import { userStore } from '@/src/stores/user'
const store = userStore()
const runConfig = useRuntimeConfig()

const showRight = ref(false);
const slotRight = !!useSlots().right;

const onSetLanguage = () => {
  locale.value = localStorage.language = state.filterValue;
  state.screen = false
};

const state = reactive({
  screen: false,
  filterValue: 'EN',
  showPopover: false
})

const changeLanguage = () => {
  state.screen = true
}

const initLanguage = () => {
	locale.value = localStorage.language || 'EN';
};

const language = [
  { title: 'English', value: 'EN' },
  { title: 'Chinese', value: 'ZH' }
]

const closeFilter = () => {
  state.screen = false
}

const goSignOut = () => {
  store.isSign = false;
	store.userInfo = {};
  localStorage.language = ''
  localStorage.token = ""
  if(route.name == "mbComment" || route.name == "mbProfile"){
    router.replace({
      name: ''
    })
  }
}

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
        })
      }
    })
  })
}

onMounted(() => {
  initLanguage();
  if (slotRight) {
    showRight.value = true;
  }
})
</script>

<style scoped>
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

.checked {
  color: #9044FF !important;
}
</style>