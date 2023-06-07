<template>
    <van-sticky position="bottom">
        <van-tabbar route :border="false" active-color="white" inactive-color="rgba(255, 255, 255, 0.6)" style="height: 56px;">
            <van-tabbar-item replace to="/" style="font-family: Hezaedrus-Bold;">{{ t('Explorer') }}
                <template #icon="props">
                    <img :src="props.active ? icon.explorerActive : icon.explorer" style="height: 32px; width: 32px;"/>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mbCheck" style="font-family: Hezaedrus-Bold;">{{ t('Check') }}
                <template #icon="props">
                    <img :src="props.active ? icon.checkActive : icon.check" style="height: 32px; width: 32px;"/>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mbDao" style="font-family: Hezaedrus-Bold;">DAO
                <template #icon="props">
                    <img :src="props.active ? icon.daoActive : icon.dao" style="height: 32px; width: 32px;"/>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mbProfile" style="font-family: Hezaedrus-Bold;">{{ t('profile') }}
                <template #icon="props">
                    <img :src="props.active ? icon.reviewActive : icon.review" style="height: 32px; width: 32px;"/>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </van-sticky>
</template>
<script setup>
import { useI18n } from  'vue-i18n'
const { t } = useI18n();

const icon = {
    check: '/images/mobile/common/check.svg',
    checkActive: '/images/mobile/common/check-active.svg',
    dao: '/images/mobile/common/dao.svg',
    daoActive: '/images/mobile/common/dao-active.svg',
    explorer: '/images/mobile/common/explorer.svg',
    explorerActive: '/images/mobile/common/explorer-active.svg',
    review: '/images/mobile/common/review.svg',
    reviewActive: '/images/mobile/common/review-active.svg',
}
</script>
<style scoped>
:deep(.van-tabbar-item) {
    background: #302D34;
}
</style>