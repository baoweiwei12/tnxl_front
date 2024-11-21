<template>
    <el-select v-model="props.subject" placeholder="请选择科目" @click="handleSubjectSelect" @change="handleSubjectChange"
        filterable clearable>
        <el-option v-for="item in subjectOptions" :key="item.id" :label="item.name" :value="item.name" />
    </el-select>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getSubjects } from '@/api'
const props = defineProps({
    subject: {
        type: String,
        default: null
    },
    t_or_e: {
        type: String,
        default: null
    },
    belong_to: {
        type: String,
        default: null
    }
})

const subjectOptions = ref([])
const handleSubjectSelect = async () => {
    subjectOptions.value = (await getSubjects({ belong_to: props.belong_to })).data
}

const emit = defineEmits(['update:subject'])

const handleSubjectChange = (value) => {
    emit('update:subject', value)
}

</script>