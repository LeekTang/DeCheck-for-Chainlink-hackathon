<template>
    <div class="bg-[#070312] min-h-screen">
      <mbHeader>
        <template v-slot:left>
          {{ t('Explorer') }}
        </template>
      </mbHeader>
      <mbHot></mbHot>
      <mbPor></mbPor>
      <tabBar></tabBar>
    </div>
</template>
<script setup>
import mbHeader from '@/src/components/mobile/mbHeader.vue'
import mbHot from '@/src/components/mobile/mbHotProject.vue'
import mbPor from '@/src/components/mobile/mbProject.vue'
import tabBar from '@/src/components/mobile/mbTabBar.vue'
import { useI18n } from  'vue-i18n'
const { t } = useI18n();
</script>
