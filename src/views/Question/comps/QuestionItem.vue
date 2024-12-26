<template>
    <el-card shadow="always" :body-style="{ padding: '20px' }" class="question-card">
        <template #header>
            <div class="header">
                <el-tag type="success" size="normal">{{ props.question.subject_name }}</el-tag>
                <el-tag type="primary" size="normal">{{ getType(props.question.type) }}</el-tag>
            </div>
        </template>
        <p class="content">{{ props.question.content }}</p>
        <div class="image-box">
            <el-image v-for="(image, index) in props.question.images" :key="index" :src="image" class="image"
                fit="cover" :preview-src-list="props.question.images"></el-image>
        </div>
        <div class="options">
            <el-radio-group v-if="props.question.type === 'single_choice' || props.question.type === 'true_false'">
                <el-radio v-for="option in props.question.options" :key="option.key" :label="option.key">
                    {{ option.key }}: {{ option.value }}
                </el-radio>
            </el-radio-group>
            <el-checkbox-group v-else-if="props.question.type === 'multi_choice'">
                <el-checkbox v-for="option in props.question.options" :key="option.key" :label="option.key">
                    {{ option.key }}: {{ option.value }}
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <!-- 新增显示答案的元素，将答案数组转换为用逗号分隔的字符串进行显示 -->
        <p class="answer-text">正确答案：{{ displayAnswer }}</p>
        <template #footer>
            <div class="footer">
                <el-button type="primary" size="small" @click="handleEdit">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDelete">删除</el-button>
            </div>
        </template>
    </el-card>
</template>

<script setup>
import { computed } from 'vue';
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
            return "单选题"
        case "multi_choice":
            return "多选题"
        case "true_false":
            return "判断题"
    }
}

// 添加计算属性，将答案数组转换为用逗号分隔的字符串
const displayAnswer = computed(() => props.question.answer.join(','));
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
    color: #333;
    /* 可以调整颜色等样式 */
}
</style>