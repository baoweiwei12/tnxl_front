<template>

    <el-button @click="addGroupDialogVisible = true" style="margin-bottom:10px ;">新增群组</el-button>

    <el-table v-loading="tableLoading" :data="groupData" size="small" border>
        <el-table-column prop="id" label="群组ID" width="120" />
        <el-table-column prop="name" label="群组名" width="120" />

        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>



    <el-dialog v-model="editGroupDialogVisible" width="30%" title="编辑群组">
        <el-form data="formData">
            <el-form-item label="群组名">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog v-model="addGroupDialogVisible" width="30%" title="新增群组">
        <el-form data="formData">
            <el-form-item label="群组名">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item>
                <el-button @click="handleAddSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getGroups, editGroup, addGroup } from '@/api';
import { ElMessage } from 'element-plus';
const tableLoading = ref(false)
const groupData = ref([])

const fetchGroups = async () => {
    tableLoading.value = true
    const res = await getGroups()
    groupData.value = res.data
    tableLoading.value = false
}
onMounted(() => {
    fetchGroups()
})

const editGroupDialogVisible = ref(false)

const formData = ref({
})

const addGroupDialogVisible = ref(false)
const handleEdit = (group) => {
    editGroupDialogVisible.value = true
    formData.value = group
}
const handleSubmit = async () => {
    try {
        await editGroup(formData.value.id, formData.value)
        editGroupDialogVisible.value = false
        formData.value = {}
        ElMessage.success('修改成功')
        fetchGroups()

    } catch (error) {
        console.log(error)
    }

}
const handleAddSubmit = async () => {
    try {
        await addGroup(formData.value)
        addGroupDialogVisible.value = false
        formData.value = {}
        ElMessage.success('添加成功')
        fetchGroups()

    } catch (error) {
        console.log(error)
    }
}
</script>