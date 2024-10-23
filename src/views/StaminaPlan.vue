<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="体能训练周计划" name="weekly">
            <StaminaPlanWeekly />
        </el-tab-pane>
        <el-tab-pane label="体能训练月计划" name="monthly">
            <StaminaPlanMonthly />
        </el-tab-pane>
        <el-tab-pane label="体能训练年计划" name="yearly">
            <StaminaPlanYearly />
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>
import { ref } from 'vue'
import StaminaPlanWeekly from '@/components/StaminaPlanWeekly.vue';
import StaminaPlanMonthly from '@/components/StaminaPlanMonthly.vue';
import StaminaPlanYearly from '@/components/StaminaPlanYearly.vue';

const activeName = ref('weekly')

const handleClick = (tab, event) => {
    console.log(tab, event)
}
</script>

<style scoped></style>