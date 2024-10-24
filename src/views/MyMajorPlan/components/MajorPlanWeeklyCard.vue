<template>
    <div style="text-align: center;margin-bottom: 10px;font-size: larger;">
        <span>{{ ` ${planData.year}年${planData.month}月 第${planData.week}周 专业训练计划` }}</span>
    </div>

    <div style="display: flex;flex-wrap: wrap;gap: 10px;">
        <el-card v-for="(dayPlan, index) in planData.plan" style="max-width: 500px">
            <template #header>
                <div class="card-header">
                    <span>第{{ index + 1 }}天</span>
                </div>
            </template>
            <el-table :data="dayPlan" size="small" :span-method="objectSpanMethod" style="width: 100%; ">
                <el-table-column label="科目" prop="subject" width="110">
                </el-table-column>
                <el-table-column label="计划时间" prop="plan_time" width="65">
                </el-table-column>
                <el-table-column label="实训时间" type="number" prop="actual_time" width="65">
                </el-table-column>
            </el-table>

        </el-card>
    </div>
</template>
<script setup>
import { ref, defineProps, toRef, reactive } from 'vue'
import { ElMessage } from 'element-plus';
const props = defineProps({
    data: {
        type: Array,
        required: true,
    }
})

const planData = toRef(props, 'data')





</script>
<style scoped>
.card-header {
    text-align: center;
}
</style>