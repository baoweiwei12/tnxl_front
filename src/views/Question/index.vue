<template>
    <div class="container1">
        <el-affix :offset="70">
            <el-card shadow="always" :body-style="{ padding: '10px' }" style="margin-bottom: 10px;">
                <div class="header-box">
                    <el-input v-model="searchParams.keyword" placeholder="输入关键词" clearable style="width: 200px;" />
                    <StudySubjectSelect v-model="searchParams.subject_id" />
                    <QuestionTypeSelect v-model="searchParams.type" />
                    <el-button type="primary" @click="fetchQuestionData" style="width: 100px;"
                        :icon="Search">搜索</el-button>
                    <el-button type="success" @click="handleAddQuestion" style="width: 100px; margin-left: 0px;"
                        :icon="Plus">录入题目</el-button>
                    <Pagination :total="pagination.total" :pagination="pagination" @page-change="handlePageChange"
                        @size-change="handleSizeChange" style="margin-left: auto;"></Pagination>
                </div>
            </el-card>
        </el-affix>



        <div class="question-list">
            <div v-for="questionData in questionDataList" style="width: 100%;">
                <QuestionItem v-if="questionData" :question="questionData" @edit="handleEdit" @delete="handleDelete" />
            </div>

        </div>
    </div>
    <QuestionForm :form="form" :is-edit="isEdit" :drawer-visible="drawerVisible" @submit="handleSubmit"
        @close="handleCloseDrawer" />
</template>

<script setup>
import Pagination from "@/components/Pagination.vue";
import { ref, onMounted } from "vue";
import { Search, Plus } from '@element-plus/icons-vue'
import QuestionItem from './comps/QuestionItem.vue'; // 导入 QuestionItem 组件
import { getQuestions, getAllStudySubjects, createQuestion, updateQuestion, deleteQuestion } from "@/api/qa_system.js";
import QuestionTypeSelect from "@/components/QuestionTypeSelect.vue";
import StudySubjectSelect from "@/components/StudySubjectSelect.vue";
import QuestionForm from './comps/QuestionForm.vue' // 抽屉表单
import { ElMessage, ElLoading } from "element-plus";


const drawerVisible = ref(false) // 抽屉表单控制
const isEdit = ref(false) // 是否编辑
const form = ref({}) // 表单数据

// 打开抽屉表单
const handleAddQuestion = () => {
    form.value = {
        type: "single_choice",
        content: "",
        options: [],
        answer: [],
        images: []
    }
    isEdit.value = false
    drawerVisible.value = true
    console.log(drawerVisible.value)
}
// 关闭抽屉表单
const handleCloseDrawer = () => {
    drawerVisible.value = false
}
// 查询参数
const searchParams = ref({
    keyword: null,
    subject_id: null,
    type: null,
});
const pagination = ref({
    total: 0,
    currentPage: 1,
    pageSize: 10
})

const questionDataList = ref([]) // 题目列表

const handlePageChange = async (page) => {
    await fetchQuestionData()
}
const handleSizeChange = async (size) => {
    await fetchQuestionData()
}
onMounted(async () => {
    await fetchQuestionData()
})
// 获取题目列表
const fetchQuestionData = async () => {
    const loading = ElLoading.service({ fullscreen: true })
    try {
        const res = await getQuestions({ ...searchParams.value, page: pagination.value.currentPage, per_page: pagination.value.pageSize })
        questionDataList.value = res.data.data.map(item => {
            return {
                ...item,
                answer: item.type === 'multiple_choice' ? item.answer : item.answer[0]
            }
        })
        pagination.value.total = res.data.total
        console.log(questionDataList.value)
    } catch (error) {
        console.error('获取题目列表失败', error)
    } finally {
        loading.close()
    }

}
// 提交表单
const handleSubmit = async (formData) => {
    drawerVisible.value = false
    await fetchQuestionData()
}

//编辑单个题目
const handleEdit = (row) => {
    isEdit.value = true
    form.value = row
    drawerVisible.value = true
}
// 删除题目
const handleDelete = async (row) => {
    try {
        await deleteQuestion(row.id)
        ElMessage.success('删除成功')
        await fetchQuestionData()
    } catch (error) {
        console.error('删除失败', error)
        ElMessage.error('删除失败')
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