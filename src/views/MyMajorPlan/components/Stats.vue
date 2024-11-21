<template>
    <div class="query-box">
        <el-select v-model="queryParams.t_or_e" placeholder="科目类型" style="width: 120px" clearable>
            <el-option v-for="item in ['训练', '考试']" :key="item" :label="item" :value="item" />
        </el-select>
        <el-date-picker v-model="queryParams.start_date" type="date" placeholder="开始日期" :shortcuts="shortcuts"
            value-format="YYYY-MM-DD" clearable style="width: 120px" />
        <el-date-picker v-model="queryParams.end_date" type="date" placeholder="结束日期" :shortcuts="shortcuts"
            value-format="YYYY-MM-DD" clearable style="width: 120px" />
        <el-button @click="handleSearch">搜索</el-button>
    </div>
    <BaseTable :data="data" :loading="isLoading" :columns="columns"></BaseTable>
</template>
<script setup>
import { getMajorStats } from '@/api';
import { ref } from 'vue';
import BaseTable from '@/components/BaseTable.vue';
import { userStorage } from '@/storage';
const user = userStorage.get()
const queryParams = ref({
    start_date: null,
    end_date: null,
    t_or_e: null,
    user_id: user.id
})
const isLoading = ref(false)
const data = ref([])

const columns = [
    { label: '姓名', prop: '姓名' },
    { label: '类型', prop: '类型' },
    { label: '科目', prop: '科目' },
    { label: '总次数', prop: '总次数' },
    { label: '计划总组数', prop: '计划总组数' },
    { label: '实际总组数', prop: '实际总组数' },
    { label: '总分数', prop: '总分数' },
    { label: '平均分', prop: '平均分' }
]
const handleSearch = async () => {
    isLoading.value = true
    const resp = await getMajorStats(queryParams.value)
    data.value = resp.data
    isLoading.value = false
}
</script>
<style scoped>
.query-box {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}
</style>