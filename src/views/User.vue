<script setup>
import { ref, onMounted } from "vue";
import { getUsers, addUser, editUser, getGroups } from "@/api";
import { ElMessage } from "element-plus";
import UserForm from "../components/UserForm.vue";
const userData = ref([]);
const total = ref(0);
const queryParams = ref({
    username: null,
    full_name: null,
    is_core: null,
    political: null,
    level: null,
    skill_level: null,
});

onMounted(() => {
    fetchGroups();
    fetchUserData();
})
const tableLoading = ref(false);

const groups = ref([]);

const fetchGroups = async () => {
    const res = await getGroups();
    groups.value = res.data;
};

const fetchUserData = async () => {
    try {
        tableLoading.value = true;
        let getUsersParams = { page: pagination.value.currentPage, page_size: pagination.value.pageSize };
        const fields = Object.keys(queryParams.value);
        fields.forEach(field => {
            const value = queryParams.value[field];
            if (value != null && value !== '') {
                getUsersParams[field] = value;
            }
        });

        const res = await getUsers(getUsersParams);
        userData.value = res.data.users;
        total.value = res.data.total;
        tableLoading.value = false;
    } catch (error) {
        if (error.response?.data?.detail) {
            ElMessage.error(error.response.data.detail);
        }
        console.error(error);
    }
};

const handleSearch = async () => {
    await fetchUserData();
};

const addUserDialogVisible = ref(false);

const handleCreateUser = () => {
    addUserDialogVisible.value = true;
}
const handleCreateSubmit = async (formData) => {
    try {
        await addUser(formData);
        ElMessage.success("创建成功");
        addUserDialogVisible.value = false;
        await fetchUserData();
    } catch (error) {
        if (error.response?.data?.detail) {
            ElMessage.error(JSON.stringify(error.response.data.detail));
        }
        console.error(error);
    }
}

const editUserDialogVisible = ref(false);

const handleEditSubmit = async (formData) => {
    try {
        await editUser(formData.id, formData);
        ElMessage.success("编辑成功");
        editUserDialogVisible.value = false;
        await fetchUserData();
    } catch (error) {
        if (error.response?.data?.detail) {
            ElMessage.error(JSON.stringify(error.response.data.detail));
        }
        console.error(error);
    }
}
const currentUser = ref(null);
const handleEdit = (row) => {
    currentUser.value = row;
    editUserDialogVisible.value = true;
}


const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100]
});

const handlePageChange = async (page) => {
    pagination.value.currentPage = page;
    fetchUserData();
}
const handleSizeChange = async (size) => {
    pagination.value.pageSize = size;
    pagination.value.currentPage = 1;
    fetchUserData();
}
</script>
<template>
    <el-dialog v-model="addUserDialogVisible" title="新增用户" width="50%" align-center>
        <UserForm @submit="handleCreateSubmit"></UserForm>
    </el-dialog>
    <el-dialog v-model="editUserDialogVisible" title="修改用户信息" width="50%" align-center>
        <UserForm :initial-data="currentUser" @submit="handleEditSubmit"></UserForm>
    </el-dialog>

    <el-card style="margin-bottom: 10px;">
        <div class="search-box">
            <el-input v-model="queryParams.username" placeholder="用户名" style="width: 120px"></el-input>
        <el-input v-model="queryParams.full_name" placeholder="姓名" style="width: 120px"></el-input>
        <el-input v-model="queryParams.skill_level" placeholder="等级" style="width: 120px"></el-input>
        <el-input v-model="queryParams.level" placeholder="技能等级" style="width: 120px"></el-input>
        <el-select v-model="queryParams.is_core" clearable placeholder="是否骨干" style="width: 120px">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
        </el-select>
        <el-select v-model="queryParams.political" clearable placeholder="政治面貌" style="width: 120px">
            <el-option label="群众" value="0"></el-option>
            <el-option label="团员" value="1"></el-option>
            <el-option label="党员" value="2"></el-option>
        </el-select>

        <el-button @click="handleSearch">搜索用户</el-button>
        <el-button @click="handleCreateUser" style="margin-left: 0px;">新建用户</el-button>

        </div>
    </el-card>
    <el-card>
    <el-table v-loading="tableLoading" :data="userData" style="width: 100%" size="small" border>
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column label="角色" width="120">
            <template #default="scope">
                <el-tag v-if="scope.row.role === 'admin'" type="danger">超级管理员</el-tag>
                <el-tag v-if="scope.row.role === 'group_admin'" type="success">群管理员</el-tag>
                <el-tag v-if="scope.row.role === 'user'">用户</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="full_name" label="姓名" width="150" />
        <el-table-column prop="group_id" label="群组" width="100">
            <template #default="scope">
                {{ groups.find(group => group.id === scope.row.group_id)?.name }}
            </template>
        </el-table-column>
        <el-table-column prop="level" label="等级" width="100" />
        <el-table-column prop="post" label="岗位" width="120" />
        <el-table-column prop="duty" label="职务" width="120" />
        <el-table-column prop="birthday" label="出生日期" width="150" />
        <el-table-column prop="employday" label="上岗年月" width="150" />
        <el-table-column prop="political" label="政治面貌" width="120">

            <template #default="scope">
                <el-tag v-if="scope.row.political === 0" type="danger">群众</el-tag>
                <el-tag v-if="scope.row.political === 1" type="success">团员</el-tag>
                <el-tag v-if="scope.row.political === 2">党员</el-tag>
            </template>

        </el-table-column>
        <el-table-column prop="exmajor" label="前岗位" width="120" />
        <el-table-column prop="skill_level" label="技能等级" width="120" />
        <el-table-column prop="is_core" label="是否骨干" width="100">
            <template v-slot="scope">
                {{ scope.row.is_core ? '是' : '否' }}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
        </el-table-column>

    </el-table>
    <el-pagination size="small" style="margin-top: 10px;" v-if="total > 0" :current-page="pagination.currentPage"
        :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange"
        layout="total, prev, pager, next, jumper, sizes" :page-sizes="pagination.pageSizes"
            @size-change="handleSizeChange" />
    </el-card>


</template>
<style scoped>
.search-box {
    display: flex;
    gap: 10px;

}
</style>