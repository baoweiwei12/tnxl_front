<script setup>
import { reactive } from 'vue';

// 使用 defineProps 来定义接收的属性
const props = defineProps({
    initialQueryParams: {
        type: Object,
        default: () => ({}),
    },
});

// 使用 defineEmits 来定义事件
const emit = defineEmits(['submit']);

// 创建表单的状态
const queryParams = reactive({
    is_pass_body_type: props.initialQueryParams.is_pass_body_type || null,
    is_pass_three_km: props.initialQueryParams.is_pass_three_km || null,
    is_pass_horizontal_bar: props.initialQueryParams.is_pass_horizontal_bar || null,
    is_pass_sit_ups: props.initialQueryParams.is_pass_sit_ups || null,
    is_pass_serpentine_running: props.initialQueryParams.is_pass_serpentine_running || null,
    is_pass_parallel_bars: props.initialQueryParams.is_pass_parallel_bars || null,
    is_pass_weight_test: props.initialQueryParams.is_pass_weight_test || null,
    is_pass_wooden_horse: props.initialQueryParams.is_pass_wooden_horse || null,
    level: props.initialQueryParams.level || null,
});

// 表单提交方法，通过 emit 触发提交事件
function submitForm() {
    emit('submit', queryParams);
}
</script>

<template>
    <el-form :model="queryParams" label-width="auto" ref="fromRef" label-position="left">
        <el-form-item label="是否通过体型测试">
            <el-select v-model="queryParams.is_pass_body_type" placeholder="请选择" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否通过3公里测试">
            <el-select v-model="queryParams.is_pass_three_km" placeholder="请选择" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否通过单杠测试">
            <el-select v-model="queryParams.is_pass_horizontal_bar" placeholder="请选择" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否通过仰卧起坐测试">
            <el-select v-model="queryParams.is_pass_sit_ups" placeholder="请选择" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否通过蛇行跑测试">
            <el-select v-model="queryParams.is_pass_serpentine_running" placeholder="请选择" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否通过双杠测试">
            <el-select v-model="queryParams.is_pass_parallel_bars" placeholder="请选择" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否通过负重测试">
            <el-select v-model="queryParams.is_pass_weight_test" placeholder="请选择" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否通过木马测试">
            <el-select v-model="queryParams.is_pass_wooden_horse" placeholder="请选择" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="水平">
            <el-select v-model="queryParams.level" placeholder="请选择" clearable>
                <el-option label="不及格" :value="0"></el-option>
                <el-option label="及格" :value="1"></el-option>
                <el-option label="良好" :value="2"></el-option>
                <el-option label="优秀" :value="3"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
