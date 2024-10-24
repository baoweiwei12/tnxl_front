<template>
    <div style="text-align: center;margin-bottom: 10px;font-size: larger;">
        <span>{{ `${planData.full_name} ${planData.year}年${planData.month}月 第${planData.week}周 专业训练计划` }}</span>
    </div>
    <el-button style="margin-bottom: 10px;" type="primary" @click="handleSave" :disabled="buttonDisabled">保存</el-button>
    <div style="display: flex;flex-wrap: wrap;gap: 10px;">
        <el-card v-for="(dayPlan, index) in planData.plan" style="max-width: 500px">
            <template #header>
                <div class="card-header">
                    <span>第{{ index + 1 }}天</span>
                </div>
            </template>
            <el-table :data="dayPlan" size="small" :span-method="objectSpanMethod" style="width: 100%; ">

                <el-table-column label="科目" prop="subject" width="110">
                    <template #default="scope">
                        <el-input v-model="scope.row.subject" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="计划时间" prop="plan_time" width="65">
                    <template #default="scope">
                        <el-input v-model="scope.row.plan_time" type="number" size="small" />
                    </template>
                </el-table-column>
                <el-table-column label="实训时间" type="number" prop="actual_time" width="65">
                    <template #default="scope">
                        <el-input v-model="scope.row.actual_time" type="number" size="small" />
                    </template>
                </el-table-column>
                <el-table-column width="50">
                    <template #default="scope">
                        <el-button size="mini" type="danger" :icon="Delete" circle
                            @click="handleDelete(index, scope.$index)" />
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-button @click="handleAdd(index)">新增</el-button>


            </template>
        </el-card>
    </div>
</template>
<script setup>
import { Delete } from '@element-plus/icons-vue'
import { ref, defineProps, toRef, reactive } from 'vue'
import { editMajorPlanWeekly } from '@/api';
import { ElMessage } from 'element-plus';
const props = defineProps({
    data: {
        type: Array,
        required: true,
    }
})

const planData = toRef(props, 'data')



const currentPlanIndex = ref(null)
const handleAdd = (index) => {
    planData.value.plan[index].push({
        time: null,
        subject: null,
        plan_time: null,
        actual_time: null,
    })
}
const buttonDisabled = ref(false)
const handleSave = async () => {
    try {
        buttonDisabled.value = true
        await editMajorPlanWeekly(planData.value.id, planData.value)
        ElMessage.success("修改成功")
    } catch (error) {
        console.error(error)
        ElMessage.error(JSON.stringify(error.response?.data?.detail))
    } finally {
        buttonDisabled.value = false
    }

}
const handleDelete = (dayIndex, planIndex) => {
    planData.value.plan[dayIndex].splice(planIndex, 1)
}

</script>
<style scoped>
.card-header {
    text-align: center;
}
</style>