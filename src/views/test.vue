<template>
    <div>

        <el-table :data="data" size="small" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px"
            :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column label="XXXX年XX月第X周训练计划" width="100%">
                <el-table-column label="时间" prop="time">

                </el-table-column>
                <el-table-column label="周一">
                    <el-table-column label="科目" prop="day1.a" />
                    <el-table-column label="计划时间" />
                    <el-table-column label="实训时间" />
                </el-table-column>
                <el-table-column label="周二">
                    <el-table-column label="科目" />
                    <el-table-column label="计划时间" />
                    <el-table-column label="实训时间" />
                </el-table-column>
                <el-table-column label="周三">
                    <el-table-column label="科目" />
                    <el-table-column label="计划时间" />
                    <el-table-column label="实训时间" />
                </el-table-column>
                <el-table-column label="周四">
                    <el-table-column label="科目" />
                    <el-table-column label="计划时间" />
                    <el-table-column label="实训时间" />
                </el-table-column>
                <el-table-column label="周五">
                    <el-table-column label="科目" />
                    <el-table-column label="计划时间" />
                    <el-table-column label="实训时间" />
                </el-table-column>
                <el-table-column label="周六">
                    <el-table-column label="科目" />
                    <el-table-column label="计划时间" />
                    <el-table-column label="实训时间" />
                </el-table-column>
                <el-table-column label="周日">
                    <el-table-column label="科目" />
                    <el-table-column label="计划时间" />
                    <el-table-column label="实训时间" />
                </el-table-column>

            </el-table-column>

        </el-table>
    </div>
</template>

<script setup>




const arraySpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}) => {
    if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
            return [1, 2]
        } else if (columnIndex === 1) {
            return [0, 0]
        }
    }
}

const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}) => {
    if (columnIndex === 0) {

        if (rowIndex % 4 === 0) {
            return {
                rowspan: 4,
                colspan: 1,
            }
        } else {
            return {
                rowspan: 0,
                colspan: 0,
            }
        }
    }
}



const data = [
    {
        time: "午训练",
        day1: {
            a: 1,
            b: 2,
            c: 3,

        },
        day2: {
            a: 1,
            b: 2,
            c: 3,
        },
        day3: {
            a: 1,
            b: 2,
            c: 3,
        },
        day4: {
            a: 1,
            b: 2,
            c: 3,
        },
        day5: {
            a: 1,
            b: 2,
            c: 3,
        },
        day6: {
            a: 1,
            b: 2,
            c: 3,
        },
        day7: {
            a: 1,
            b: 2,
            c: 3,
        }
    },
    {
        time: true,
        1: {
            a: 1,
            b: 2,
            c: 3,

        },
        2: {
            a: 1,
            b: 2,
            c: 3,
        },
        3: {
            a: 1,
            b: 2,
            c: 3,
        },
        4: {
            a: 1,
            b: 2,
            c: 3,
        },
        5: {
            a: 1,
            b: 2,
            c: 3,
        },
        6: {
            a: 1,
            b: 2,
            c: 3,
        },
        7: {
            a: 1,
            b: 2,
            c: 3,
        }
    },
    {
        time: true,
        1: {
            a: 1,
            b: 2,
            c: 3,

        },
        2: {
            a: 1,
            b: 2,
            c: 3,
        },
        3: {
            a: 1,
            b: 2,
            c: 3,
        },
        4: {
            a: 1,
            b: 2,
            c: 3,
        },
        5: {
            a: 1,
            b: 2,
            c: 3,
        },
        6: {
            a: 1,
            b: 2,
            c: 3,
        },
        7: {
            a: 1,
            b: 2,
            c: 3,
        }
    },
    {
        time: true,
        1: {
            a: 1,
            b: 2,
            c: 3,

        },
        2: {
            a: 1,
            b: 2,
            c: 3,
        },
        3: {
            a: 1,
            b: 2,
            c: 3,
        },
        4: {
            a: 1,
            b: 2,
            c: 3,
        },
        5: {
            a: 1,
            b: 2,
            c: 3,
        },
        6: {
            a: 1,
            b: 2,
            c: 3,
        },
        7: {
            a: 1,
            b: 2,
            c: 3,
        }
    },
    {
        time: false,
        1: {
            a: 1,
            b: 2,
            c: 3,

        },
        2: {
            a: 1,
            b: 2,
            c: 3,
        },
        3: {
            a: 1,
            b: 2,
            c: 3,
        },
        4: {
            a: 1,
            b: 2,
            c: 3,
        },
        5: {
            a: 1,
            b: 2,
            c: 3,
        },
        6: {
            a: 1,
            b: 2,
            c: 3,
        },
        7: {
            a: 1,
            b: 2,
            c: 3,
        }
    }
]
</script>