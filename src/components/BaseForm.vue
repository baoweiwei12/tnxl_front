<template>
    <el-drawer :model-value="drawerVisible" :title="title" :size="size" :before-close="handleClose"
        @update:model-value="emit('close')">
        <el-form :model="formData" ref="formRef" :rules="rules" :label-width="labelWidth">
            <template v-for="(field, index) in fields" :key="index">
                <el-form-item v-if="!field.hidden" :label="field.label" :prop="field.prop">
                    <component :is="field.type" v-model="formData[field.prop]" v-bind="field.props"
                        :options="field.options" />
                </el-form-item>
            </template>
            <el-form-item>
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
    drawerVisible: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '表单',
    },
    size: {
        type: String,
        default: '30%',
    },
    labelWidth: {
        type: String,
        default: '100px',
    },
    fields: {
        type: Array,
        default: () => [],
    },
    formData: {
        type: Object,
        default: () => ({}),
    },
    rules: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(['submit', 'close']);
const formRef = ref();

const handleClose = () => {
    emit('close');
};

const handleSubmit = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            emit('submit', props.formData);
        } else {
            ElMessage.error('请检查表单填写');
        }
    });
};
</script>
