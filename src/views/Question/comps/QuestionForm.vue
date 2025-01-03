<template>
    <el-drawer v-model="props.drawerVisible" :title="props.isEdit ? '编辑' : '新增'" size="40%"
        :before-close="handleCloseDrawer">
        <el-form :model="props.form" ref="formRef" label-width="100px" label-position="left">
            <el-form-item v-if="props.isEdit" label="ID" prop="id">
                <el-input v-model="props.form.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="科目" prop="subject_id">
                <StudySubjectSelect v-model="props.form.subject_id" />
            </el-form-item>
            <el-form-item label="题型" prop="type">
                <QuestionTypeSelect v-model="props.form.type" :clearable="false" />
            </el-form-item>
            <el-form-item label="题目内容" prop="content">
                <el-input v-model="props.form.content" placeholder="请输入题目内容" type="textarea"></el-input>
            </el-form-item>
            <!-- 动态添加选项 -->
            <el-form-item label="选项">
                <div style="display: flex; flex-direction: column; gap: 5px; width: 100%;">
                    <el-button :icon="Plus" size="small" @click="addOption" style="width: 70px;">添加</el-button>
                    <div v-for="(option, index) in props.form.options" :key="index" class="option-item">
                        <div style="margin-right: 8px;">{{ option.key }}.</div>
                        <el-input v-model="option.value" :placeholder="'输入选项 ' + option.key" type="textarea"
                            style="width: 100%; margin-right: 8px;"></el-input>
                        <el-button :icon="Delete" size="small" type="danger" @click="removeOption(index)"
                            circle></el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="图片" prop="images">
                <ImageUpload v-model:images="props.form.images" />
            </el-form-item>
            <el-form-item label="答案" prop="answer">
                <el-select v-model="props.form.answer" :multiple="props.form.type === 'multiple_choice'"
                    placeholder="选择正确答案" style="width: 240px" @change="handleAnswerChange">
                    <el-option v-for="item in props.form.options" :key="item.key" :label="item.key" :value="item.key" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleCloseDrawer">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { ElUpload, ElButton, ElSwitch, ElInput, ElDrawer, ElForm, ElFormItem, ElSelect, ElOption, ElMessage } from 'element-plus';
import { Delete, Plus } from '@element-plus/icons-vue';
import ImageUpload from '@/components/ImageUpload.vue';
import StudySubjectSelect from '@/components/StudySubjectSelect.vue';
import QuestionTypeSelect from '@/components/QuestionTypeSelect.vue';
import { getQuestions, getAllStudySubjects, createQuestion, updateQuestion } from "@/api/qa_system.js";

const props = defineProps({
    form: {
        type: Object,
        default: () => ({
            subject_id: 0,
            type: "single_choice", // 默认是单选题
            content: "",
            options: [],
            answer: [], // 存储答案
            images: []
        })
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    drawerVisible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['submit', 'close']);

const handleCloseDrawer = () => {
    emit('close');
};

// 提交表单
const handleSubmit = async () => {
    try {
        if (props.isEdit) {
            await updateQuestion(props.form.id, props.form)
        } else {
            await createQuestion(props.form)
        }
        ElMessage.success('提交成功');
        emit('submit', props.form);
    } catch (error) {
        console.error('提交失败', error);
        ElMessage.error('提交失败');
    }

};
const answerTemp = ref(props.form.answer);

// 动态添加选项
const addOption = () => {
    const newOption = { key: String.fromCharCode(65 + props.form.options.length), value: '', selected: false };
    props.form.options.push(newOption);
};

// 删除选项
const removeOption = (index) => {
    props.form.options.splice(index, 1);
};
</script>

<style scoped>
.upload-demo {
    display: flex;
    align-items: center;
}

.option-item {
    display: flex;
    align-items: center;
}

.option-item .el-input {
    margin-right: 8px;
}
</style>
