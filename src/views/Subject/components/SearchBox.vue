<template>
    <div class="query-box">
        <el-input v-model="props.queryParams.name" placeholder="科目名称" style="width: 120px" clearable></el-input>
        <el-select v-model="props.queryParams.t_or_e" placeholder="选择科目类型" style="width: 120px" clearable>
            <el-option v-for="item in ['训练', '考试']" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="props.queryParams.belong_to" placeholder="选择科目归属" style="width: 120px" clearable>
            <el-option v-for="item in ['双一', '体能', '专业']" :key="item" :label="item" :value="item" />
        </el-select>
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
</script>

<style scoped>
.query-box {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}
</style>
