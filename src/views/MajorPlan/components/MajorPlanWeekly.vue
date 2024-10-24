<template>
    <div style="display: flex;gap: 10px; margin-bottom: 10px;">
        <el-input v-model="queryFullName" placeholder="姓名" style="width: 150px;" clearable />
        <el-input v-model="queryYear" placeholder="年份" type="number" style="width: 150px;" clearable />
        <el-select v-model="queryMonth" placeholder="请选择月份" style="width: 150px;" clearable>
            <el-option v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" :key="item" :label="`${item}月`"
                :value="item" />
        </el-select>
        <el-select v-model="queryWeek" placeholder="请选择周数" style="width: 150px;" clearable>
            <el-option v-for="item in [1, 2, 3, 4]" :key="item" :label="`第${item}周`" :value="item" />
        </el-select>
        <el-button @click="fetchPlans" style="width: 100px;">搜索</el-button>
        <el-button @click="addMajorPlanWeeklyDialogVisible = true" style="width: 100px;">添加周计划</el-button>
    </div>


    <MajorPlanWeeklyTable :data="data" :loading="loading" @edit="handleEdit" @delete="handleDelete">
    </MajorPlanWeeklyTable>
    <el-dialog title="添加周计划" v-model="addMajorPlanWeeklyDialogVisible">
        <MajorPlanWeeklyAddForm @submit="handleAddMajorPlanWeeklySubmit" />
    </el-dialog>

    <el-dialog fullscreen v-model="editDialogVisible">
        <MajorPlanWeeklyCard :data="currentPlan"></MajorPlanWeeklyCard>
    </el-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getMajorPlanWeekly, addMajorPlanWeekly, deleteMajorPlanWeekly } from '@/api';
import MajorPlanWeeklyAddForm from './MajorPlanWeeklyAddForm.vue';
import MajorPlanWeeklyTable from './MajorPlanWeeklyTable.vue';
import { ElMessage } from 'element-plus';
import MajorPlanWeeklyCard from './MajorPlanWeeklyCard.vue';


const addMajorPlanWeeklyDialogVisible = ref(false)


// 获取当前年份和月份
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
// 设置默认的年份和月份

const queryFullName = ref(null)
const queryYear = ref(currentYear)
const queryMonth = ref(currentMonth)
const queryWeek = ref(null)
const handleAddMajorPlanWeeklySubmit = async (form) => {
    try {
        let { user_id, year, month, week } = form
        await addMajorPlanWeekly(user_id, year, month, week)
        await fetchPlans()
        ElMessage.success('添加成功')
        addMajorPlanWeeklyDialogVisible.value = false
    } catch (error) {

    }
}
const data = ref([])
const loading = ref(false)

const fetchPlans = async () => {
    try {
        loading.value = true
        const resp = await getMajorPlanWeekly({
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

const currentPlan = ref(null)
const handleEdit = (row) => {
    currentPlan.value = row
    console.log(row)
    editDialogVisible.value = true
}

const handleDelete = async (row) => {
    try {
        await deleteMajorPlanWeekly(row.id)
        data.value = data.value.filter(item => item.id !== row.id)
        ElMessage.success('删除成功')
    } catch (error) {
        console.error(error)
    }
}
onMounted(() => {
    fetchPlans()
}) 
</script>