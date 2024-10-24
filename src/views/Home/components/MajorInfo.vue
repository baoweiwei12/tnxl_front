<template>
    <el-descriptions title="专业信息" border>
        <el-descriptions-item label="培训专业">
            {{ trainingData.major_name }}
        </el-descriptions-item>
        <el-descriptions-item label="实际从事岗位">
            {{ trainingData.post }}
        </el-descriptions-item>
        <el-descriptions-item label="技能水平">
            {{ trainingData.skill_level }}
        </el-descriptions-item>
        <el-descriptions-item label="在外培训情况">
            {{ trainingData.training_situation }}
        </el-descriptions-item>
        <el-descriptions-item label="从事岗位年限">
            {{ trainingData.years_of_service }} 年
        </el-descriptions-item>
        <el-descriptions-item label="总体水平">
            <el-tag :type="getLevelType(trainingData.level)">
                {{ getLevelLabel(trainingData.level) }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ trainingData.created_at }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ trainingData.updated_at }}</el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    trainingData: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

const getLevelLabel = (level) => {
    switch (level) {
        case 0:
            return '未出班'
        case 1:
            return '可以上岗'
        case 2:
            return '一号班'
        default:
            return '未知'
    }
}

const getLevelType = (level) => {
    switch (level) {
        case 0:
            return 'danger'
        case 1:
            return 'warning'
        case 2:
            return 'success'
        default:
            return ''
    }
}
</script>
