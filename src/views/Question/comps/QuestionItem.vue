<template>
    <el-card shadow="always" :body-style="{ padding: '10px' }" class="question-card">
        <template #header>
            <div class="header">
                <el-tag type="success" size="normal">{{ props.question.subject_name }}</el-tag>
                <el-tag :type="getType(props.question.type).type" size="normal">{{ getType(props.question.type).text
                    }}</el-tag>
                <el-button :icon="Edit" text bg style="margin-left: auto;" type="primary" size="small"
                    @click="handleEdit">编辑</el-button>
                <el-button :icon="Delete" text bg style="margin-left: 0px;" type="danger" size="small"
                    @click="handleDelete">删除</el-button>
            </div>
        </template>
        <p class="content">【问题】{{ props.question.content }}</p>
        <div class="image-box">
            <el-image v-for="(image, index) in props.question.images" :key="index" :src="image" class="image"
                fit="cover" :preview-src-list="props.question.images"></el-image>
        </div>
        <div class="options">
            <el-radio-group v-if="props.question.type === 'single_choice' || props.question.type === 'true_false'">
                <el-radio v-for="option in props.question.options" :key="option.key" :label="option.key">
                    {{ option.key }}. {{ option.value }}
                </el-radio>
            </el-radio-group>
            <el-checkbox-group v-else-if="props.question.type === 'multiple_choice'">
                <el-checkbox v-for="option in props.question.options" :key="option.key" :label="option.key">
                    {{ option.key }}. {{ option.value }}
                </el-checkbox>
            </el-checkbox-group>
        </div>

        <p class="answer-text">【正确答案】{{ displayAnswer }}</p>
    </el-card>
</template>

<script setup>
import { computed } from 'vue';
import { Delete, Edit } from '@element-plus/icons-vue'


const props = defineProps({
    question: {
        type: Object,
        required: true,
        default: () => ({
            subject_id: 1,
            type: "single_choice",
            content: "",
            options: [
                { key: "A", value: "" },
            ],
            answer: ["A"],
            images: [],
            id: 1,
            created_at: "2024-12-26T14:11:26",
            updated_at: "2024-12-26T14:15:10",
            is_deleted: false,
            subject_name: "测试问答科2"
        })
    }
})

const getType = (type) => {
    switch (type) {
        case "single_choice":
            return {
                text: "单选题",
                type: "primary"
            }
        case "multiple_choice":
            return {
                text: "多选题",
                type: "danger"
            }
        case "true_false":
            return {
                text: "判断题",
                type: "warning"
            }
    }
}

// 添加计算属性，将答案数组转换为用逗号分隔的字符串
const displayAnswer = computed(() => props.question.type === 'multiple_choice' ? props.question.answer.join(',') : props.question.answer);

const emits = defineEmits(['edit', 'delete'])

const handleEdit = () => {
    emits('edit', props.question)
}

const handleDelete = () => {
    emits('delete', props.question)
}
</script>



<style scoped>
.question-card {
    border-radius: 10px;
    transition: box-shadow 0.3s;
}

.question-card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header {
    display: flex;
    gap: 10px;
}

.content {
    margin: 10px 0;
    font-size: 16px;
    color: #2c3e50;
}

.image-box {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.image {
    width: 100px;
    height: 100px;
}

.options {
    margin-top: 10px;
}

.answer-text {
    margin-top: 10px;
    color: #e74c3c;
    font-size: 14px;
    /* 可以调整颜色等样式 */
}
</style>