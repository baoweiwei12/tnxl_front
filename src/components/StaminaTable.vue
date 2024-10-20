<template>
    <div>
        <el-table v-loading="loading" :data="data" style="width: 100%" size="small" border>
            <el-table-column prop="full_name" label="姓名" width="70"></el-table-column>
            <el-table-column prop="body_type" label="体型" width="80"></el-table-column>
            <el-table-column prop="is_pass_body_type" label="体型测试" width="65">
                <template #default="{ row }">
                    <el-tag :type="row.is_pass_body_type ? 'success' : 'danger'">
                        {{ row.is_pass_body_type ? '通过' : '未通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="three_km_time" label="3公里时间(秒)" width="100"></el-table-column>
            <el-table-column prop="is_pass_three_km" label="3公里测试" width="80">
                <template #default="{ row }">
                    <el-tag :type="row.is_pass_three_km ? 'success' : 'danger'">
                        {{ row.is_pass_three_km ? '通过' : '未通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="horizontal_bar_times" label="单杠次数" width="70"></el-table-column>
            <el-table-column prop="is_pass_horizontal_bar" label="单杠测试" width="70">
                <template #default="{ row }">
                    <el-tag :type="row.is_pass_horizontal_bar ? 'success' : 'danger'">
                        {{ row.is_pass_horizontal_bar ? '通过' : '未通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="sit_ups_times" label="仰卧起坐次数" width="100"></el-table-column>
            <el-table-column prop="is_pass_sit_ups" label="仰卧起坐测试" width="100">
                <template #default="{ row }">
                    <el-tag :type="row.is_pass_sit_ups ? 'success' : 'danger'">
                        {{ row.is_pass_sit_ups ? '通过' : '未通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="serpentine_running_time" label="蛇行跑时间(秒)" width="100"></el-table-column>
            <el-table-column prop="is_pass_serpentine_running" label="蛇行跑测试" width="80">
                <template #default="{ row }">
                    <el-tag :type="row.is_pass_serpentine_running ? 'success' : 'danger'">
                        {{ row.is_pass_serpentine_running ? '通过' : '未通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_pass_parallel_bars" label="双杠测试" width="70">
                <template #default="{ row }">
                    <el-tag :type="row.is_pass_parallel_bars ? 'success' : 'danger'">
                        {{ row.is_pass_parallel_bars ? '通过' : '未通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="weight_test_time" label="负重时间(秒)" width="100"></el-table-column>
            <el-table-column prop="is_pass_weight_test" label="负重测试" width="70">
                <template #default="{ row }">
                    <el-tag :type="row.is_pass_weight_test ? 'success' : 'danger'">
                        {{ row.is_pass_weight_test ? '通过' : '未通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_pass_wooden_horse" label="木马测试" width="70">
                <template #default="{ row }">
                    <el-tag :type="row.is_pass_wooden_horse ? 'success' : 'danger'">
                        {{ row.is_pass_wooden_horse ? '通过' : '未通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="level" label="总水平" width="70">
                <template #default="{ row }">
                    <el-tag :type="getLevelType(row.level)">
                        {{ getLevelLabel(row.level) }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination size="small" style="margin-top: 10px;" v-if="total > 0" :current-page="pagination.currentPage"
            :page-size="pagination.pageSize" :total="total" @current-change="handlePageChange"
            layout="total, prev, pager, next, jumper, sizes" :page-sizes="pagination.pageSizes"
            @size-change="handleSizeChange" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    }
})

const data = computed(() => props.data)
const loading = computed(() => props.loading)




const getLevelLabel = (level) => {
    switch (level) {
        case 0:
            return '不及格'
        case 1:
            return '及格'
        case 2:
            return '良好'
        case 3:
            return '优秀'
        default:
            return '未知'
    }
}

const getLevelType = (level) => {
    switch (level) {
        case 0:
            return 'danger'
        case 1:
            return 'warning'
        case 2:
            return 'info'
        case 3:
            return 'success'
        default:
            return ''
    }
}
</script>

<style scoped>
/* 添加自定义样式 */
</style>
