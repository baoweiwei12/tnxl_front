<template>
    <div style="display: flex;gap: 10px; margin-bottom: 10px;">
        <el-input v-model="queryYear" placeholder="年份" type="number" style="width: 150px;" clearable />

        <el-button @click="fetchPlans" style="width: 100px;">搜索</el-button>
        <el-button @click="addShuangYiPlanDialogVisible = true" style="width: 100px;">添加年计划</el-button>
    </div>

    <ShuangYiPlanYearlyTable :data="data" :loading="loading" @edit="handleEdit" @delete="handleDelete" />

    <el-dialog title="添加周计划" v-model="addShuangYiPlanDialogVisible">
        <ShuangYiPlanYearlyAddForm @submit="handleAddShuangYiPlanSubmit" />
    </el-dialog>

    <el-dialog fullscreen v-model="editDialogVisible">
        <ShuangYiPlanYearlyCard :data="currentPlan" />

    </el-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getMyShuangYiPlanYearly } from '@/api';
import ShuangYiPlanYearlyAddForm from './ShuangYiPlanYearlyAddForm.vue';
import ShuangYiPlanYearlyTable from './ShuangYiPlanYearlyTable.vue';
import ShuangYiPlanYearlyCard from './ShuangYiPlanYearlyCard.vue';
import { ElMessage } from 'element-plus';

const addShuangYiPlanDialogVisible = ref(false)

// 获取当前年份
const currentYear = new Date().getFullYear();
// 设置默认的年份
const queryFullName = ref(null)
const queryYear = ref(currentYear)

const data = ref([])
const loading = ref(false)

const fetchPlans = async () => {
    try {
        loading.value = true
        const resp = await getMyShuangYiPlanYearly({
            year: queryYear.value || null,
        })
        data.value = resp.data

    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const editDialogVisible = ref(false)

const currentPlan = ref(null)
const handleEdit = (row) => {
    currentPlan.value = row
    console.log(row)
    editDialogVisible.value = true
}

onMounted(() => {
    fetchPlans()
}) 
</script>