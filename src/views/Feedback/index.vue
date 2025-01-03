<template>
    <div class="feedback-container">
        <h2 class="title">匿名意见箱</h2>
        <el-card class="input-card">
            <el-input v-model="feedbackContent" placeholder="请输入您的反馈" type="textarea" :rows="3" class="feedback-input"
                maxlength="200" show-word-limit></el-input>
            <div class="action-buttons">
                <el-button type="primary" @click="submitFeedback">提交反馈</el-button>
            </div>
        </el-card>

        <h3 class="sub-title">其他用户的反馈</h3>
        <el-scrollbar class="feedback-list">
            <el-card v-for="feedback in feedbackList" :key="feedback.id" class="feedback-card">
                <p class="feedback-content">{{ feedback.content }}</p>
                <span class="feedback-date">{{ formatDate(feedback.created_at) }}</span>
            </el-card>
        </el-scrollbar>
        <el-pagination v-model:currentPage="currentPage" :page-size="pageSize" :total="total"
            @current-change="handlePageChange" layout="prev, pager, next" class="pagination"></el-pagination>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFeedbacks, createFeedback } from '@/api/feedback';
import { ElMessage } from 'element-plus';

const feedbackContent = ref('');

const feedbackList = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(5);

const submitFeedback = async () => {
    if (!feedbackContent.value.trim()) {

        ElMessage.warning('反馈内容不能为空');
        return;
    }
    try {
        await createFeedback(feedbackContent.value.trim());
        feedbackContent.value = '';
        ElMessage.success('反馈提交成功');
        fetchFeedbacks();
    } catch (error) {
        console.error('反馈提交失败:', error);
        ElMessage.error('反馈提交失败，请稍后重试');
    }
};

const fetchFeedbacks = async () => {
    try {
        const { data } = await getFeedbacks(currentPage.value, pageSize.value);
        feedbackList.value = data.data;
        total.value = data.total;
    } catch (error) {
        console.error('获取反馈失败:', error);
    }
};

const handlePageChange = (page) => {
    currentPage.value = page;
    fetchFeedbacks();
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
};

onMounted(() => {
    fetchFeedbacks();
});
</script>

<style scoped>
.feedback-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
}

.sub-title {
    margin-top: 30px;
    font-size: 18px;
    font-weight: bold;
}

.input-card {
    margin-bottom: 20px;
}

.feedback-input {
    margin-bottom: 10px;
}

.action-buttons {
    text-align: right;
}

.feedback-alert {
    margin-top: 10px;
}

.feedback-list {
    max-height: 400px;
    overflow-y: auto;
    margin-top: 10px;
    border-top: 1px solid #e0e0e0;
}

.feedback-card {
    margin-top: 10px;
    padding: 10px;
    border-radius: 6px;
    background: #f9fafc;
}

.feedback-content {
    font-size: 14px;
    color: #333;
}

.feedback-date {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
    display: block;
    text-align: right;
}

.pagination {
    margin-top: 20px;
    text-align: center;
}
</style>
