<template>
    <el-table v-loading="loading" :data="data" style="width: 100%" size="small" border>
        <el-table-column prop="full_name" label="姓名" width="70"></el-table-column>
        <el-table-column prop="major_list" label="已掌握专业列表">
            <template #default="scope">
                <el-tag style="margin-right: 2px;" v-for="(item, index) in scope.row.major_list" :key="index"
                    type="primary" size="mini">{{
                    item }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="level" label="双一水平" width="180">
            <template #default="scope">
                {{ levelLbale[scope.row.level] }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180">
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


const levelLbale = ['无专业', '单专业', '双专业', '三专业', '四专业']

const data = toRef(props, "data")
const loading = toRef(props, "loading")

const emit = defineEmits(['edit'])
const handleEdit = (row) => {
    emit('edit', row)
}

</script>
