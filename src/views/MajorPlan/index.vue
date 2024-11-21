<template>
    <el-card>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="专业训练计划" name="0">
                <MajorPlan />
            </el-tab-pane>
            <el-tab-pane label="专业训练统计" name="1">
                <Stats />
            </el-tab-pane>
            <el-tab-pane label="专业训练可视化" name="2">
                <LineChart />
            </el-tab-pane>

        </el-tabs>
    </el-card>

</template>
<script setup>
import { ref } from 'vue'
import LineChart from './components/LineChart.vue';

import MajorPlan from './components/MajorPlan.vue';
import Stats from './components/Stats.vue';
const activeName = ref('0')

const handleClick = (tab, event) => {
    console.log(tab, event)
}
</script>

<style scoped></style>