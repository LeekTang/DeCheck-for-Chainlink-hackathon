<template>
  <div class="bg-[#070312] min-h-screen px-[16px] ">
    <div class="flex items-center justify-between h-[56px]">
      <img class="h-[24px] w-[24px]" src="/images/mobile/common/back.svg" @click="backHandle" />
      <div class="flex items-center">
        <img class="h-[24px] w-[24px] rounded-[8px] mr-[8px]" :src="state.projectDetail.logo" @error="imgError" />
        <p class="text-[18px] text-[#ffffff] font-medium" style="font-family: Hezaedrus-Medium;">{{
          state.projectDetail.name }}</p>
      </div>
      <div class="h-[24px] w-[24px]"></div>
    </div>
    <div class="flex justify-between text-[#ffffff] mt-[24px]" style="font-family: Hezaedrus-Medium;">
      <div>
        <p class="text-[18px]">{{ state.projectDetail.score }}</p>
        <van-rate readonly void-icon="star" color="#ffd21e" void-color="#FFFFFF54" v-model="state.projectDetail.score" :size="16" />
      </div>
      <div class="text-right text-[14px] flex flex-col justify-between">
        <p>$1822.53</p>
        <p :class="true ? 'text-[#11B466]' : 'text-[#FF5353]'">58.35%</p>
      </div>
    </div>
    <div class="mt-[24px]">
      <div class="h-[64px] border border-[#ffffff1c] flex items-center justify-between
        p-[16px] rounded-[12px] bg-[#1B1A1D] mb-[10px]" style="font-family: Hezaedrus-Regular;">
        <div class="h-[32px] w-[100px] flex items-center justify-between py-[9px] px-[16px] bg-[#ffffff] rounded-[12px]"
          @click="state.chainShow = true">
          <p class="text-[14px] text-[#070312]">{{ state.chainName }}</p>
          <img src="/images/mobile/common/down.svg" class="h-[16px] w-[16px]" />
        </div>
        <div class="flex items-center">
          <p class="text-[#ffffff] text-[12px]" style="font-family: Hezaedrus-Medium;" v-if="state.chainAddress">{{
            abbr(state.chainAddress) }}</p>
          <img src="/images/mobile/common/copy.svg" class="h-[16px] w-[16px] ml-[1rem]"
            @click="copyClick(state.chainAddress)" />
        </div>
      </div>
    </div>
    <van-action-sheet v-model:show="state.chainShow" :title="t('Contracts')">
      <van-radio-group v-model="state.chainId" checked-color="#9044FF">
        <van-cell-group inset :border="false" style="font-family: Hezaedrus-Medium;">
          <van-cell :border="false" v-for="item in state.tokenList" :key="item[0]" :title="item.chain"
            :class="`${state.chainId == item.value ? 'checked' : ''}`" clickable @click="selectChain(item)">
            <template #right-icon>
              <van-radio :name=item[0] />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-action-sheet>
    <div class="flex items-center justify-between mt-[10px]">
      <div @click="collect"
        class="py-[8px] px-[16px] h-[66px] w-[102px] flex flex-col items-center justify-between bg-[#1B1A1D] rounded-[12px] border border-[#ffffff1c]">
        <img
          :src="state.projectDetail.collected == 1 ? '/images/mobile/project/collected.svg' : '/images/mobile/project/collect-not.svg'"
          class="h-[24px] w-[24px]" />
        <p class="text-[14px] text-[#fff]" style="font-family: Hezaedrus-Medium;">{{ state.projectDetail.collected == 1 ?
          t('collected') :
          t('collect') }}</p>
      </div>
      <div @click="linkClick"
        class="py-[8px] px-[16px] h-[66px] w-[102px] flex flex-col items-center justify-between bg-[#1B1A1D] rounded-[12px] border border-[#ffffff1c]">
        <img src="/images/mobile/project/link.svg" class="h-[24px] w-[24px]" />
        <p class="text-[14px] text-[#fff]" style="font-family: Hezaedrus-Medium;">{{ t('links') }}</p>
      </div>
      <div
        class="py-[8px] px-[16px] h-[66px] w-[102px] flex flex-col items-center justify-between bg-[#1B1A1D] rounded-[12px] border border-[#ffffff1c]">
        <img src="/images/mobile/project/share.svg" class="h-[24px] w-[24px]" />
        <p class="text-[14px] text-[#fff]" style="font-family: Hezaedrus-Medium;">{{ t('share') }}</p>
      </div>
    </div>
    <van-action-sheet v-model:show="state.linkShow" :title="t('links')" :closeable="false">
      <van-cell-group inset :border="false" style="font-family: Hezaedrus-Medium;">
        <template v-for="item in iconList" :key="item.name">
          <van-cell :border="false" v-if="item.webSrc" :title="item.name" is-link :url="item.webSrc">
            <template #icon>
              <img :src="item.icon" class="h-[1.5rem] w-[1.5rem] mr-[0.625rem]" />
            </template>
          </van-cell>
        </template>
      </van-cell-group>
    </van-action-sheet>
    <div class="flex h-[28px] leading-[28px] overflow-x-scroll mt-[32px]" style="font-family: Hezaedrus-Bold;">
      <span v-for="(item, index) in tabList" :key="index" @click="tabHandle(item.value)"
        :class="`${item.value == state.tabIndex ? 'text-[#fff] tabItem' : 'text-[#ffffff54]'}  relative text-[14px] flex-shrink-0 inline-block mr-[24px]`">
        {{ item.title }}
      </span>
    </div>
    <div class="text-[#fff] mt-[1rem]" v-if="state.tabIndex == 1">
      <div class="p-[16px] border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem]" v-if="Object.keys(state.ownReview).length > 0">
        <div class="flex justify-between items-start">
          <p class="text-[16px] text-[#fff] font-bold" style="font-family: Hezaedrus-Bold;">{{ t('myComment') }}</p>
          <p class="leading-[0.5rem]">...</p>
        </div>
        <van-rate v-model="state.ownReview.score" void-icon="star" :size="14" color="#FFB524" void-color="#FFFFFF54" class="my-[0.75rem]"/>
        <article class="text-[12px] line-clamp-3 whitespace-pre-wrap" style="font-family: Hezaedrus-regular;"
          v-html="state.ownReview.content">
        </article>
        <p class="text-[14px] text-[#9044FF] mt-[0.75rem]" @click="checkDetail()" style="font-family: Hezaedrus-Bold;">{{ t('editComment') }}</p>
      </div>
      <div class="p-[16px] border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem]" v-else>
        <p class="text-[16px] text-[#fff] font-bold" style="font-family: Hezaedrus-Bold;">{{ t('rateItem') }}</p>
        <van-rate v-model="state.reviewRate" :size="30" color="#FFB524" class="justify-between my-[1rem]"
          @click="reviewHandle" />
        <p class="text-[14px] text-[#9044FF]" style="font-family: Hezaedrus-Bold;">{{ t('waiteReview') }}</p>
      </div>
      <div class="mt-[2rem]">
        <p class="text-[14px] text-[#fff] font-bold" style="font-family: Hezaedrus-Bold;">{{ t('decheckReview') }}</p>
        <div class="flex mt-[1rem]">
          <div
            class="h-[2rem] flex items-center px-[0.75rem] py-[0.56rem] border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem] mr-[1rem]">
            <p class="text-[0.875rem] text-[#fff]" style="font-family: Hezaedrus-Medium;">Hottest</p>
            <img src="/images/mobile/common/down-white.svg" class="h-[16px] w-[16px]" />
          </div>
          <div
            class="h-[2rem] flex items-center px-[0.75rem] py-[0.56rem] border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem]">
            <p class="text-[0.875rem] text-[#fff]" style="font-family: Hezaedrus-Medium;">All</p>
            <img src="/images/mobile/common/down-white.svg" class="h-[16px] w-[16px]" />
          </div>
        </div>
      </div>
      <div>
        <div v-for="item in state.commentList" :key="item.id" class="py-[1rem] border-b border-[#ffffff1c]">
          <div class="flex justify-between items-center">
            <div class="flex">
              <img src="/images/reviewer.svg" class="h-[2rem] w-[2rem] rounded-full mr-[0.625rem]" />
              <div class="text-[0.75rem]" style="font-family: Hezaedrus-Medium;">
                <p class="flex items-center  text-[#fff]" v-if="item.userId">{{ abbr(item.userId) }}
                  <img v-if="item.type == 1" src="/images/mobile/project/authen.svg"
                    class="h-[0.875rem] w-[0.875rem] ml-[0.2rem]" />
                </p>
                <p :class="`${item.type == 1 ? 'linear-text' : ''}`">{{ t('reviewed') }}: {{ item.reviewed }}</p>
              </div>
            </div>
            <div class="text-right">
              <van-rate v-model="item.score" readonly void-icon="star" color="#FFB524" void-color="#FFFFFF54" size="14" />
              <p class="text-[0.75rem] text-[#ffffff85] mt-[0.1rem]" style="font-family: Hezaedrus-Regular;">{{
                timestampToTime(item.createAt, true) }}</p>
            </div>
          </div>
          <div class="mt-[1rem]">
            <span v-for="(tag, index) in item.tags" :key="index"
              class="text-[0.75rem] text-[#fff] py-[0.25rem] px-[0.5rem] bg-[#1B1A1D] mr-[0.5rem]"
              style="font-family: Hezaedrus-Regular;">
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center overflow-x-scroll mt-[0.75rem]" v-if="item.image">
            <div class="h-[3.5rem] w-[3.5rem] mr-[0.625rem] rounded-[0.75rem] flex-shrink-0 " v-for="(img, index) in item.attachment"
              :key="index" @click="showPreview(item.attachment, index)">
              <img class="h-[3.5rem] w-[3.5rem] rounded-[0.75rem]" :src="img" style="object-fit: cover;" />
            </div>
          </div>
          <p class="text-[0.75rem] py-[0.75rem] whitespace-pre-wrap" style="font-family: Hezaedrus-Regular;"
            v-html="item.content"></p>
          <span
            :class="`${item.like ? 'bg-[#1B1A1D]' : 'bg-[#fff]'} border border-[#ffffff1c] inline-block rounded-[0.5rem] min-w-[3.5rem]`">
            <div class="flex items-center h-[1.5rem] px-[0.57rem]">
              <img :src="item.like ? '/images/mobile/project/like.svg' : '/images/mobile/project/like-not.svg'"
                class="h-[1rem] w-[1rem] mr-[0.25rem]" />
              <p :class="`${item.like ? 'text-[#ffffff]' : 'text-[#1B1A1D]'} text-[0.75rem]`">{{ item.helpful }}</p>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="text-[#fff]" v-else-if="state.tabIndex == 2">
      <div class="border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem] p-[1rem] mt-[1rem]">
        <div class="flex items-center justify-between border-b border-[#ffffff1c] py-[0.875rem]">
          <p class="text-[0.75rem] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular;">{{ t('tokenName') }}</p>
          <div class="text-[0.75rem] text-[#ffffff]" style="font-family: Hezaedrus-Medium;">{{
            state.checkInfo.token_name }}({{ state.checkInfo.token_symbol }})</div>
        </div>
        <div class="flex items-center justify-between border-b border-[#ffffff1c] py-[0.875rem]">
          <p class="text-[0.75rem] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular;">{{ t('contractCreator') }}</p>
          <div class="text-[0.75rem] text-[#ffffff] flex " style="font-family: Hezaedrus-Medium;"
            v-if="state.checkInfo.creator_address">
            <p>{{ abbr(state.checkInfo.creator_address) }}</p>
            <img src="/images/mobile/common/copy.svg" class="h-[16px] w-[16px] ml-[0.5rem]"
              @click="copyClick(state.checkInfo.creator_address)" />
          </div>
        </div>
        <div class="flex items-center justify-between border-b border-[#ffffff1c] py-[0.875rem]">
          <p class="text-[0.75rem] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular;">{{ t('contractOwner') }}</p>
          <div class="text-[0.75rem] text-[#ffffff] flex " style="font-family: Hezaedrus-Medium;"
            v-if="state.checkInfo.owner_address">
            <p>{{ abbr(state.checkInfo.owner_address) }}</p>
            <img src="/images/mobile/common/copy.svg" class="h-[16px] w-[16px] ml-[0.5rem]"
              @click="copyClick(state.checkInfo.owner_address)" />
          </div>
        </div>
        <div class="flex items-center justify-between border-b border-[#ffffff1c] py-[0.875rem]">
          <p class="text-[0.75rem] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular;">{{ t('totalSupply') }}</p>
          <div class="text-[0.75rem] text-[#ffffff] flex " style="font-family: Hezaedrus-Medium;">
            <p>{{ toShort(state.checkInfo.total_supply, 2) || '--' }}</p>
          </div>
        </div>
        <div class="flex items-center justify-between border-b border-[#ffffff1c] py-[0.875rem]">
          <p class="text-[0.75rem] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular;">{{ t('buyTax') }}</p>
          <div class="text-[0.75rem] text-[#11B466]" style="font-family: Hezaedrus-Medium;">{{ state.checkInfo.buy_tax +
            '%' }}</div>
        </div>
        <div class="flex items-center justify-between border-b border-[#ffffff1c] py-[0.875rem]">
          <p class="text-[0.75rem] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular;">{{ t('sellTax') }}</p>
          <div class="text-[0.75rem] text-[#FF4242]" style="font-family: Hezaedrus-Medium;">{{ state.checkInfo.sell_tax +
            '%' }}</div>
        </div>
      </div>
      <!-- holder -->
      <div class="border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem] p-[1rem] mt-[1rem]">
        <p class="text-[0.75rem] text-[#ffffff] font-medium" style="font-family: Hezaedrus-Medium;">{{ t('tokenHoldersInfo') }}</p>
        <div class="flex items-center justify-between text-[1.125rem] font-bold mt-[1rem]"
          style="font-family: Hezaedrus-Bold;">
          <div class="text-[#ffffff]">
            <p>{{ state.checkInfo.holder_count }}</p>
            <p class="text-[0.75rem] text-[#ffffffa8] leading-[0.75rem] font-normal"
              style="font-family: Hezaedrus-Regular;">{{ t('tokenHolders') }} </p>
          </div>
          <p class="text-[#11B466]">{{ state.holdPer + '%' }}</p>
        </div>
        <van-progress :percentage="state.holdPer" stroke-width="8" color="#11B466" :show-pivot="false"
          class="mt-[0.625rem]" />
        <div class="mt-[1.5rem]">
          <p class="text-[0.75rem] text-[#ffffff] font-medium" style="font-family: Hezaedrus-Medium;">{{ t('top10holders') }}
          </p>
          <template v-for="(item, index) in state.checkInfo.holders" :key="index">
            <div v-if="index < state.holderMore"
              class="flex items-end justify-between border-b border-[#ffffff1c] py-[0.625rem]">
              <div class="flex items-start">
                <img v-if="index == 0" src="/images/no1.svg" class="h-[1rem] w-[0.875rem] mr-[0.5rem]" />
                <img v-else-if="index == 1" src="/images/no2.svg" class="h-[1rem] w-[0.875rem] mr-[0.5rem]" />
                <img v-else-if="index == 2" src="/images/no3.svg" class="h-[1rem] w-[0.875rem] mr-[0.5rem]" />
                <p v-else class="text-[0.75rem] text-[#fff] font-bold w-[0.875rem] mr-[0.5rem]"
                  style="font-family: Hezaedrus-Bold;">{{ index + 1 }}</p>
                <div class="text-[0.75rem] font-normal" style="font-family: Hezaedrus-Regular;">
                  <p class="text-[#ffffffa8]" v-if="item.address">{{ abbr(item.address) }}</p>
                  <div class="flex items-center">
                    <p class="text-[#fff]">{{ toShort(item.balance, 2) }}</p>
                    <img src="/images/contract_icon.svg" v-if="item.is_locked == 0"
                      class="h-[1rem] w-[1rem] ml-[0.625rem]" />
                  </div>
                </div>
              </div>
              <p class="text-[0.75rem] text-[#11B466] font-bold" style="font-family: Hezaedrus-Bold;">({{
                tosix(item.percent) }})</p>
            </div>
          </template>
          <div v-if="state.checkInfo.holders.length > 3" @click="showMore(1)"
            class="h-[2.5rem] border border-[#ffffffa8] rounded-[0.75rem] text-center leading-[2.5rem] text-[0.875rem] text-[#fff] font-medium mt-[1rem]"
            style="font-family: Hezaedrus-Medium;">
            {{ state.holderMore == 3 ? t('viewAll') : t('putAway') }}
          </div>
        </div>
      </div>
      <!-- pool -->
      <div class="border border-[#ffffff1c] bg-[#1B1A1D] rounded-[0.75rem] p-[1rem] mt-[1rem]"
        v-if="state.checkInfo.lp_holders">
        <p class="text-[0.75rem] text-[#ffffff] font-medium" style="font-family: Hezaedrus-Medium;">{{ t('LPPoolInfo') }}</p>
        <div class="flex items-center justify-between text-[1.125rem] font-bold mt-[1rem]"
          style="font-family: Hezaedrus-Bold;">
          <div class="text-[#ffffff]">
            <p>{{ state.checkInfo.lp_holder_count }}</p>
            <p class="text-[0.75rem] text-[#ffffffa8] leading-[0.75rem] font-normal"
              style="font-family: Hezaedrus-Regular;">{{ t('tokenHolders') }}</p>
          </div>
          <p class="text-[#9044FF]">{{ state.poolPer + '%' }}</p>
        </div>
        <van-progress :percentage="state.poolPer" stroke-width="8" color="#9044FF" :show-pivot="false"
          class="mt-[0.625rem]" />
        <div class="mt-[1.5rem]">
          <p class="text-[0.75rem] text-[#ffffff] font-medium" style="font-family: Hezaedrus-Medium;">{{ t('top10holders') }}
          </p>
          <template v-for="(item, index) in state.checkInfo.lp_holders" :key="index">
            <div v-if="index < state.poolMore"
              class="flex items-end justify-between border-b border-[#ffffff1c] py-[0.625rem]">
              <div class="flex items-start">
                <img v-if="index == 0" src="/images/no1.svg" class="h-[1rem] w-[0.875rem] mr-[0.5rem]" />
                <img v-else-if="index == 1" src="/images/no2.svg" class="h-[1rem] w-[0.875rem] mr-[0.5rem]" />
                <img v-else-if="index == 2" src="/images/no3.svg" class="h-[1rem] w-[0.875rem] mr-[0.5rem]" />
                <p v-else class="text-[0.75rem] text-[#fff] font-bold w-[0.875rem] mr-[0.5rem]"
                  style="font-family: Hezaedrus-Bold;">{{ index + 1 }}</p>
                <div class="text-[0.75rem] font-normal" style="font-family: Hezaedrus-Regular;">
                  <p class="text-[#ffffffa8]" v-if="item.address">{{ abbr(item.address) }}</p>
                  <div class="flex items-center">
                    <p class="text-[#fff]">{{ toShort(item.balance, 2) }}</p>
                    <img src="/images/contract_icon.svg" v-if="item.is_contract == 1"
                      class="h-[1rem] w-[1rem] ml-[0.625rem]" />
                  </div>
                </div>
              </div>
              <p class="text-[0.75rem] text-[#9044FF] font-bold" style="font-family: Hezaedrus-Bold;">
                ({{ tosix(item.percent) }})</p>
            </div>
          </template>
          <div v-if="state.checkInfo.lp_holders.length > 3" @click="showMore(2)"
            class="h-[2.5rem] border border-[#ffffffa8] rounded-[0.75rem] text-center leading-[2.5rem] text-[0.875rem] text-[#fff] font-medium mt-[1rem]"
            style="font-family: Hezaedrus-Medium;">
            {{ state.poolMore == 3 ? t('viewAll') : t('putAway') }}
          </div>
        </div>
      </div>
    </div>
    <div class="text-[#fff]" v-else>
      <div class="border border-[#ffffff1c] p-[1rem] rounded-[0.75rem] mt-[1rem]">
        <template v-for="item in listOrder" :key="item">
          <div class="flex flex-col border-b-2 border-b-[#FFFFFF1C] mt-[0.75rem]">
            <div class="flex items-center">
              <template v-if="item.grade == 1">
                <img
                  :src="state.checkInfo[item.key] == 1 ? '/images/danger.svg' : (state.checkInfo[item.key] == 0 ? '/images/success.svg' : '/images/warning.svg')"
                  class="h-[1rem] w-[1rem] mr-[0.5rem]">
              </template>
              <template v-else-if="item.grade == 2">
                <img
                  :src="state.checkInfo[item.key] == 1 ? '/images/warning.svg' : (state.checkInfo[item.key] == 0 ? '/images/success.svg' : '/images/danger.svg')"
                  class="h-[1rem] w-[1rem] mr-[0.5rem]">
              </template>
              <template v-else-if="item.grade == 3">
                <img
                  :src="state.checkInfo[item.key] == 1 ? '/images/success.svg' : (state.checkInfo[item.key] == 0 ? '/images/danger.svg' : '/images/warning.svg')"
                  class="h-[1rem] w-[1rem] mr-[0.5rem]">
              </template>
              <template v-else-if="item.grade == 4">
                <img
                  :src="state.checkInfo[item.key] == 1 ? '/images/success.svg' : (state.checkInfo[item.key] == 0 ? '/images/warning.svg' : '/images/danger.svg')"
                  class="h-[1rem] w-[1rem] mr-[0.5rem]">
              </template>
              <template v-else>
                <img
                  :src="state.checkInfo[item.key] == 1 ? '/images/danger.svg' : (state.checkInfo[item.key] == 0 ? '/images/warning.svg' : '/images/success.svg')"
                  class="h-[1rem] w-[1rem] mr-[0.5rem]">
              </template>
              <p class="text-[0.875rem] text-[#fff] font-medium"
                :style="{ color: state.checkInfo[item.key] == 0 ? item.color0 : item.color1 }"
                style="font-family: Hezaedrus-Medium;">
                {{ t(item.key + state.checkInfo[item.key]) }}</p>
            </div>

            <p class="text-[0.75rem] text-[#FFFFFFA8] my-[0.75rem]">{{ t(item.key + 'Tips') }}</p>
          </div>
        </template>
      </div>
      <p class="text-[0.75rem] text-[#fff] font-bold mt-[0.875rem]">{{ t('goTitle') }}</p>
      <div class="text-[0.75rem] text-[#FFFFFFA8] leading-[0.875rem] mt-[0.625rem]">
        <p>{{ t('goTips1') }}</p>
        <p>{{ t('goTips2') }}</p>
      </div>
      <a href="https://gopluslabs.io/" target="_blank"><img src="/images/goplus.png"
          class="h-[1.5rem] w-[10.5rem] mt-[0.625rem] mb-[1rem]" /></a>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import request from '@/src/utils/request'
import { abbr, imgError, copyToClipBoard, toShort, tosix, matchType, timestampToTime } from '@/src/utils/utils'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
import { showImagePreview } from 'vant'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { userStore } from '@/src/stores/user'
const store = userStore()

const state = reactive({
  chainShow: false,
  isCollect: false,
  chainId: '',
  chainName: '',
  chainAddress: '',
  tabIndex: 1,
  reviewRate: 0,
  linkShow: false,
  holderMore: 3,
  poolMore: 3,
  goInfo: "",
  projectID: '',
  projectDetail: [],
  tokenList: [],
  sortValue: 1,
  commentList: [],
  checkInfo: [],
  holdPer: '',           //hold百分比
  poolPer: '',           //pool百分比
  ownReview: []
})

const options = [
  { value: "1", label: "Ethereum" },
  { value: "56", label: "BSC" },
  { value: "42161", label: "Arbitrum" },
  { value: "137", label: "Polygon" },
  { value: "324", label: "zkSync Era" },
  { value: "43114", label: "Avalanche" },
  { value: "10", label: "Optimism" },
  { value: "66", label: "OKC" },
  { value: "128", label: "Heco" },
  { value: "25", label: "Cronos" },
  { value: "100", label: "Gnosis" },
  { value: "250", label: "Fantom" },
  { value: "321", label: "KCC" },
  { value: "10001", label: "ETHW" },
  { value: "59140", label: "Linea" },
  { value: "1666600000", label: "Harmony" },
  { value: "tron", label: "Tron" },
  { value: "201022", label: "FON" },
]

const iconList = [
  { name: 'web', icon: '/images/web-icon.svg', tip: 'Official website', webSrc: '' },
  { name: 'twitter', icon: '/images/twitter-icon.svg', tip: 'Twitter', webSrc: '' },
  { name: 'telegram', icon: '/images/telegram-icon.svg', tip: 'Telegram', webSrc: '' },
  { name: 'discord', icon: '/images/discord-icon.svg', tip: 'Discord', webSrc: '' },
  { name: 'youtube', icon: '/images/youtube.svg', tip: 'YouTube', webSrc: '' },
  { name: 'reddit', icon: '/images/reddit.svg', tip: 'Reddit', webSrc: '' },
  { name: 'github', icon: '/images/github-icon.svg', tip: 'Github', webSrc: '' },
  { name: 'whitePaper', icon: '/images/whitePaper.svg', tip: 'WhitePaper', webSrc: '' },
]

const backHandle = () => {
  router.back()
}

const copyClick = (val) => {
  if (val) {
    copyToClipBoard(val);
    showToast({
      message: t('copySuccess'),
    })
  }
}

const selectChain = (e) => {
  state.chainName = e.chain;
  state.chainAddress = e[1];
  getCheck()
  state.chainShow = false;
}

const collect = () => {
  request.get(`/plugin/decheck/api/user/collects/update/${state.projectID}`).then((res) => {
    state.projectDetail.collected == 1 ? state.projectDetail.collected = 0 : state.projectDetail.collected = 1
  })
}

const linkClick = () => {
  if ( state.projectDetail.socialMedia !== null){
    state.linkShow = true
  }
}

const closeFilter = () => {
  state.chainShow = false
}

const tabList = [
  { title: t('decheckReview'), value: 1 },
  { title: t('checkReport'), value: 2 },
  { title: t('riskCheck'), value: 3 },
]

const tabHandle = (value) => {
  state.tabIndex = value;
}

const reviewHandle = () => {
  router.push({
    name: 'mbReview',
    query: {
      rate: state.reviewRate,
      id: state.projectID,
      name: state.projectDetail.name,
      logo: state.projectDetail.logo,
      chainID: state.chainId,
      tokenAddr: state.chainAddress
    }
  })
}

const reviewInfo = () => {
  request
    .get(`/plugin/decheck/api/project/detail/review/page/${state.projectID}?page=1&pageSize=50&sort=${state.sortValue}`)
    .then((res) => {
      if (res.list) {
        state.commentList = res.list;
        state.commentList.forEach((el, index) => {
          if (el.attachment) {
            if (matchType(el.attachment[0]) == "video" && el.attachment.length == 1) {
              el.video = true;
            } else if (matchType(el.attachment[0]) == "image" && el.attachment.length >= 1) {
              el.image = true;
            }
          }
        });
      }
    });
};

//图片预览
const showPreview = (images, index) => {
  showImagePreview({
    images: images,
    startPosition: index
  })
}


const getCheck = () => {
  request.get(`/plugin/decheck/api/security/token/${state.chainId}/${state.chainAddress}`).then((res) => {
    if (res != null) {
      state.checkInfo = res
      holdPer()
      poolPer()
    } else {
      state.checkInfo = {}
    }
  })
}

const holdPer = () => {
  if (state.checkInfo.holders != undefined) {
    let a = state.checkInfo.holders.reduce((sumData, key) => {
      return sumData + Number(key.percent)
    }, 0);
    state.holdPer = (a * 100).toFixed(2)
  }
}

const poolPer = () => {
  if (state.checkInfo.lp_holders != undefined) {
    let sum = 0;
    state.checkInfo.lp_holders.forEach(el => {
      if (el.is_locked == 1) {
        sum = sum + el.percent
      }
    });
    state.poolPer = Number((sum * 100).toFixed(2))
  }
}

const showMore = (type) => {
  if (type == 1) {
    state.holderMore == 3 ? state.holderMore = 10 : state.holderMore = 3
  } else {
    state.poolMore == 3 ? state.poolMore = 10 : state.poolMore = 3
  }
}

//0:state2  1:state1  unknown:state3
//#FF5353 #FFB524 #1cb071
const listOrder = [
  { key: 'is_honeypot', grade: 1, color1: '#FF5353', color0: '#1cb071' },
  { key: 'is_open_source', grade: 3, color1: '#1cb071', color0: '#FF5353' },
  { key: 'is_proxy', grade: 2, color1: '#FFB524', color0: '#1cb071' },
  { key: 'owner_change_balance', grade: 1, color1: '#FF5353', color0: '#1cb071' },
  { key: 'slippage_modifiable', grade: 1, color1: '#FF5353', color0: '#1cb071' },
  { key: 'is_whitelisted', grade: 2, color1: '#FFB524', color0: '#1cb071' },
  { key: 'is_blacklisted', grade: 2, color1: '#FFB524', color0: '#1cb071' },
  { key: 'is_mintable', grade: 2, color1: '#FFB524', color0: '#1cb071' },
  { key: 'can_take_back_ownership', grade: 1, color1: '#FF5353', color0: '#1cb071' },
  { key: 'hidden_owner', grade: 1, color1: '#FF5353', color0: '#1cb071' },
  { key: 'selfdestruct', grade: 1, color1: '#FF5353', color0: '#1cb071' },
  { key: 'external_call', grade: 2, color1: '#FFB524', color0: '#1cb071' },
  { key: 'cannot_buy', grade: 2, color1: '#FFB524', color0: '#1cb071' },
  { key: 'transfer_pausable', grade: 1, color1: '#FF5353', color0: '#1cb071' },
  { key: 'is_in_dex', grade: 4, color1: '#1cb071', color0: '#FFB524' },
  { key: 'cannot_sell_all', grade: 2, color1: '#FFB524', color0: '#1cb071' },
  { key: 'is_anti_whale', grade: 2, color1: '#FFB524', color0: '#1cb071' },
  { key: 'trading_cooldown', grade: 2, color1: '#FFB524', color0: '#1cb071' },
  { key: 'personal_slippage_modifiable', grade: 2, color1: '#FFB524', color0: '#1cb071' }
]

const getProject = () => {
  request.get(`/plugin/decheck/api/project/detail/${state.projectID}`).then((res) => {
    state.projectDetail = res
    if (res.tokenAddr) {
      state.tokenList = res.tokenList = Object.entries(res.tokenAddr)
      state.tokenList.forEach(el => {
        options.forEach(chianEl => {
          if (el[0] == chianEl.value) {
            el.chain = chianEl.label
          }
        })
      })
      state.chainId = state.tokenList[0][0]
      state.chainName = state.tokenList[0].chain
      state.chainAddress = state.tokenList[0][1]
    }
    if (res.website) {
      iconList[0].webSrc = res.website
    }
    if (res.socialMedia) {
      iconList.forEach((el, index) => {
        if (state.projectDetail.socialMedia[index + 1] != undefined) {
          el.webSrc = state.projectDetail.socialMedia[index + 1]
        }
      })
    }
    getCheck()
    if (store.isSign) {
      getOwnReview()
    }
  })
}

const getOwnReview = () => {
  request.get(`/plugin/decheck/api/user/review/${state.projectID}/${state.chainAddress}/helpful-top`).then(res => {
    if(res){
      state.ownReview = res
    }
  })
}

const checkDetail = () => {
  router.push({
      name: 'mbReview',
      query: { 
        id: state.ownReview.projectId,
        reviewID: state.ownReview.id
      }
  })
}

onMounted(() => {
  state.projectID = route.query.id ? route.query.id : "";
  getProject()
  reviewInfo()
})
</script>

<style scoped>
.text-hidden {
  width: 185px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

::-webkit-scrollbar {
  display: none
}

.tabItem:before {
  content: '';
  height: 4px;
  width: 32px;
  background-color: #9044FF;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  transition: all 1s ease;
}

:deep(.van-rate) {
  display: flex;
}

.linear-text {
  background-image: linear-gradient(235.07deg, #19B5E8 7.95%, #8C4CE8 91.48%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
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

.checked {
  color: #9044FF !important;
}

:deep(.van-action-sheet__content){
  padding-bottom: 32px;
}
</style>