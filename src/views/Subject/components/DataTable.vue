<template>
    <el-table v-loading="props.loading" :data="props.data" style="width: 100%" size="small" border>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="科目名称" />
        <el-table-column prop="t_or_e" label="科目类别" />
        <el-table-column prop="belong_to" label="科目归属" />
        <el-table-column prop="created_at" label="创建时间">
            <template #default="{ row }">
                {{ formatDate(row.created_at) }}
            </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="更新时间">
            <template #default="{ row }">
                {{ formatDate(row.updated_at) }}
            </template>
        </el-table-column>

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
import dayjs from 'dayjs'

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

const formatDate = (date) => {
    return date ? dayjs(date).format('YYYY/MM/DD HH:mm:ss') : '-'
}
</script>
