<template>
    <el-descriptions title="体能测试结果" border>
        <el-descriptions-item label="体型">
            {{ fitnessData.body_type }}
            <el-tag size="small" :type="fitnessData.is_pass_body_type ? 'success' : 'danger'" style="margin-left: 8px;">
                {{ fitnessData.is_pass_body_type ? '通过' : '未通过' }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="3公里时间（秒）">
            {{ fitnessData.three_km_time }}
            <el-tag size="small" :type="fitnessData.is_pass_three_km ? 'success' : 'danger'" style="margin-left: 8px;">
                {{ fitnessData.is_pass_three_km ? '通过' : '未通过' }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="单杠（个数）">
            {{ fitnessData.horizontal_bar_times }}
            <el-tag size="small" :type="fitnessData.is_pass_horizontal_bar ? 'success' : 'danger'"
                style="margin-left: 8px;">
                {{ fitnessData.is_pass_horizontal_bar ? '通过' : '未通过' }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="仰卧起坐（个数）">
            {{ fitnessData.sit_ups_times }}
            <el-tag size="small" :type="fitnessData.is_pass_sit_ups ? 'success' : 'danger'" style="margin-left: 8px;">
                {{ fitnessData.is_pass_sit_ups ? '通过' : '未通过' }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="蛇行跑时间（秒）">
            {{ fitnessData.serpentine_running_time }}
            <el-tag size="small" :type="fitnessData.is_pass_serpentine_running ? 'success' : 'danger'"
                style="margin-left: 8px;">
                {{ fitnessData.is_pass_serpentine_running ? '通过' : '未通过' }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="双杠测试">
            <el-tag size="small" :type="fitnessData.is_pass_parallel_bars ? 'success' : 'danger'">
                {{ fitnessData.is_pass_parallel_bars ? '通过' : '未通过' }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="负重测试时间（秒）">
            {{ fitnessData.weight_test_time }}
            <el-tag size="small" :type="fitnessData.is_pass_weight_test ? 'success' : 'danger'"
                style="margin-left: 8px;">
                {{ fitnessData.is_pass_weight_test ? '通过' : '未通过' }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="木马测试">
            <el-tag size="small" :type="fitnessData.is_pass_wooden_horse ? 'success' : 'danger'">
                {{ fitnessData.is_pass_wooden_horse ? '通过' : '未通过' }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="总水平">
            <el-tag :type="getLevelType(fitnessData.level)">
                {{ getLevelLabel(fitnessData.level) }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ fitnessData.created_at }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ fitnessData.updated_at }}</el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    fitnessData: {
        type: Object,
        required: true,
        default: () => ({})
    }
})



const getLevelLabel = (level) => {
    switch (level) {
        case 0:
            return '不及格'
        case 1:
            return '及格'
        case 2:
            return '良好'
        case 3:
            return '优秀'
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
            return 'success'
        default:
            return ''
    }
}

</script>
