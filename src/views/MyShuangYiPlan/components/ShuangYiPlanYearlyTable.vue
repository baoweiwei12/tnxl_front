<template>
    <el-table v-loading="loading" :data="data" style="width: 100%" size="small" border>
        <el-table-column prop="year" label="年份" width="180" />
        <el-table-column prop="created_at" label="创建时间" width="200" />
        <el-table-column prop="updated_at" label="修改时间" width="150" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">查看</el-button>
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
