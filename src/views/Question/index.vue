<template>
    <div class="question-list">
        <h1>题目列表</h1>
        <QuestionItem v-if="questionData" :question="questionData" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import QuestionItem from './comps/QuestionItem.vue'; // 导入 QuestionItem 组件

const questionData = ref(null); // 创建一个响应式的 questionData

onMounted(() => {
    // 模拟获取题目的数据
    questionData.value = {
        subject_id: 2,
        type: "single_choice",
        content: "鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？鲁迅是谁？",
        options: [
            { key: "A", value: "周树人" },
            { key: "B", value: "李树人" }
        ],
        answer: ["A", "B"],
        images: [
            "http://127.0.0.1:8000/uploads/images/5c11b347ba5a4a99b4326497dddbae6e_Image_20241011150608410.png", "http://127.0.0.1:8000/uploads/images/5c11b347ba5a4a99b4326497dddbae6e_Image_20241011150608410.png", "http://127.0.0.1:8000/uploads/images/5c11b347ba5a4a99b4326497dddbae6e_Image_20241011150608410.png"
        ],
        id: 1,
        created_at: "2024-12-26T14:11:26",
        updated_at: "2024-12-26T14:15:10",
        is_deleted: false,
        subject_name: "测试问答科2"
    };
});
</script>

<style scoped>
.question-list {
    padding: 20px;
}
</style>