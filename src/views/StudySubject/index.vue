<template>
    <div class="app-container">
        <el-card>
            <!-- 搜索框 -->
            <div class="search-box">
                <el-input v-model="searchKeyword" placeholder="请输入关键词搜索" style="width: 200px;" clearable
                    @clear="handleSearch">
                    <template #prefix>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
                <el-button type="primary" @click="handleSearch">
                    <el-icon>
                        <Search />
                    </el-icon>
                    搜索
                </el-button>
                <el-button type="primary" @click="handleAdd" style="margin-left: 0px;">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    新增科目
                </el-button>
            </div>

            <!-- 表格 -->
            <base-table :loading="loading" :data="tableData" :columns="columns" action-slot>
                <template #actions="{ scope }">
                    <el-button type="primary" size="small" bg text @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" bg text @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </base-table>

            <!-- 分页 -->
            <pagination :total="total" :pagination="pagination" @page-change="handlePageChange"
                @size-change="handleSizeChange" />
        </el-card>

        <!-- 表单抽屉 -->
        <base-form :drawer-visible="drawerVisible" :title="formTitle" :fields="formFields" :form-data="formData"
            :rules="formRules" @close="closeDrawer" @submit="handleSubmit" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { createStudySubject, updateStudySubject, getStudySubjects, deleteStudySubject } from '@/api/qa_system'
import BaseTable from '@/components/BaseTable.vue'
import BaseForm from '@/components/BaseForm.vue'
import Pagination from '@/components/Pagination.vue'

// 表格相关
const loading = ref(false)
const tableData = ref([])
const searchKeyword = ref('')
const total = ref(0)

const columns = [
    { label: '科目名称', prop: 'name' },
    { label: '创建时间', prop: 'created_at', isTime: true },
    { label: '更新时间', prop: 'updated_at', isTime: true }
]

// 分页相关
const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100]
})

// 表单相关
const drawerVisible = ref(false)
const formTitle = ref('新增科目')
const isEdit = ref(false)
const formData = reactive({
    name: '',
    description: ''
})

const formFields = [
    {
        label: '科目名称',
        prop: 'name',
        type: 'el-input',
        props: {
            placeholder: '请输入科目名称'
        }
    }
]

const formRules = {
    name: [
        { required: true, message: '请输入科目名称', trigger: 'blur' },
        { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
    ]
}

// 获取表格数据
const fetchData = async () => {
    loading.value = true
    try {
        const { data } = await getStudySubjects(
            searchKeyword.value,
            pagination.currentPage,
            pagination.pageSize
        )
        tableData.value = data.data
        total.value = data.total
    } catch (error) {
        console.error('获取数据失败：', error)
        ElMessage.error('获取数据失败')
    } finally {
        loading.value = false
    }
}

// 处理搜索
const handleSearch = () => {
    pagination.currentPage = 1
    fetchData()
}

// 处理分页
const handlePageChange = (page) => {
    fetchData()
}

const handleSizeChange = (size) => {
    fetchData()
}

// 处理新增
const handleAdd = () => {
    formTitle.value = '新增科目'
    isEdit.value = false
    Object.assign(formData, {
        name: '',
        description: ''
    })
    drawerVisible.value = true
}

// 处理编辑
const handleEdit = (row) => {
    formTitle.value = '编辑科目'
    isEdit.value = true
    Object.assign(formData, row)
    drawerVisible.value = true
}

// 处理删除
const handleDelete = (row) => {
    ElMessageBox.confirm('确认删除该科目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        try {
            await deleteStudySubject(row.id)
            ElMessage.success('删除成功')
            fetchData()
        } catch (error) {
            console.error('删除失败：', error)
            ElMessage.error('删除失败')
        }
    }).catch(() => { })
}

// 处理表单提交
const handleSubmit = async (formValue) => {
    try {
        if (isEdit.value === true) {
            await updateStudySubject(formData.id, formValue)
            ElMessage.success('更新成功')
        } else {
            await createStudySubject(formValue)
            ElMessage.success('创建成功')
        }
        closeDrawer()
        fetchData()
    } catch (error) {
        console.error('提交失败：', error)
        ElMessage.error('提交失败')
    }
}

// 关闭抽屉
const closeDrawer = () => {
    drawerVisible.value = false
}

// 初始化
onMounted(() => {
    fetchData()
})
</script>

<style scoped>
.app-container {
    padding: 20px;
}

.search-box {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
}

/* 移除 el-card 的边框 */
:deep(.el-card) {
    border: none;
}
</style>
