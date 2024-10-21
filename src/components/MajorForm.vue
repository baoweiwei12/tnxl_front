<template>
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="auto" label-position="left">
        <el-form-item v-if="!props.isEdit" label="用户" prop="user_id">
            <el-select v-model="formData.user_id" filterable remote reserve-keyword placeholder="输入姓名查询"
                :remote-method="remoteMethod" :loading="loading" style="width: 240px">
                <el-option v-for="user in users" :key="user.id" :label="`${user.full_name}`" :value="user.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="培训专业" prop="major_name">
            <el-input v-model="formData.major_name" placeholder="请输入培训专业" />
        </el-form-item>
        <el-form-item label="实际从事岗位" prop="post">
            <el-input v-model="formData.post" placeholder="请输入实际从事岗位" />
        </el-form-item>
        <el-form-item label="技能水平" prop="skill_level">
            <el-input v-model="formData.skill_level" placeholder="请输入技能水平" />
        </el-form-item>
        <el-form-item label="在外培训情况" prop="training_situation">
            <el-input v-model="formData.training_situation" placeholder="请输入在外培训情况" />
        </el-form-item>
        <el-form-item label="从事岗位年限(年)" prop="years_of_service">
            <el-input v-model="formData.years_of_service" type="number" placeholder="请输入从事岗位年限" />
        </el-form-item>
        <el-form-item label="总水平" prop="level">
            <el-select v-model="formData.level" placeholder="请选择水平">
                <el-option label="未出班" :value="0" />
                <el-option label="可以上岗" :value="1" />
                <el-option label="一号班" :value="2" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button v-if="!props.isEdit" @click="handleReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, toRef, defineEmits, watch } from "vue";
import { searchUsers } from '@/api';
const users = ref([]);
const loading = ref(false);
const remoteMethod = async (keyword) => {
    loading.value = true;
    const res = await searchUsers(keyword);
    users.value = res.data;
    loading.value = false;
}

const props = defineProps({
    initialData: {
        type: Object,
        default: () => ({}),
    },
    isEdit: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['submit'])

const formData = ref({});

watch(
    () => props.initialData,
    (newData) => {
        if (newData) {
            formData.value = { ...formData.value, ...newData };
        }
    },
    { immediate: true }
)
const formRef = ref(null);

const rules = {
    user_id: [{ required: true, message: '请选择用户', trigger: 'change' }],
    major_name: [{ required: true, message: '请输入培训专业', trigger: 'blur' }],
    post: [{ required: true, message: '请输入实际从事岗位', trigger: 'blur' }],
    skill_level: [{ required: true, message: '请输入技能水平', trigger: 'blur' }],
    training_situation: [{ required: true, message: '请输入在外培训情况', trigger: 'blur' }],
    years_of_service: [{ required: true, message: '请输入从事岗位年限', trigger: 'blur' }],
    level: [{ required: true, message: '请选择总体水平', trigger: 'change' }],
}

const handleSubmit = () => {
    formRef.value.validate(valid => {
        if (valid) {
            emit('submit', formData.value)
        } else {
            return false
        }
    })
}
const handleReset = () => {
    formData.value = {};
    formRef.value.resetFields();
}
</script>