<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="体能训练周计划" name="weekly">
            <StaminaPlanWeekly></StaminaPlanWeekly>
        </el-tab-pane>
        <el-tab-pane label="体能训练月计划" name="monthly"></el-tab-pane>
        <el-tab-pane label="体能训练年计划" name="yearly"></el-tab-pane>
    </el-tabs>
</template>
<script setup>
import { ref } from 'vue'
import StaminaPlanWeekly from '@/components/StaminaPlanWeekly.vue';

const activeName = ref('weekly')

const handleClick = (tab, event) => {
    console.log(tab, event)
}
</script>

<style scoped></style>