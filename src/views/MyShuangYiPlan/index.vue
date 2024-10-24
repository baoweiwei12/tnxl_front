<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="双一训练周计划" name="weekly">
            <ShuangYiPlanWeekly />
        </el-tab-pane>
        <el-tab-pane label="双一训练月计划" name="monthly">
            <ShuangYiPlanMonthly />
        </el-tab-pane>
        <el-tab-pane label="双一训练年计划" name="yearly">
            <ShuangYiPlanYearly />
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>
import { ref } from 'vue'
import ShuangYiPlanWeekly from './components/ShuangYiPlanWeekly.vue';
import ShuangYiPlanMonthly from './components/ShuangYiPlanMonthly.vue';
import ShuangYiPlanYearly from './components/ShuangYiPlanYearly.vue';

const activeName = ref('weekly')

const handleClick = (tab, event) => {
    console.log(tab, event)
}
</script>

<style scoped></style>