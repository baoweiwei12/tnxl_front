<template>
    <StaminaInfo v-if="staminaInfoData" :fitness-data="staminaInfoData" />
    <div v-else>暂无体能信息</div>
    <el-divider />
    <MajorInfo v-if="majorInfoData" :training-data="majorInfoData" />
    <div v-else>暂无专业信息</div>
    <el-divider />
    <ShuangYiInfo v-if="shuangYiInfoData" :professional-data="shuangYiInfoData" />
    <div v-else>暂无双一信息</div>
</template>
<script setup>
import StaminaInfo from './components/StaminaInfo.vue';
import MajorInfo from './components/MajorInfo.vue';
import ShuangYiInfo from './components/ShuangYiInfo.vue';
import { getMyStaminInfo, getMyMajorInfo, getMyShuangYiInfo } from '@/api';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
const staminaInfoData = ref(null);
const fetchStaminInfo = async () => {
    try {
        const resp = await getMyStaminInfo()
        staminaInfoData.value = resp.data;
    } catch (error) {
        console.error(error);
    }

}
const majorInfoData = ref(null);

const fetchMajorInfo = async () => {
    try {
        const resp = await getMyMajorInfo()
        majorInfoData.value = resp.data;
    } catch (error) {
        console.error(error);
    }
}

const shuangYiInfoData = ref(null);
const fetchShuangYiInfo = async () => {
    try {
        const resp = await getMyShuangYiInfo()
        shuangYiInfoData.value = resp.data;
    } catch (error) {
        console.error(error);
    }
}
onMounted(() => {
    fetchStaminInfo();
    fetchMajorInfo();
    fetchShuangYiInfo();
})
</script>