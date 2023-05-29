<template>
    <van-sticky position="bottom">
        <van-tabbar route active-color="white" inactive-color="rgba(255, 255, 255, 0.6)">
            <van-tabbar-item replace to="/">Explorer
                <template #icon="props">
                    <img :src="props.active ? icon.explorerActive : icon.explorer" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mbCheck">Check
                <template #icon="props">
                    <img :src="props.active ? icon.checkActive : icon.check" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mbDao">DAO
                <template #icon="props">
                    <img :src="props.active ? icon.daoActive : icon.dao" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mbReviews">Reviews
                <template #icon="props">
                    <img :src="props.active ? icon.reviewActive : icon.review" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </van-sticky>
</template>
<script setup>

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