<template>
    <el-card>
        <StaminaInfo v-if="staminaInfoData" :fitness-data="staminaInfoData" />
        <div v-else>暂无体能信息</div>
    </el-card>
    <el-divider />
    <el-card>
        <MajorInfo v-if="majorInfoData" :training-data="majorInfoData" />
        <div v-else>暂无专业信息</div>
    </el-card>
    <el-divider />
    <el-card>
        <ShuangYiInfo v-if="shuangYiInfoData" :professional-data="shuangYiInfoData" />
        <div v-else>暂无双一信息</div>
    </el-card>
</template>

<script setup>
import StaminaInfo from './components/StaminaInfo.vue';
import MajorInfo from './components/MajorInfo.vue';
import ShuangYiInfo from './components/ShuangYiInfo.vue';
import { getMyStaminInfo, getMyMajorInfo, getMyShuangYiInfo } from '@/api';
import { ref, onMounted } from 'vue';
import { ElLoading } from 'element-plus';

const staminaInfoData = ref(null);
const majorInfoData = ref(null);
const shuangYiInfoData = ref(null);

const fetchStaminInfo = async () => {
    const loadingInstance = ElLoading.service({ text: '加载中...', fullscreen: true });
    try {
        const resp = await getMyStaminInfo();
        staminaInfoData.value = resp.data;
    } catch (error) {
        console.error(error);
    } finally {
        loadingInstance.close(); // Close the loading instance
    }
}

const fetchMajorInfo = async () => {
    const loadingInstance = ElLoading.service({ text: '加载中...', fullscreen: true });
    try {
        const resp = await getMyMajorInfo();
        majorInfoData.value = resp.data;
    } catch (error) {
        console.error(error);
    } finally {
        loadingInstance.close(); // Close the loading instance
    }
}

const fetchShuangYiInfo = async () => {
    const loadingInstance = ElLoading.service({ text: '加载中...', fullscreen: true });
    try {
        const resp = await getMyShuangYiInfo();
        shuangYiInfoData.value = resp.data;
    } catch (error) {
        console.error(error);
    } finally {
        loadingInstance.close(); // Close the loading instance
    }
}

onMounted(() => {
    fetchStaminInfo();
    fetchMajorInfo();
    fetchShuangYiInfo();
})
</script>