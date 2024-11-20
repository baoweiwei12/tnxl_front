<template>
    <el-table v-loading="props.loading" :data="props.data" style="width: 100%" size="small" border>
        <el-table-column prop="full_name" label="姓名" />
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="subject" label="科目" />
        <el-table-column prop="time" label="时间" />
        <el-table-column prop="training_or_examination" label="类型" />
        <el-table-column prop="plan_time" label="计划组数" />
        <el-table-column prop="actual_time" label="实际组数" />
        <el-table-column prop="score" label="成绩" />
        <el-table-column label="操作" width="180" align="center">
            <template v-slot="scope">
                <el-button size="mini" @click="openEditDrawer(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['open-edit', 'delete'])


const openEditDrawer = (row) => {
    emit('open-edit', row)
}

const handleDelete = (row) => {
    emit('delete', row)
}
</script>
