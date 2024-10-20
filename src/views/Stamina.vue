<template>
    <el-drawer v-model="showSearchParams">
        <StaminaSearch :initialQueryParams="queryParams" @submit="handleSubmitSearch"></StaminaSearch>
    </el-drawer>
    <el-dialog v-model="addStaminaDialogVisible" title="体能信息录入" width="50%" align-center>
        <StaminaForm @submit="handleAddSubmit"></StaminaForm>
    </el-dialog>

    <el-dialog v-model="editStaminaDialogVisible" title="体能信息修改" width="50%" align-center>
        <StaminaForm :initial-data="editStaminaData" :is-edit="true" @submit="handleEditSubmit"></StaminaForm>
    </el-dialog>

    <div class="header">
        <el-button @click="showSearchParams = true">筛选</el-button>
        <el-button @click="addStaminaDialogVisible = true">录入体能信息</el-button>
    </div>
    <StaminaTable :data="staminaInfoData" :loading="tableLoading" @edit="handleEdit" />
    <el-pagination size="small" style="margin-top: 10px;" v-if="total > 0" :current-page="pagination.currentPage"
        :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange"
        layout="total, prev, pager, next, jumper, sizes" :page-sizes="pagination.pageSizes"
        @size-change="handleSizeChange" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import StaminaForm from '@/components/StaminaForm.vue';
import { getStaminaInfo, addStaminaInfo, editStaminaInfoByUserId } from '@/api';
import { ElMessage } from 'element-plus';
import StaminaTable from '@/components/StaminaTable.vue';
import StaminaSearch from '@/components/StaminaSearch.vue';

const editStaminaDialogVisible = ref(false)
const editStaminaData = ref(null)
const handleEdit = (row) => {

    editStaminaData.value = row
    editStaminaDialogVisible.value = true
}

const handleEditSubmit = async (data) => {
    try {
        await editStaminaInfoByUserId(editStaminaData.value.user_id, data)
        editStaminaDialogVisible.value = false
        await fetchStaminaInfo()
        ElMessage.success("修改成功")

    } catch (error) {
        console.error(error)
        ElMessage.error(JSON.stringify(error.response?.data?.detail))
    }
}


const showSearchParams = ref(false)

const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100]
});
const handlePageChange = async (page) => {
    pagination.value.currentPage = page;
    fetchStaminaInfo();
}
const handleSizeChange = async (size) => {
    pagination.value.pageSize = size;
    pagination.value.currentPage = 1;
    fetchStaminaInfo();
}

const queryParams = ref({ page: pagination.value.currentPage, per_page: pagination.value.pageSize })

const handleSubmitSearch = async (params) => {
    queryParams.value = { ...queryParams.value, ...params }
    fetchStaminaInfo()
    showSearchParams.value = false
}

const addStaminaDialogVisible = ref(false)

const staminaInfoData = ref([])
const total = ref(0)

const handleAddSubmit = async (data) => {
    try {
        await addStaminaInfo(data)
        addStaminaDialogVisible.value = false
        fetchStaminaInfo()
        ElMessage.success("录入成功")
    } catch (error) {
        console.error(error)
        ElMessage.error(JSON.stringify(error.response?.data?.detail))
    }

}
const tableLoading = ref(false)

const fetchStaminaInfo = async () => {
    try {
        tableLoading.value = true
        const res = await getStaminaInfo(queryParams.value)
        staminaInfoData.value = res.data.stamina_info
        total.value = res.data.total
    } catch (error) {
        console.error(error)
    } finally {
        tableLoading.value = false
    }
}


onMounted(() => {
    fetchStaminaInfo()
})
</script>
<style scoped>
.header {
    display: flex;
    margin-bottom: 10px;
}
</style>