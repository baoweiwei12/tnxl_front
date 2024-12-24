<template>
    <el-card class="group-card">
        <template #header>
            <div class="card-header">
                <span class="title">群组管理</span>
                <el-button type="primary" @click="addGroupDialogVisible = true">
                    <el-icon><Plus /></el-icon>新增群组
                </el-button>
            </div>
        </template>

        <el-table 
            v-loading="tableLoading" 
            :data="groupData" 
            style="width: 100%"
            border
            stripe
            highlight-current-row>
            <el-table-column prop="id" label="群组ID" width="120" align="center" />
            <el-table-column prop="name" label="群组名称" min-width="180" />
            <el-table-column label="操作" width="400" align="center">
                <template #default="scope">
                    <el-button 
                        type="primary" 
                        :icon="Edit"
                        size="small" 
                        @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button 
                        type="danger" 
                        :icon="Delete"
                        size="small" 
                        @click="handleDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

    <el-dialog 
        v-model="editGroupDialogVisible" 
        title="编辑群组" 
        width="30%"
        destroy-on-close>
        <el-form 
            ref="editFormRef"
            :model="formData"
            :rules="rules"
            label-width="80px">
            <el-form-item label="群组名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入群组名称"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editGroupDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog 
        v-model="addGroupDialogVisible" 
        title="新增群组" 
        width="30%"
        destroy-on-close>
        <el-form 
            ref="addFormRef"
            :model="formData"
            :rules="rules"
            label-width="80px">
            <el-form-item label="群组名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入群组名称"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addGroupDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddSubmit">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getGroups, editGroup, addGroup } from '@/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Delete, Plus } from '@element-plus/icons-vue'

const tableLoading = ref(false)
const groupData = ref([])
const editGroupDialogVisible = ref(false)
const addGroupDialogVisible = ref(false)
const editFormRef = ref(null)
const addFormRef = ref(null)

const formData = ref({
    name: ''
})

const rules = {
    name: [
        { required: true, message: '请输入群组名称', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ]
}

const fetchGroups = async () => {
    tableLoading.value = true
    try {
        const res = await getGroups()
        groupData.value = res.data
    } catch (error) {
        ElMessage.error('获取群组列表失败')
    } finally {
        tableLoading.value = false
    }
}

const handleEdit = (group) => {
    editGroupDialogVisible.value = true
    formData.value = { ...group }
}

const handleDelete = (group) => {
    ElMessageBox.confirm(
        `确认删除群组 "${group.name}" 吗？`,
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // 这里添加删除API调用
        // 该功能还未完成
        ElMessage.success('删除成功')
        fetchGroups()
    }).catch(() => {})
}

const handleSubmit = async () => {
    if (!editFormRef.value) return
    
    await editFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                await editGroup(formData.value.id, formData.value)
                ElMessage.success('修改成功')
                editGroupDialogVisible.value = false
                formData.value = {}
                fetchGroups()
            } catch (error) {
                ElMessage.error('修改失败')
            }
        }
    })
}

const handleAddSubmit = async () => {
    if (!addFormRef.value) return
    
    await addFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                await addGroup(formData.value)
                ElMessage.success('添加成功')
                addGroupDialogVisible.value = false
                formData.value = {}
                fetchGroups()
            } catch (error) {
                ElMessage.error('添加失败')
            }
        }
    })
}

onMounted(() => {
    fetchGroups()
})
</script>

<style scoped>
.group-card {
    margin: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    font-size: 18px;
    font-weight: bold;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

:deep(.el-card__header) {
    padding: 15px 20px;
    border-bottom: 1px solid var(--el-border-color-light);
    background-color: var(--el-color-primary-light-9);
}
</style>