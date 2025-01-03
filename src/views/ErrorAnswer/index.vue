<template>
    <div class="container1">
        <el-affix :offset="70">
            <el-card shadow="always" :body-style="{ padding: '10px' }" style="margin-bottom: 10px;">
                <div class="header-box">
                    <StudySubjectSelect v-model="searchParams.subjectId" />
                    <el-button type="primary" @click="fetchQuestionData" style="width: 100px;"
                        :icon="Search">搜索</el-button>
                </div>
            </el-card>
        </el-affix>


        <div class="question-list">
            <div v-for="questionData in questionDataList" style="width: 100%;">
                <QuestionItem v-if="questionData" :question="questionData" @submit-answer="handleSubmitAnswer" />
            </div>

        </div>
    </div>
</template>

<script setup>
import Pagination from "@/components/Pagination.vue";
import { ref, onMounted } from "vue";
import { Search, Plus } from '@element-plus/icons-vue'
import QuestionItem from './comps/QuestionItem.vue'; // 导入 QuestionItem 组件
import { getWrongQuestions, passWrongQuestion } from "@/api/qa_system.js";
import QuestionTypeSelect from "@/components/QuestionTypeSelect.vue";
import StudySubjectSelect from "@/components/StudySubjectSelect.vue";
import { ElMessage, ElLoading } from "element-plus";


const handleSubmitAnswer = async (questionData) => {
    console.log(questionData)
    if (questionData.is_correct) {
        await passWrongQuestion(questionData.detail_id)
        questionDataList.value = questionDataList.value.filter(item => item.id !== questionData.id)

    }


}

// 查询参数
const searchParams = ref({
    subjectId: null,
});

const questionDataList = ref([]) // 题目列表


onMounted(async () => {
    await fetchQuestionData()
})
// 获取题目列表
const fetchQuestionData = async () => {

    try {
        const loading = ElLoading.service({ fullscreen: true })
        const { data } = await getWrongQuestions({ ...searchParams.value })
        questionDataList.value = data.map(item => {
            return {
                ...item.question,
                subject_name: item.subject_name,
                user_answer: [],
                detail_id: item.detail.id,
            }
        })
        loading.close()
    } catch (error) {
        console.error('获取题目列表失败', error)
    }

}


</script>

<style scoped>
.container1 {
    display: flex;
    flex-direction: column;

}

.question-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
}

.header-box {
    display: flex;
    width: 100%;
    gap: 10px;

}
</style>