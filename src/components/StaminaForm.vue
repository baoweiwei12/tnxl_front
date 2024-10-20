<template>
    <el-form :model="form" label-width="auto" :rules="rules" ref="fromRef" label-position="left">
        <el-form-item label="用户" prop="user_id">
            <el-select v-model="form.user_id" filterable remote reserve-keyword placeholder="输入姓名查询"
                :remote-method="remoteMethod" :loading="loading" style="width: 240px">
                <el-option v-for="user in users" :key="user.id" :label="`${user.full_name}`" :value="user.id" />
            </el-select>
        </el-form-item>




        <el-form-item label="体型" prop="body_type">
            <el-input v-model="form.body_type" placeholder="请输入体型" />
        </el-form-item>

        <el-form-item label="是否通过体型测试" prop="is_pass_body_type">
            <el-switch v-model="form.is_pass_body_type" active-text="通过" inactive-text="未通过" />
        </el-form-item>

        <el-form-item label="3公里时间(秒)" prop="three_km_time">
            <el-input v-model="form.three_km_time" type="number" placeholder="请输入时间" />
        </el-form-item>

        <el-form-item label="是否通过3公里测试" prop="is_pass_three_km">
            <el-switch v-model="form.is_pass_three_km" active-text="通过" inactive-text="未通过" />
        </el-form-item>

        <el-form-item label="单杠次数" prop="horizontal_bar_times">
            <el-input v-model="form.horizontal_bar_times" type="number" placeholder="请输入次数" />
        </el-form-item>

        <el-form-item label="是否通过单杠测试" prop="is_pass_horizontal_bar">
            <el-switch v-model="form.is_pass_horizontal_bar" active-text="通过" inactive-text="未通过" />
        </el-form-item>

        <el-form-item label="仰卧起坐次数" prop="sit_ups_times">
            <el-input v-model="form.sit_ups_times" type="number" placeholder="请输入次数" />
        </el-form-item>

        <el-form-item label="是否通过仰卧起坐测试" prop="is_pass_sit_ups">
            <el-switch v-model="form.is_pass_sit_ups" active-text="通过" inactive-text="未通过" />
        </el-form-item>

        <el-form-item label="蛇行跑时间(秒)" prop="serpentine_running_time">
            <el-input v-model="form.serpentine_running_time" type="number" placeholder="请输入时间" />
        </el-form-item>

        <el-form-item label="是否通过蛇行跑测试" prop="is_pass_serpentine_running">
            <el-switch v-model="form.is_pass_serpentine_running" active-text="通过" inactive-text="未通过" />
        </el-form-item>

        <el-form-item label="是否通过双杠测试" prop="is_pass_parallel_bars">
            <el-switch v-model="form.is_pass_parallel_bars" active-text="通过" inactive-text="未通过" />
        </el-form-item>

        <el-form-item label="负重测试时间(秒)" prop="weight_test_time">
            <el-input v-model="form.weight_test_time" type="number" placeholder="请输入时间" />
        </el-form-item>

        <el-form-item label="是否通过负重测试" prop="is_pass_weight_test">
            <el-switch v-model="form.is_pass_weight_test" active-text="通过" inactive-text="未通过" />
        </el-form-item>

        <el-form-item label="是否通过木马测试" prop="is_pass_wooden_horse">
            <el-switch v-model="form.is_pass_wooden_horse" active-text="通过" inactive-text="未通过" />
        </el-form-item>

        <el-form-item label="总水平" prop="level">
            <el-select v-model="form.level" placeholder="请选择水平">
                <el-option label="不及格" :value="0" />
                <el-option label="及格" :value="1" />
                <el-option label="良好" :value="2" />
                <el-option label="优秀" :value="3" />
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits, onMounted } from 'vue';
import { searchUsers } from '@/api';

const users = ref([])
const remoteMethod = async (keyword) => {
    loading.value = true
    const res = await searchUsers(keyword)
    users.value = res.data
    loading.value = false
}
const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({ ...props.modelValue })

watch(
    () => props.modelValue,
    (newValue) => {
        form.value = { ...newValue }
    },
    { deep: true }
)

const fromRef = ref(null)

const handleSubmit = () => {
    fromRef.value.validate((valid) => {
        if (valid) {
            emit('submit', form.value)
        } else {
            console.log('表单验证失败')
        }
    })

}
const loading = ref(false)

const handleReset = () => {
    form.value = { ...props.modelValue }
    fromRef.value.resetFields()
    emit('update:modelValue', form.value)
}

const rules = {
    user_id: [{ required: true, message: '请选择用户', trigger: 'change' }],
    body_type: [{ required: true, message: '请输入体型', trigger: 'blur' }],
    is_pass_body_type: [{ required: true, message: '请选择是否通过体型测试', trigger: 'change' }],
    three_km_time: [{ required: true, message: '请输入3公里时间', trigger: 'blur' }],
    is_pass_three_km: [{ required: true, message: '请选择是否通过3公里测试', trigger: 'change' }],
    horizontal_bar_times: [{ required: true, message: '请输入单杠次数', trigger: 'blur' }],
    is_pass_horizontal_bar: [{ required: true, message: '请选择是否通过单杠测试', trigger: 'change' }],
    sit_ups_times: [{ required: true, message: '请输入仰卧起坐次数', trigger: 'blur' }],
    is_pass_sit_ups: [{ required: true, message: '请选择是否通过仰卧起坐测试', trigger: 'change' }],
    serpentine_running_time: [{ required: true, message: '请输入蛇行跑时间', trigger: 'blur' }],
    is_pass_serpentine_running: [{ required: true, message: '请选择是否通过蛇行跑测试', trigger: 'change' }],
    is_pass_parallel_bars: [{ required: true, message: '请选择是否通过双杠测试', trigger: 'change' }],
    weight_test_time: [{ required: true, message: '请输入负重测试时间', trigger: 'blur' }],
    is_pass_weight_test: [{ required: true, message: '请选择是否通过负重测试', trigger: 'change' }],
    is_pass_wooden_horse: [{ required: true, message: '请选择是否通过木马测试', trigger: 'change' }],
    level: [{ required: true, message: '请选择总水平', trigger: 'change' }],
}
</script>

<style scoped>
/* 需要样式的可以自己调整 */
</style>
