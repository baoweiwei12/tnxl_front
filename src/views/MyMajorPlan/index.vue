<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="专业训练周计划" name="weekly">
            <MajorPlanWeekly />
        </el-tab-pane>
        <el-tab-pane label="专业训练月计划" name="monthly">
            <MajorPlanMonthly />
        </el-tab-pane>
        <el-tab-pane label="专业训练年计划" name="yearly">
            <MajorPlanYearly />
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>
import { ref } from 'vue'
import MajorPlanWeekly from './components/MajorPlanWeekly.vue';
import MajorPlanMonthly from './components/MajorPlanMonthly.vue';
import MajorPlanYearly from './components/MajorPlanYearly.vue';

const activeName = ref('weekly')

const handleClick = (tab, event) => {
    console.log(tab, event)
}
</script>

<style scoped></style>