<template>
    <el-form :model="formData" :rules="rules" ref="userForm" label-width="auto" label-position="left">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>



        <!-- 用户角色 -->
        <el-form-item label="用户角色" prop="role">
            <el-select v-model="formData.role" placeholder="请选择用户角色">
                <el-option label="群管理员" value="group_admin" />
                <el-option label="普通用户" value="user" />
            </el-select>
        </el-form-item>

        <!-- 姓名 -->
        <el-form-item label="姓名" prop="full_name">
            <el-input v-model="formData.full_name" placeholder="请输入姓名" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" type="password" />
        </el-form-item>
        <!-- 等级 -->
        <el-form-item label="等级" prop="level">
            <el-input v-model="formData.level" placeholder="请输入等级" />
        </el-form-item>

        <!-- 岗位 -->
        <el-form-item label="岗位" prop="post">
            <el-input v-model="formData.post" placeholder="请输入岗位" />
        </el-form-item>

        <!-- 职务 -->
        <el-form-item label="职务" prop="duty">
            <el-input v-model="formData.duty" placeholder="请输入职务" />
        </el-form-item>

        <!-- 群组 -->
        <el-form-item label="群组" prop="group_id">
            <el-select clearable placeholder="请选择群组" v-model="formData.group_id">
                <el-option v-for="group in groups" :key="group.id" :label="group.name" :value="group.id" />
            </el-select>
        </el-form-item>

        <!-- 生日 -->
        <el-form-item label="生日" prop="birthday">
            <el-date-picker v-model="formData.birthday" type="date" placeholder="选择生日" />
        </el-form-item>

        <!-- 上岗年月 -->
        <el-form-item label="上岗年月" prop="employday">
            <el-date-picker v-model="formData.employday" type="date" placeholder="选择上岗年月" />
        </el-form-item>

        <!-- 政治面貌 -->
        <el-form-item label="政治面貌" prop="political">
            <el-select v-model="formData.political" placeholder="请选择政治面貌">
                <el-option label="群众" value="0" />
                <el-option label="团员" value="1" />
                <el-option label="党员" value="2" />
            </el-select>
        </el-form-item>

        <!-- 前专业 -->
        <el-form-item label="前专业" prop="exmajor">
            <el-input v-model="formData.exmajor" placeholder="请输入前专业" />
        </el-form-item>

        <!-- 技能水平 -->
        <el-form-item label="技能水平" prop="skill_level">
            <el-input v-model="formData.skill_level" placeholder="请输入技能水平" />
        </el-form-item>

        <!-- 是否骨干 -->
        <el-form-item label="是否骨干" prop="is_core">
            <el-switch v-model="formData.is_core" active-text="是" inactive-text="否" />
        </el-form-item>

        <el-form-item>
            <el-button @click="resetForm">取消</el-button>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits, onMounted } from 'vue';
import { getGroups } from '@/api';
const props = defineProps({
    initialData: {
        type: Object,
        default: () => ({}),
    },
});

const groups = ref([]);
const fetchGroups = async () => {
    const res = await getGroups();
    groups.value = res.data;
};

onMounted(() => {
    fetchGroups();
})



const emit = defineEmits(['submit']);

const formData = ref({
    id: null,
    username: '',
    password: '',
    role: '',
    group_id: null,
    full_name: '',
    level: '',
    post: '',
    duty: '',
    birthday: '',
    employday: '',
    political: null,
    exmajor: '',
    skill_level: '',
    is_core: false,
});

// Watch for changes in initialData and update formData accordingly
watch(
    () => props.initialData,
    (newData) => {
        if (newData) {
            formData.value = { ...formData.value, ...newData };
        }
    },
    { immediate: true }
);

const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    // password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    full_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    role: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
};

const userForm = ref(null);

const resetForm = () => {
    userForm.value.resetFields();
};

const handleSubmit = () => {
    userForm.value.validate((valid) => {
        if (valid) {
            let filteredData = {};
            const fields = Object.keys(formData.value); // 获取 formData.value 中的所有键

            fields.forEach(field => {
                const value = formData.value[field];
                if (value != null && value !== '') {
                    filteredData[field] = value; // 只将有效的值添加到 filteredData
                }
            });
            emit('submit', filteredData); // 提交过滤后的数据
        } else {
            console.log('表单验证失败');
        }
    });
};

</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
