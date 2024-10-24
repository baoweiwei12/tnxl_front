<template>
    <el-descriptions title="专业掌握信息" border>
        <el-descriptions-item label="已掌握专业列表">

            <el-tag v-for="(major, index) in professionalData.major_list" :key="index" style="margin-right: 1px;">
                {{ major }}
            </el-tag>

        </el-descriptions-item>
        <el-descriptions-item label="双一水平">
            <el-tag :type="getLevelType(professionalData.level)">
                {{ getLevelLabel(professionalData.level) }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ professionalData.created_at }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ professionalData.updated_at }}</el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    professionalData: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

const getLevelLabel = (level) => {
    switch (level) {
        case 0:
            return '无专业'
        case 1:
            return '单专业'
        case 2:
            return '双专业'
        case 3:
            return '三专业'
        case 4:
            return '四专业及以上'
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
            return 'info'
        case 3:
            return 'primary'
        case 4:
            return 'success'
        default:
            return ''
    }
}
</script>
