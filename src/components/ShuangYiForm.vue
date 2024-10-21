<template>
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="auto" label-position="left">
        <el-form-item v-if="!props.isEdit" label="用户" prop="user_id">
            <el-select v-model="formData.user_id" filterable remote reserve-keyword placeholder="输入姓名查询"
                :remote-method="remoteMethod" :loading="loading" style="width: 240px">
                <el-option v-for="user in users" :key="user.id" :label="`${user.full_name}`" :value="user.id" />
            </el-select>
        </el-form-item>

        <el-form-item label="已掌握专业">
            <el-select v-model="formData.major_list" multiple collapse-tags placeholder="选择已掌握专业" style="width: 240px">
                <el-option v-for="option in options" :key="option.value" :label="option.lable" :value="option.value" />
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

const options = [
    { lable: '专业1', value: 'a' },
    { lable: '专业2', value: 'b' },
    { lable: '专业3', value: 'c' },
    { lable: '专业4', value: 'd' },
    { lable: '专业5', value: 'e' },
    { lable: '专业6', value: 'f' },
]
</script>