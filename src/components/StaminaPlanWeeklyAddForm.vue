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


        <el-form-item label="月份" prop="month">
            <el-select v-model="form.month" placeholder="请选择月份">
                <el-option v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" :key="item" :label="`${item}月`"
                    :value="item" />
            </el-select>
        </el-form-item>

        <el-form-item label="周数" prop="week">
            <el-select v-model="form.week" placeholder="请选择周数">
                <el-option v-for="item in [1, 2, 3, 4]" :key="item" :label="`第${item}周`" :value="item" />
            </el-select>
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

const form = ref({});

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
    form.value = {};
    fromRef.value.resetFields();
}

const rules = {
    user_id: [{ required: true, message: '请选择用户', trigger: 'change' }],
    year: [{ required: true, message: '请输入年份', trigger: 'blur' }],
    month: [{ required: true, message: '请输入月份', trigger: 'change' }],
    week: [{ required: true, message: '请输入周数', trigger: 'change' }],
}
</script>

<style scoped>
/* 需要样式的可以自己调整 */
</style>
