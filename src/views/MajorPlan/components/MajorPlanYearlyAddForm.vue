<template>
    <el-form :model="form" label-width="auto" :rules="rules" ref="fromRef" label-position="left">
        <el-form-item v-if="!props.isEdit" label="用户" prop="user_id">
            <el-select v-model="form.user_id" filterable remote reserve-keyword placeholder="输入姓名查询"
                :remote-method="remoteMethod" :loading="loading" style="width: 240px">
                <el-option v-for="user in users" :key="user.id" :label="`${user.full_name}`" :value="user.id" />
            </el-select>
        </el-form-item>

        <el-form-item label="年" prop="year">
            <el-input v-model="form.year" placeholder="年份" type="number" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button v-if="!props.isEdit" @click="handleReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue';
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


// 获取当前年份
const currentYear = new Date().getFullYear();

// 设置默认的年份
const form = ref({
    year: currentYear,
});

watch(
    () => props.initialData,
    (newData) => {
        if (newData) {
            form.value = { ...form.value, ...newData };
        }
    },
    { immediate: true }
)

const fromRef = ref(null);

const handleSubmit = () => {
    fromRef.value.validate((valid) => {
        if (valid) {
            emit('submit', form.value);
        } else {
            console.log('表单验证失败');
        }
    });
}

const handleReset = () => {
    // 重置时恢复到默认的年份和月份
    form.value = {
        year: currentYear,
        month: currentMonth
    };
    fromRef.value.resetFields();
}

const rules = {
    user_id: [{ required: true, message: '请选择用户', trigger: 'change' }],
    year: [{ required: true, message: '请输入年份', trigger: 'blur' }],
}
</script>

<style scoped>
/* 需要样式的可以自己调整 */
</style>
