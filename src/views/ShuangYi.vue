<template>
    <el-dialog title="录入专业信息" v-model="addShuangYiDialogVisible">
        <ShuangYiForm @submit="handleSubmit"></ShuangYiForm>
    </el-dialog>

    <el-dialog title="修改专业信息" v-model="editShuangYiDialogVisible">
        <ShuangYiForm is-edit="true" :initial-data="editData" @submit="handleEditSubmit"></ShuangYiForm>
    </el-dialog>

    <div style="margin-bottom: 10px;">
        <el-input v-model="searchFullName" placeholder="搜索姓名" style="width: 150px;margin-right: 10px;"></el-input>
        <el-select v-model="searchMajorList" multiple collapse-tags placeholder="选择已掌握专业" style="width: 240px"
            clearable>
            <el-option v-for="option in options" :key="option.value" :label="option.lable" :value="option.value" />
        </el-select>
        <el-select v-model="searchLevel" placeholder="请选择水平" style="width: 150px;margin-right: 10px;" clearable>
            <el-option v-for="(item, index) in levelLbale" :key="index" :label="item" :value="index">
            </el-option>
        </el-select>
        <el-button @click="fetchShuangYiInfo">搜索</el-button>
        <el-button @click="addShuangYiDialogVisible = true">录入双一信息</el-button>
    </div>


    <ShuangYiTable :data="data" :loading="loading" @edit="handleEdit"></ShuangYiTable>

    <el-pagination size="small" style="margin-top: 10px;" v-if="total > 0" :current-page="pagination.currentPage"
        :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange"
        layout="total, prev, pager, next, jumper, sizes" :page-sizes="pagination.pageSizes"
        @size-change="handleSizeChange" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import ShuangYiTable from '@/components/ShuangYiTable.vue';
import ShuangYiForm from '@/components/ShuangYiForm.vue';
import { addShuangYiInfo, editShuangYiInfoByUserId, getShuangYiInfo } from '@/api/index'
import { ElMessage } from 'element-plus';

onMounted(() => {
    fetchShuangYiInfo()
})
const addShuangYiDialogVisible = ref(false)
const handleSubmit = async (data) => {
    try {
        await addShuangYiInfo(data)
        await fetchShuangYiInfo()
        ElMessage.success("添加成功")
        addShuangYiDialogVisible.value = false;
    } catch (error) {
        console.error(error)
        ElMessage.error(JSON.stringify(error.response?.data?.detail))
    }
}

const data = ref([])
const loading = ref(false)
const total = ref(0)

const searchFullName = ref(null)
const searchLevel = ref(null)
const searchMajorList = ref([])
const fetchShuangYiInfo = async () => {
    try {
        loading.value = true
        const resp = await getShuangYiInfo({
            page: pagination.value.currentPage,
            page_size: pagination.value.pageSize,
            full_name: searchFullName.value || null,
            level: searchLevel.value || null,
            major_list: searchMajorList.value || []
        })
        data.value = resp.data.shuang_yi_info
        total.value = resp.data.total

    } catch (error) {
        console.error(error)
        ElMessage.error(JSON.stringify(error.response?.data?.detail))
    } finally {
        loading.value = false
    }
}

const options = [
    { lable: '专业1', value: 'a' },
    { lable: '专业2', value: 'b' },
    { lable: '专业3', value: 'c' },
    { lable: '专业4', value: 'd' },
    { lable: '专业5', value: 'e' },
    { lable: '专业6', value: 'f' },
]
const levelLbale = ['无专业', '单专业', '双专业', '三专业', '四专业']
const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100]
});
const handlePageChange = async (page) => {
    pagination.value.currentPage = page;
    fetchShuangYiInfo();
}
const handleSizeChange = async (size) => {
    pagination.value.pageSize = size;
    pagination.value.currentPage = 1;
    fetchShuangYiInfo();
}

const editShuangYiDialogVisible = ref(false)
const editData = ref({})
const handleEdit = (data) => {
    editData.value = data
    editShuangYiDialogVisible.value = true
}
const handleEditSubmit = async (data) => {
    try {
        await editShuangYiInfoByUserId(data.user_id, data)
        await fetchShuangYiInfo()
        ElMessage.success("修改成功")
        editShuangYiDialogVisible.value = false;
    } catch (error) {
        console.error(error)
        ElMessage.error(JSON.stringify(error.response?.data?.detail))
    }
}
</script>