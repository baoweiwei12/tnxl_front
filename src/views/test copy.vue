<template>
    <div>
        <el-table :data="data" size="small" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px"
            :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column label="XXXX年XX月第X周训练计划" width="100%">
                <el-table-column label="时间" prop="time">
                </el-table-column>
                <el-table-column label="周一">
                    <el-table-column label="科目" prop="day1.subject" :editable="true">
                        <template #default="{ row }">
                            <el-input v-model="row.day1.subject" size="small"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="计划时间" prop="day1.plan_time" :editable="true">
                        <template #default="{ row }">
                            <el-input v-model="row.day1.plan_time" size="small"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="实训时间" prop="day1.actual_time" :editable="true">
                        <template #default="{ row }">
                            <el-input v-model="row.day1.actual_time" size="small"></el-input>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="周二">
                    <el-table-column label="科目" prop="day2.subject" />
                    <el-table-column label="计划时间" prop="day2.plan_time" />
                    <el-table-column label="实训时间" prop="day2.actual_time" />
                </el-table-column>
                <el-table-column label="周三">
                    <el-table-column label="科目" prop="day3.subject" />
                    <el-table-column label="计划时间" prop="day3.plan_time" />
                    <el-table-column label="实训时间" prop="day3.actual_time" />
                </el-table-column>
                <el-table-column label="周四">
                    <el-table-column label="科目" prop="day4.subject" />
                    <el-table-column label="计划时间" prop="day4.plan_time" />
                    <el-table-column label="实训时间" prop="day4.actual_time" />
                </el-table-column>
                <el-table-column label="周五">
                    <el-table-column label="科目" prop="day5.subject" />
                    <el-table-column label="计划时间" prop="day5.plan_time" />
                    <el-table-column label="实训时间" prop="day5.actual_time" />
                </el-table-column>
                <el-table-column label="周六">
                    <el-table-column label="科目" prop="day6.subject" />
                    <el-table-column label="计划时间" prop="day6.plan_time" />
                    <el-table-column label="实训时间" prop="day6.actual_time" />
                </el-table-column>
                <el-table-column label="周日">
                    <el-table-column label="科目" prop="day7.subject" />
                    <el-table-column label="计划时间" prop="day7.plan_time" />
                    <el-table-column label="实训时间" prop="day7.actual_time" />
                </el-table-column>

            </el-table-column>

        </el-table>
    </div>
</template>

<script setup>
const data = [
    {
        time: '午训练',
        day1: { subject: 1, plan_time: 2, actual_time: 3 },
        day2: { subject: 1, plan_time: 2, actual_time: 3 },
        day3: { subject: 1, plan_time: 2, actual_time: 3 },
        day4: { subject: 1, plan_time: 2, actual_time: 3 },
        day5: { subject: 1, plan_time: 2, actual_time: 3 },
        day6: { subject: 1, plan_time: 2, actual_time: 3 },
        day7: { subject: 1, plan_time: 2, actual_time: 3 }
    }
    ,
    {
        time: '午训练',
        day1: { subject: 1, plan_time: 2, actual_time: 3 },
        day2: { subject: 1, plan_time: 2, actual_time: 3 },
        day3: { subject: 1, plan_time: 2, actual_time: 3 },
        day4: { subject: 1, plan_time: 2, actual_time: 3 },
        day5: { subject: 1, plan_time: 2, actual_time: 3 },
        day6: { subject: 1, plan_time: 2, actual_time: 3 },
        day7: { subject: 1, plan_time: 2, actual_time: 3 }
    },
    {
        time: '晚训练',
        day1: { subject: 1, plan_time: 2, actual_time: 3 },
        day2: { subject: 1, plan_time: 2, actual_time: 3 },
        day3: { subject: 1, plan_time: 2, actual_time: 3 },
        day4: { subject: 1, plan_time: 2, actual_time: 3 },
        day5: { subject: 1, plan_time: 2, actual_time: 3 },
        day6: { subject: 1, plan_time: 2, actual_time: 3 },
        day7: { subject: 1, plan_time: 2, actual_time: 3 }
    },
    {
        time: '晚训练',
        day1: { subject: 1, plan_time: 2, actual_time: 3 },
        day2: { subject: 1, plan_time: 2, actual_time: 3 },
        day3: { subject: 1, plan_time: 2, actual_time: 3 },
        day4: { subject: 1, plan_time: 2, actual_time: 3 },
        day5: { subject: 1, plan_time: 2, actual_time: 3 },
        day6: { subject: 1, plan_time: 2, actual_time: 3 },
        day7: { subject: 1, plan_time: 2, actual_time: 3 }
    }
]

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0) {
        let currentTime = row.time;
        let prevTime = rowIndex > 0 ? data[rowIndex - 1].time : null;

        if (currentTime === prevTime) {
            return [0, 0]; // 不显示该行
        } else {
            // 计算相同 time 的连续行数
            let rowspan = 1;
            for (let i = rowIndex + 1; i < data.length; i++) {
                if (data[i].time === currentTime) {
                    rowspan++;
                } else {
                    break;
                }
            }
            return [rowspan, 1]; // 合并 rowspan 行
        }
    }
}

</script>
