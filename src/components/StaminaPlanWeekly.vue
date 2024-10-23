<template>
    <div style="display: flex;gap: 10px; margin-bottom: 10px;"> <el-input v-model="queryFullName" placeholder="姓名"
            style="width: 150px;" />
        <el-input v-model="queryYear" placeholder="年份" type="number" style="width: 150px;" />
        <el-select v-model="queryMonth" placeholder="请选择月份" style="width: 150px;">
            <el-option v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" :key="item" :label="`${item}月`"
                :value="item" />
        </el-select>
        <el-select v-model="queryWeek" placeholder="请选择周数" style="width: 150px;">
            <el-option v-for="item in [1, 2, 3, 4]" :key="item" :label="`第${item}周`" :value="item" />
        </el-select>
        <el-button @click="fetchPlans" style="width: 100px;">搜索</el-button>
        <el-button @click="addStaminPlanWeeklyDialogVisible = true" style="width: 100px;">添加周计划</el-button>
    </div>


    <StaminaPlanWeeklyTable :data="data" :loading="loading" @edit="handleEdit" @delete="handleDelete">
    </StaminaPlanWeeklyTable>
    <el-dialog title="添加周计划" v-model="addStaminPlanWeeklyDialogVisible">
        <StaminaPlanWeeklyAddForm @submit="handleAddStaminPlanWeeklySubmit" />
    </el-dialog>

    <el-dialog fullscreen v-model="editDialogVisible">
        <StaminaPlanWeeklyCard :data="weeklyPlan"></StaminaPlanWeeklyCard>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { getStaminPlanWeekly, addStaminPlanWeekly, deleteStaminPlanWeekly } from '@/api';
import StaminaPlanWeeklyAddForm from '@/components/StaminaPlanWeeklyAddForm.vue';
import StaminaPlanWeeklyTable from '@/components/StaminaPlanWeeklyTable.vue';
import { ElMessage } from 'element-plus';
import StaminaPlanWeeklyCard from '@/components/StaminaPlanWeeklyCard.vue';
const addStaminPlanWeeklyDialogVisible = ref(false)

const queryFullName = ref(null)
const queryYear = ref(null)
const queryMonth = ref(null)
const queryWeek = ref(null)
const handleAddStaminPlanWeeklySubmit = async (form) => {
    try {
        let { user_id, year, month, week } = form
        await addStaminPlanWeekly(user_id, year, month, week)
        await fetchPlans()
        ElMessage.success('添加成功')
        addStaminPlanWeeklyDialogVisible.value = false
    } catch (error) {

    }
}
const data = ref([])
const loading = ref(false)

const fetchPlans = async () => {
    try {
        loading.value = true
        const resp = await getStaminPlanWeekly({
            full_name: queryFullName.value || null,
            year: queryYear.value || null,
            month: queryMonth.value || null,
            week: queryWeek.value || null
        })
        data.value = resp.data

    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const editDialogVisible = ref(false)

const weeklyPlan = ref(null)
const handleEdit = (row) => {
    weeklyPlan.value = row
    console.log(row)
    editDialogVisible.value = true
}

const handleDelete = async (row) => {
    try {
        await deleteStaminPlanWeekly(row.id)
        data.value = data.value.filter(item => item.id !== row.id)
        ElMessage.success('删除成功')
    } catch (error) {
        console.error(error)
    }
}
</script>