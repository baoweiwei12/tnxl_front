<template>
    <div style="text-align: center;margin-bottom: 10px;font-size: larger;">
        <span>{{ ` ${planData.year}年${planData.month}月 第${planData.week}周 体能训练计划` }}</span>
    </div>

    <div style="display: flex;flex-wrap: wrap;gap: 10px;">
        <el-card v-for="(dayPlan, index) in planData.plan" style="max-width: 500px">
            <template #header>
                <div class="card-header">
                    <span>第{{ index + 1 }}天</span>
                </div>
            </template>
            <el-table :data="dayPlan" size="small" :span-method="objectSpanMethod" style="width: 100%; ">
                <el-table-column label="时段" prop="time" width="100">
                </el-table-column>
                <el-table-column label="训/考" prop="training_or_examination" width="80">

                </el-table-column>
                <el-table-column label="科目" prop="subject" width="90">

                </el-table-column>
                <el-table-column label="计划组数" prop="plan_time" width="65">

                </el-table-column>
                <el-table-column label="实训组数" type="number" prop="actual_time" width="65">

                </el-table-column>
                <el-table-column label="分数" type="number" prop="score" width="80">

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