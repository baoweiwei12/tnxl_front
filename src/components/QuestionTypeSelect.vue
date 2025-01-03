<template>
    <el-select :model-value="modelValue" @update:model-value="updateValue" placeholder="请选择类型"
        :clearable="props.clearable" filterable style="width: 200px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
</template>

<script setup>
import { ref } from 'vue';

// 题型选项
const options = ref([
    { label: "单选题", value: "single_choice" },
    { label: "多选题", value: "multiple_choice" },
    { label: "判断题", value: "true_false" },
]);

// 接收父组件传递的参数
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: null
    },
    clearable: {
        type: Boolean,
        default: true
    }
});

// 发送更新事件给父组件
const emit = defineEmits(['update:modelValue']);

// 更新 modelValue
const updateValue = (value) => {
    emit('update:modelValue', value);
};
</script>
