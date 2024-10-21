<template>
    <el-dialog title="录入专业信息" v-model="addMajorDialogVisible">
        <MajorForm @submit="handleAddSubmit"></MajorForm>
    </el-dialog>
    <el-dialog title="修改专业信息" v-model="editMajorDialogVisible">
        <MajorForm is-edit="true" :initial-data="editData" @submit="handleEditSubmit"></MajorForm>
    </el-dialog>
    <div class="header">
        <el-input v-model="queryFullName" placeholder="输入姓名搜索" style="width: 150px; margin-right: 10px;"></el-input>
        <el-select v-model="queryLevel" placeholder="请选择专业等级" clearable style="width: 150px; margin-right: 10px;">
            <el-option label="未出班" value="0"></el-option>
            <el-option label="可以上岗" value="1"></el-option>
            <el-option label="一号班" value="2"></el-option>
        </el-select>
        <el-button @click="fetchMajorInfo">搜索</el-button>
        <el-button @click="addMajorDialogVisible = true">录入专业信息</el-button>
    </div>

    <MajorTable :data="data" :loading="loading" @edit="handleEdit"></MajorTable>
    <el-pagination size="small" style="margin-top: 10px;" v-if="total > 0" :current-page="pagination.currentPage"
        :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange"
        layout="total, prev, pager, next, jumper, sizes" :page-sizes="pagination.pageSizes"
        @size-change="handleSizeChange" />
</template>
<script setup>
import MajorForm from '@/components/MajorForm.vue';
import MajorTable from '@/components/MajorTable.vue';
import { ref, onMounted } from 'vue';
import { addMajorInfo, getMajorInfo, editMajorInfoByUserId } from '@/api';
import { ElMessage } from 'element-plus';

onMounted(() => {
    fetchMajorInfo()
})
const addMajorDialogVisible = ref(false);
const handleAddSubmit = async (data) => {
    try {
        await addMajorInfo(data)
        await fetchMajorInfo()
        ElMessage.success("录入成功")
        addMajorDialogVisible.value = false
    } catch (error) {
        console.error(error)
        ElMessage.error(JSON.stringify(error.response?.data?.detail))
    }

};



const data = ref([]);
const loading = ref(false);
const total = ref(0);

const queryFullName = ref(null);
const queryLevel = ref(null);
const fetchMajorInfo = async () => {
    try {
        loading.value = true;

        const res = await getMajorInfo({
            page: pagination.value.currentPage,
            page_size: pagination.value.pageSize,
            full_name: queryFullName.value || null,
            level: queryLevel.value || null
        })
        data.value = res.data.major_info
        total.value = res.data.total
    } catch (error) {
        console.error(error)
        ElMessage.error(JSON.stringify(error.response?.data?.detail))
    } finally {
        loading.value = false;
    }

}



const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100]
});
const handlePageChange = async (page) => {
    pagination.value.currentPage = page;
    fetchMajorInfo();
}
const handleSizeChange = async (size) => {
    pagination.value.pageSize = size;
    pagination.value.currentPage = 1;
    fetchMajorInfo();
}

const editMajorDialogVisible = ref(false);
const editData = ref(null);
const handleEdit = (row) => {
    editData.value = row;
    editMajorDialogVisible.value = true;
}
const handleEditSubmit = async (data) => {
    try {
        editMajorInfoByUserId(data.user_id, data)
        ElMessage.success("修改成功")
        editMajorDialogVisible.value = false;
    } catch (error) {
        console.error(error)
        ElMessage.error(JSON.stringify(error.response?.data?.detail))
    }

};

</script>

<style scoped>
.header {
    display: flex;
    margin-bottom: 10px;
}
</style>