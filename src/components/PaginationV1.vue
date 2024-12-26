<template>
    <el-pagination size="small" style="margin-top: 10px;" v-if="total > 0" :current-page="props.pagination.currentPage"
        :page-size="props.pagination.pageSize" :total="props.total" @current-change="handlePageChange"
        layout="total, prev, pager, next, jumper, sizes" :page-sizes="pagination.pageSizes"
        @size-change="handleSizeChange" />
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['page-change', 'size-change'])

const props = defineProps({
    total: {
        type: Number,
        default: 0
    },
    pagination: {
        type: Object,
        default: () => ({})
    }
})

const handlePageChange = (page) => {
    emit('page-change', page)
}

const handleSizeChange = (size) => {
    emit('size-change', size)
}
</script>
