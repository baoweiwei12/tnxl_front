<template>
    <el-card shadow="always" :body-style="{ padding: '10px' }" style="margin-bottom: 10px;">
        <div class="search-box">
            <StudySubjectSelect v-model="queryParams.subjectId" />
            <el-select v-model="queryParams.type" placeholder="请选择类型" clearable style="width: 200px;">
                <el-option v-for="item in ['训练', '考试']" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-input type="number" v-model="queryParams.maxTimes" placeholder="请输入最大次数"
                style="width: 200px;"></el-input>
            <el-button :icon="Search" type="primary" @click="handleSearch">搜索</el-button>

        </div>
    </el-card>
    <el-card>
        <div ref="chartRef" style="width: 100%; height: 400px;"></div>
    </el-card>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import StudySubjectSelect from '@/components/StudySubjectSelect.vue';
import * as echarts from 'echarts'
import { getStatistics } from '@/api/qa_system'
import { Search, Plus } from '@element-plus/icons-vue'
// 查询参数
const queryParams = ref({
    subjectId: null,
    type: null,
    maxTimes: 10
})

const scoreData = ref([])
const chartRef = ref(null)
let chartInstance = null

// 获取统计数据
const fetchData = async () => {
    const { data } = await getStatistics(queryParams.value)
    scoreData.value = data
    await nextTick()
    if (chartInstance) {
        chartInstance.clear() // 清空图表
    }
    renderChart()
}
const handleSearch = async () => {

    await fetchData()
}
// 处理数据，按类型和科目分组
const processChartData = () => {
    const groupedData = {}

    scoreData.value.forEach(item => {
        const key = `${item.subject_id}-${item.type}`
        if (!groupedData[key]) {
            groupedData[key] = {
                name: `科目${item.subject_id} - ${item.type}`,
                type: 'line',
                data: [],
                smooth: true
            }
        }
        groupedData[key].data.push({
            value: item.score,
            name: item.end_at
        })
    })

    return Object.values(groupedData)
}

// 渲染 ECharts 图表
const renderChart = () => {
    if (!chartRef.value) return
    if (!chartInstance) {
        chartInstance = echarts.init(chartRef.value)
    }

    const chartData = processChartData()

    const xAxisData = scoreData.value.map(item => {
        const date = new Date(item.end_at)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${hours}:${minutes}`
    })


    const option = {
        title: {
            text: '分数统计折线图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: chartData.map(item => item.name),
            top: '5%'
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                rotate: 45,
                interval: 0
            }
        },
        yAxis: {
            type: 'value',
            name: '分数'
        },
        series: chartData,
        color: [
            '#5470C6', '#91CC75', '#EE6666', '#73C0DE',
            '#FAC858', '#9A60B4', '#EA7CCC'
        ]
    }

    chartInstance.setOption(option)
}

// 窗口大小变化时重绘图表
window.addEventListener('resize', () => {
    if (chartInstance) chartInstance.resize()
})

onMounted(async () => {
    await fetchData()
})
</script>

<style scoped>
.search-box {
    display: flex;
    gap: 10px;
}
</style>
