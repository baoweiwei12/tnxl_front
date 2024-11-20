<template>
    <div class="query-box">
        <el-input v-model="props.queryParams.full_name" placeholder="姓名" style="width: 120px" clearable></el-input>
        <el-date-picker v-model="props.queryParams.start_date" type="date" placeholder="开始日期" :shortcuts="shortcuts"
            value-format="YYYY-MM-DD" clearable />
        <el-date-picker v-model="props.queryParams.end_date" type="date" placeholder="结束日期" :shortcuts="shortcuts"
            value-format="YYYY-MM-DD" clearable />
        <el-button @click="handleSearch">搜索</el-button>
        <el-button @click="openAddDrawer" style="margin-left: 0px;">新增</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search', 'open-add'])

const props = defineProps({
    queryParams: {
        type: Object,
        default: () => ({})
    }
})

const handleSearch = () => {
    emit('search')
}

const openAddDrawer = () => {
    emit('open-add')
}

const shortcuts = [
    {
        text: '今天',
        value: new Date(),
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: '明天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: '一周前',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        },
    },

]
</script>

<style scoped>
.query-box {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}
</style>
