<template>
    <BaseTable :data="props.data" :loading="props.loading" :columns="columns" actionSlot="true">
        <template #score="{ scope }">
            <el-tag type="danger" v-if="scope.row.inProgress">请先完成答题</el-tag>
            <div v-else>{{ scope.row.score }}分</div>

        </template>
        <template #actions="{ scope }">
            <el-button v-if="scope.row.inProgress" type="primary" size="small"
                @click="answer(scope.row)">继续答题</el-button>
        </template>
    </BaseTable>
</template>

<script setup>
import { ref } from 'vue'
import BaseTable from '@/components/BaseTable.vue';

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
    { label: '科目', prop: 'subject_name' },
    { label: '类型', prop: 'type' },
    { label: '结束时间', prop: 'start_at', isTime: true },
    { label: '结束时间', prop: 'end_at', isTime: true },
    { label: '成绩', prop: 'score', slot: 'score' },
]
const emit = defineEmits(['answer'])

const answer = (row) => {

    emit('answer', row)
}

</script>
