<template>
    <el-select :model-value="modelValue" @update:model-value="updateValue" placeholder="请选择科目" clearable filterable
        style="width: 200px;">
        <el-option v-for="item in subjectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import { getAllStudySubjects } from "@/api/qa_system.js"; // 需要根据你的项目路径调整

// 接收父组件传递的 modelValue
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: null
    }
});

// 发送更新事件给父组件
const emit = defineEmits(['update:modelValue']);

// 存储科目选项
const subjectOptions = ref([]);

// 从接口获取科目选项
const fetchSubjectOptions = async () => {
    try {
        const response = await getAllStudySubjects();
        subjectOptions.value = response.data.map(item => ({
            label: item.name,
            value: item.id
        }));
    } catch (error) {
        console.error("获取科目选项失败:", error);
    }
};

// 调用接口获取选项
onMounted(fetchSubjectOptions);

// 更新父组件的 modelValue
const updateValue = (value) => {
    emit('update:modelValue', value);
};
</script>
