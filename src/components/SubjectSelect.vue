<template>
    <el-select v-model="props.name" filterable remote reserve-keyword placeholder="输入科目名查询"
        :remote-method="remoteMethod" :loading="loading">
        <el-option v-for="subject in subjetcs" :key="subject.id" :label="`${subject.name}`" :value="subject" />
    </el-select>
</template>

<script setup>
import { ref } from 'vue'
import { getSubjects } from '@/api'
const props = defineProps({
    name: {
        type: str,
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

const subjetcs = ref([]);
const loading = ref(false);
const remoteMethod = async (name) => {
    loading.value = true;
    const res = await getSubjects({ name, props.t_or_e, props.belong_to });
    subjetcs.value = res.data;
    loading.value = false;
}

</script>