<template>
    <search-box :query-params="queryParams" @search="handleSearch" @open-add="openAddDrawer" />
    <data-table :loading="loading" :data="data" @edit="openEditDrawer" @delete="handleDelete" />
    <pagination :pagination="pagination" :total="total" @page-change="handlePageChange"
        @size-change="handleSizeChange" />
    <drawer-form :form="form" :is-edit="isEdit" :drawer-visible="drawerVisible" @submit="handleSubmit"
        @close="handleCloseDrawer" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBox from './SearchBox.vue'
import DataTable from './DataTable.vue'
import Pagination from '../../../components/Pagination.vue'
import DrawerForm from './DrawerForm.vue'
import { getShuangyiPlans, addShuangyiPlan, editShuangyiPlan, deleteShuangyiPlan } from '@/api';
import { ElMessage } from 'element-plus'


const queryParams = ref({
    full_name: null,
    start_date: null,
    end_date: null
})

const loading = ref(false)
const data = ref([])
const total = ref(0)
const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100]
})
const drawerVisible = ref(false)
const form = ref({})

const isEdit = ref(false)
onMounted(() => {
    fetchShuangyiPlans()
})
const handleSearch = async (params) => {
    fetchShuangyiPlans()
}

const fetchShuangyiPlans = async () => {
    try {
        loading.value = true
        const resp = await getShuangyiPlans({
            page: pagination.value.currentPage,
            per_page: pagination.value.pageSize,
            ...queryParams.value
        })
        data.value = resp.data.data
        total.value = resp.data.total
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const handlePageChange = async (page) => {
    fetchShuangyiPlans()
}

const handleSizeChange = async (size) => {
    fetchShuangyiPlans()
}

const openAddDrawer = () => {
    isEdit.value = false
    form.value = {}
    drawerVisible.value = true
}

const openEditDrawer = (row) => {
    isEdit.value = true
    form.value = { ...row }
    drawerVisible.value = true
}

const handleCloseDrawer = () => {
    drawerVisible.value = false
}

const handleSubmit = async () => {
    try {
        if (isEdit.value) {
            await editShuangyiPlan(form.value.id, form.value)
        } else {
            await addShuangyiPlan(form.value)
        }
        ElMessage.success('提交成功')
        fetchShuangyiPlans()
        handleCloseDrawer()
    } catch (error) {
        console.error('提交失败', error)
        ElMessage.error('提交失败')
    }
}

const handleDelete = async (row) => {
    try {
        await deleteShuangyiPlan(row.id)
        ElMessage.success('成功')
        fetchShuangyiPlans()
    } catch (error) {
        console.error('删除失败', error)
        ElMessage.error('删除失败')
    }
}
</script>
