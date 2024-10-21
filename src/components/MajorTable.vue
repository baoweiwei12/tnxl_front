<template>
    <el-table v-loading="loading" :data="data" style="width: 100%" size="small" border>
        <el-table-column prop="full_name" label="姓名" width="70"></el-table-column>
        <el-table-column prop="major_name" label="培训专业" width="180" />
        <el-table-column prop="post" label="实际从事岗位" width="180" />
        <el-table-column prop="skill_level" label="技能水平" width="180" />
        <el-table-column prop="training_situation" label="在外培训情况" width="200" />
        <el-table-column prop="years_of_service" label="从事岗位年限" width="150" />
        <el-table-column prop="level" label="总体水平" width="150">
            <template #default="{ row }">
                <span v-if="row.level === 0">未出班</span>
                <span v-else-if="row.level === 1">可以上岗</span>
                <span v-else-if="row.level === 2">一号班</span>
                <span v-else>未知</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup>
import { ref, defineEmits, toRef } from "vue";
const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    }
})

const data = toRef(props, "data")
const loading = toRef(props, "loading")

const emit = defineEmits(['edit'])
const handleEdit = (row) => {
    emit('edit', row)
}

</script>
