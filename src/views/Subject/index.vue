<template>
    <el-card>
        <SearchBox :query-params="queryParams" @search="handleSearch" @open-add="openAddDrawer" />
        <DataTable :data="data" :loading="loading" @open-edit="openEditDrawer" @delete="handleDelete" />
        <DrawerForm :drawer-visible="drawerVisible" :is-edit="isEdit" :form="form" @submit="handleSubmit"
            @close="handleCloseDrawer" />
    </el-card>

</template>
<script setup>
import SearchBox from './components/SearchBox.vue';
import { ref, onMounted } from 'vue';
import DataTable from './components/DataTable.vue';
import DrawerForm from './components/DrawerForm.vue';
import { addSubject, editSubject, deleteSubject, getSubjects } from '@/api';
import { ElMessage } from 'element-plus';
const queryParams = ref({})
const data = ref([])
const loading = ref(false)
const drawerVisible = ref(false)
const isEdit = ref(false)
const form = ref({})
const fetchData = async () => {
    loading.value = true
    const res = await getSubjects(queryParams.value)
    data.value = res.data
    loading.value = false
}
const handleSearch = async () => {
    await fetchData()
}

const openAddDrawer = () => {
    drawerVisible.value = true
    isEdit.value = false
    form.value = {}
}

const handleCloseDrawer = () => {
    drawerVisible.value = false
}
const openEditDrawer = (record) => {
    drawerVisible.value = true
    isEdit.value = true
    form.value = record
}
const handleSubmit = async () => {
    try {

        if (isEdit.value) {
            await editSubject(form.value.id, form.value)
        } else {
            await addSubject(form.value)
        }
        await fetchData()
        handleCloseDrawer()
        ElMessage.success('提交成功')
    } catch (error) {
        console.log(error)
        ElMessage.error('提交失败')
    }
}

const handleDelete = async (row) => {
    try {
        await deleteSubject(row.id)
        ElMessage.success('成功')
        await fetchData()
    } catch (error) {
        console.error('删除失败', error)
        ElMessage.error('删除失败')
    }
}
onMounted(() => {
    fetchData()
})

</script>