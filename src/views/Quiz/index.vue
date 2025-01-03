<template>
    <el-card shadow="always" :body-style="{ padding: '10px' }" style="margin-bottom: 10px;">
        <div class="search-box">
            <StudySubjectSelect v-model="queryParams.subjectId" />
            <el-select v-model="queryParams.type" placeholder="请选择类型" clearable style="width: 200px;">
                <el-option v-for="item in ['训练', '考试']" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-button :icon="Search" type="primary" @click="handleSearch">搜索</el-button>
            <el-button :icon="Plus" type="success" @click="startDialogVisible = true"
                style="margin-left: 0px;">开始答题</el-button>

        </div>
    </el-card>


    <el-card>
        <data-table :loading="loading" :data="records" @answer="handleGoOnAnswer" />
        <Pagination :total="pagination.total" :pagination="pagination" @page-change="handlePageChange"
            @size-change="handleSizeChange" style="margin-left: auto;"></Pagination>
    </el-card>
    <el-dialog title="答题" v-model="dialogVisible" width="60%" destroy-on-close>
        <Answer :recordDetails="recordDetails" :endAt="currentRecord.end_at" @end-answer="handleEndAnswer" />
    </el-dialog>

    <el-dialog title="开始答题" v-model="startDialogVisible" width="30%" destroy-on-close>
        <el-form :model="formData" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
            <el-form-item label="科目">
                <StudySubjectSelect v-model="formData.subjectId" />
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="formData.type" placeholder="请选择类型" clearable style="width: 200px;">
                    <el-option v-for="item in ['训练', '考试']" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmitStart">立即创建</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import StudySubjectSelect from '@/components/StudySubjectSelect.vue';
import { searchAnswerRecords, getAnswerRecordDetails, endAnswer, createAnswerRecord } from '@/api/qa_system';
import { Search, Plus } from '@element-plus/icons-vue'
import DataTable from './comps/DataTable.vue';
import Pagination from "@/components/Pagination.vue";
import Answer from './comps/Answer.vue';
import { ElMessage } from 'element-plus';
// 开始答题表单
const formData = ref({
    subjectId: null,
    type: null
});
// 开始答题对话框
const startDialogVisible = ref(false);

const handleSubmitStart = async () => {
    try {
        await createAnswerRecord(formData.value);
        startDialogVisible.value = false;
        await fetchData();
        formData.value = {
            subjectId: null,
            type: null
        }
        ElMessage.success('创建成功');
        await handleGoOnAnswer(records.value[0])

    } catch (error) {
        console.error('提交失败：', error);
        ElMessage.error('提交失败:' + `${JSON.stringify(error.response?.data?.detail)}`);

    }
}
// 查询参数
const queryParams = ref({
    subjectId: null,
    type: null
});
// 答题对话框
const dialogVisible = ref(false);
const recordDetails = ref([]);
const currentRecord = ref({});
const handleGoOnAnswer = async (record) => {
    const { data } = await getAnswerRecordDetails(record.id);
    recordDetails.value = data;
    currentRecord.value = record;
    dialogVisible.value = true;
}
//数据
const records = ref([]);

const loading = ref(false);

const pagination = ref({
    total: 0,
    currentPage: 1,
    pageSize: 10
})


// 获取数据
const fetchData = async () => {
    console.log("获取数据");
    try {
        loading.value = true;
        const { data } = await searchAnswerRecords({
            ...queryParams.value,
            page: pagination.value.currentPage,
            per_page: pagination.value.pageSize

        });
        records.value = data.data.map(item => {
            return {
                ...item,
                inProgress: !item.end_at || new Date(item.end_at).getTime() - 1000 > new Date(),

            }
        });
        console.log(records.value)
        pagination.value.total = data.total;
        loading.value = false;
    } catch (error) {
        console.error(error);
    }

};
// 结束答题
const handleEndAnswer = async () => {
    try {
        await endAnswer(currentRecord.value.id);
        ElMessage.success('答题结束');
        await fetchData();
        dialogVisible.value = false;

    } catch (error) {
        console.error('结束答题失败', error);
        ElMessage.error('结束答题失败');
    }

}
onMounted(async () => {
    await fetchData();
})
const handlePageChange = async (page) => {
    await fetchData()
}
const handleSizeChange = async (size) => {
    await fetchData()
}

const handleSearch = async () => {
    await fetchData();
};

</script>


<style scoped>
.search-box {
    display: flex;
    gap: 10px;
}
</style>