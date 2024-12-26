<template>
    <BaseTable :data="data" :loading="isLoading" :columns="columns">

        <template #full_name="{ scope }">
            <strong>{{ scope.row.full_name }}</strong>
        </template>

    </BaseTable>
</template>

<script setup>
import { ref } from 'vue'
import BaseTable from '@/components/BaseTable.vue';
import Pagination from '@/components/PaginationV1.vue';

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

const columns = [
    { label: '姓名', prop: 'full_name', slot: 'full_name' },
    { label: '日期', prop: 'date' },
    { label: '科目', prop: 'subject' },
    // { label: '时间', prop: 'time' },
    { label: '类型', prop: 'training_or_examination' },
    { label: '计划组数', prop: 'plan_time' },
    { label: '实际组数', prop: 'actual_time' },
    { label: '成绩', prop: 'score' },
]
const emit = defineEmits(['open-edit', 'delete'])


const editRow = (row) => {
    emit('edit', row)
}

const deleteRow = (row) => {
    emit('delete', row)
}
</script>
