<template>
    <el-card>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="体能训练计划" name="plan">
                <StaminaPlan />
            </el-tab-pane>
            <el-tab-pane label="体能训练统计" name="monthly">

            </el-tab-pane>

        </el-tabs>
    </el-card>

</template>
<script setup>
import { ref } from 'vue'

import StaminaPlan from './components/StaminaPlan.vue';
const activeName = ref('plan')

const handleClick = (tab, event) => {
    console.log(tab, event)
}
</script>

<style scoped></style>