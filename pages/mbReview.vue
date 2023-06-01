<template>
  <div class="bg-[#070312] min-h-screen flex flex-col">
    <div class="flex items-center justify-between h-[56px] px-[1rem]">
      <img class="h-[24px] w-[24px]" src="/images/mobile/common/back.svg" @click="backHandle" />
    </div>
    <div class="flex px-[1rem]">
      <img :src="state.projectLogo" class="h-[2.5rem] w-[2.5rem] rounded-[0.5rem] mr-[0.625rem]" />
      <div>
        <p class="text-[1rem] text-[#fff] font-medium" style="font-family: Hezaedrus-Medium;">{{ state.projectName }}</p>
        <p class="text-[0.75rem] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular;">RATE THIS ITEM</p>
      </div>
    </div>
    <div class="border border-[#ffffff1c] mx-[1rem] mt-[1rem] px-[1rem] bg-[#1B1A1D] rounded-[0.75rem]">
      <van-rate v-model="state.rate" :size="28" color="#FFB524" class="justify-between my-[1rem]" />
    </div>
    <div class="bg-[#302D34] rounded-t-[0.75rem] mt-[1rem] flex-1 flex flex-col">
      <div class="flex flex-wrap px-[1.5rem] ">
        <span v-for="item in checkList" :key="item" @click="checkClick(item)"
          :class="`${item.state ? 'bg-[#fff] text-[#070312] border' : 'bg-[#302D34] text-[#fff] border-dotted border border-[#ffffff54]'}  text-[0.75rem]  py-[0.175rem] px-[0.5rem] mt-[1rem] rounded-full mr-[0.75rem]`">
          {{ item.name }}
        </span>
      </div>
      <van-field v-model="state.values" :autosize="{ minHeight: 200 }" type="textarea" class="flex-1" :border="false"
        placeholder="Write your review" />
      <div v-if="state.isVideo" class="h-[3.5rem] w-[5.5rem] rounded-[0.75rem] ml-[0.625rem] relative">
        <video class="h-[3.5rem] w-[5.5rem] rounded-[0.75rem]" :src="state.allImgList[0]">
        </video>
        <img src="/images/close.svg" class="h-[1rem] w-[1rem] cursor-pointer absolute top-0 right-0"
          @click="handleRemove(item, 0)" />
      </div>
      <div class="flex items-center overflow-x-scroll" v-else>
        <div class="h-[3.5rem] w-[3.5rem] rounded-[0.75rem] ml-[0.625rem] relative mb-[1rem]"
          v-for="(item, index) in state.allImgList" :key="index">
          <img class="h-[3.5rem] w-[3.5rem] rounded-[0.75rem] relative" :src="item" />
          <img src="/images/close.svg" class="h-[1rem] w-[1rem] cursor-pointer absolute top-0 right-0"
            @click="handleRemove(item, index)" />
        </div>
      </div>
      <div class="flex justify-between bg-[#302D34] px-[1.5rem] w-full py-[1rem] border-t border-[#ffffff1c]">
        <div>
          <van-uploader v-model="state.fileList" accept="video/*,image/*" :max-count="state.maxCount"
            :preview-image="false" :before-read="beforeRead" :after-read="readHandle">
            <img src="/images/mobile/common/picture.svg" class="h-[1.5rem] w-[1.5rem]" />
            <p class="text-[0.75rem] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular;">Pictures and videos</p>
          </van-uploader>
        </div>
        <div class="border border-[#ffffff1c] rounded-[0.75rem] h-[2.75rem] leading-[2.75rem] w-[5.625rem] text-center
             text-[#fff] submit text-[1rem] font-bold" style="font-family: Hezaedrus-bold;" @click="submitClick">
          Submit
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, onMounted } from 'vue'
import request from '@/src/utils/request'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { userStore } from "@/src/stores/user";
const store = userStore();

const state = reactive({
  rate: 1,
  projectID: '',
  projectName: '',
  projectLogo: '',
  chainID: '',
  values: '',
  fileList: [],
  allImgList: [],
  maxCount: 1,
  isVideo: false,
  reviewID: ""
})

const backHandle = () => {
  router.back()
}

const checkList = reactive([
  { name: "General", state: false },
  { name: "Contract", state: false },
  { name: "Tokenomics", state: false },
  { name: "Team", state: false },
  { name: "BUG", state: false },
  { name: "Investment", state: false },
  { name: "Other", state: false },
])



const checkClick = (item) => {
  if (checkList.filter((ele) => ele.state).length < 3 || item.state) {
    item.state = !item.state;
  } else {
    showToast({
      message: t('tagLimit'),
    })
  }
};

//上传前判断类型，推断最大数
const beforeRead = (file) => {
  if (state.allImgList.length != 0) {
    if (file.type == 'video/mp4') {
      showToast({
        message: t('videoAndImg')
      })
      return false;
    }
    return true
  } else {
    if (file.type == 'video/mp4') {
      state.maxCount = 1
      state.isVideo = true
      return true;
    } else {
      state.maxCount = 8
      return true;
    }
  }
}

//上传
const readHandle = (file) => {
  const forms = new FormData();
  if (file.length && file.length >= 2) {
    file.forEach(element => {
      forms.append('file', element.file)
    });
  } else {
    forms.append('file', file.file);
  }
  axios.post('https://test.decheck.io/decheck-apis/plugin/decheck/api/project/apply/upload', forms, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    state.allImgList.push(res.data.data.file.url)
  })
}

const handleRemove = (item, index) => {
  state.fileList.splice(index, 1);
  state.allImgList.splice(index, 1);
  state.isVideo = false
}

const submitClick = () => {
  let tagList = []
  checkList.forEach(item => {
    if (item.state == true) {
      tagList.push(item.name)
    }
  })
  if (state.values.length == 0) {
    showToast({
      message: t('reviewNull')
    })
    return false
  }
  let data = {
    content: state.values,
    projectId: state.projectID,
    projectName: state.projectName,
    chainId: state.chainID,
    tokenAddr: state.tokenAddr,
    score: state.rate,
    tags: tagList,
    type: 0,
    userId: store.userInfo.account,
    visible: true,
    attachment: state.allImgList,
    id: state.reviewID
  }
  let url;
  if (state.reviewID) {
    url = '/plugin/decheck/api/project/review/update'
  } else {
    url = '/plugin/decheck/api/project/review/add'
  }
  request({ url: url, data, method: 'post' }).then(res => {
    if (res != null) {
      showToast({
        message: t('submitSuccess'),
        type: "success"
      })
      router.back()
    }
  })
}

const getDetail = () => {
  request.get(`/plugin/decheck/api/project/review/detail/${state.reviewID}`).then(res => {
    console.log(res)
    state.rate = res.score
    state.values = res.content
    state.chainID = res.chainId
    state.tokenAddr = res.tokenAddr
    state.allImgList = state.fileList = res.attachment
    checkList.forEach(item => {
      res.tags.forEach(resItem => {
        if (item.name == resItem) {
          item.state = true
        }
      })
    })
    request.get(`/plugin/decheck/api/project/detail/${res.projectId}`).then(ress => {
      state.projectLogo = ress.logo;
      state.projectName = ress.name;
      state.projectID = ress.id;
    })
  })
}

onMounted(() => {
  state.rate = route.query.rate ? Number(route.query.rate) : "1";
  state.projectID = route.query.id ? route.query.id : "";
  state.projectName = route.query.name ? route.query.name : "";
  state.projectLogo = route.query.logo ? route.query.logo : "";
  state.chainID = route.query.chainID ? route.query.chainID : "";
  state.tokenAddr = route.query.tokenAddr ? route.query.tokenAddr : "";
  state.reviewID = route.query.reviewID ? route.query.reviewID : "";
  if (state.reviewID) {
    getDetail()
  }
})


</script>

<style scoped>
:deep(.van-rate) {
  display: flex;
}

:deep(.van-cell) {
  background: #302D34;
  padding: 1.5rem;
}

:deep(.van-field__control) {
  color: #fff;
}

:deep(.van-toast) {
  background: #fff;
  color: black;
}

.submit {
  background: linear-gradient(217.97deg, #129CC8 13.89%, #56269B 77.75%);
}
</style>