<template>
    <div class="query-box">
        <UserSearch v-model:user_id="queryParams.user_id" style="width: 120px;"></UserSearch>
        <SubjectSelect v-model:subject="queryParams.subjet" belong_to="专业" style="width: 240px;"></SubjectSelect>
        <el-date-picker v-model="queryParams.start_date" type="date" placeholder="开始日期" :shortcuts="shortcuts"
            value-format="YYYY-MM-DD" clearable style="width: 120px" />

        <el-date-picker v-model="queryParams.end_date" type="date" placeholder="结束日期" :shortcuts="shortcuts"
            value-format="YYYY-MM-DD" clearable style="width: 120px" />
        <el-button @click="handleSearch">搜索</el-button>


    </div>
    <div ref="chartRef" style="height: 600px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import UserSearch from '@/components/UserSearch.vue';
import SubjectSelect from '@/components/SubjectSelect.vue';
import { getMajorStatsByDate } from '@/api';
import { ElMessage } from 'element-plus';

const queryParams = ref({
    user_id: null,
    subjet: null,
    start_date: null,
    end_date: null
});
const chartRef = ref(null);

const chartData = ref({
});

const initChart = () => {
    // 初始化图表实例
    const chart = echarts.init(chartRef.value);

    // 图表配置
    const options = {
        title: {
            text: queryParams.value.subjet != null ? queryParams.value.subjet + '统计折线图' : '全科统计折线图',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['计划总组数', '实际总组数', '总分数', '平均分'],
            top: '10%',
        },
        xAxis: {
            type: 'category',
            data: chartData.value.日期,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '计划总组数',
                type: 'line',
                data: chartData.value.计划总组数,
            },
            {
                name: '实际总组数',
                type: 'line',
                data: chartData.value.实际总组数,
            },
            {
                name: '总分数',
                type: 'line',
                data: chartData.value.总分数,
            },
            {
                name: '平均分',
                type: 'line',
                data: chartData.value.平均分,
            },
        ],
    };

    // 设置图表选项
    chart.setOption(options);

    // 响应式调整图表大小
    window.addEventListener('resize', () => {
        chart.resize();
    });
};



const handleSearch = async () => {

    Object.keys(queryParams.value).forEach(key => {
        if (queryParams.value[key] === "") {
            queryParams.value[key] = null;
        }
    });
    if (queryParams.value.start_date > queryParams.value.end_date) {
        ElMessage.warning('开始日期不能大于结束日期')
        return
    }
    const resp = await getMajorStatsByDate(queryParams.value)
    chartData.value = resp.data
    initChart()
}
</script>

<style>
.query-box {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}
</style>
