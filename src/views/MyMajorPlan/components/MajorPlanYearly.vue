<template>
    <div style="display: flex;gap: 10px; margin-bottom: 10px;">
        <el-input v-model="queryYear" placeholder="年份" type="number" style="width: 150px;" clearable />

        <el-button @click="fetchPlans" style="width: 100px;">搜索</el-button>
        <el-button @click="addMajorPlanDialogVisible = true" style="width: 100px;">添加年计划</el-button>
    </div>

    <MajorPlanYearlyTable :data="data" :loading="loading" @edit="handleEdit" @delete="handleDelete" />

    <el-dialog title="添加周计划" v-model="addMajorPlanDialogVisible">
        <MajorPlanYearlyAddForm @submit="handleAddMajorPlanSubmit" />
    </el-dialog>

    <el-dialog fullscreen v-model="editDialogVisible">
        <MajorPlanYearlyCard :data="currentPlan" />

    </el-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getMyMajorPlanYearly } from '@/api';
import MajorPlanYearlyAddForm from './MajorPlanYearlyAddForm.vue';
import MajorPlanYearlyTable from './MajorPlanYearlyTable.vue';
import MajorPlanYearlyCard from './MajorPlanYearlyCard.vue';
import { ElMessage } from 'element-plus';

const addMajorPlanDialogVisible = ref(false)

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
        const resp = await getMyMajorPlanYearly({
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