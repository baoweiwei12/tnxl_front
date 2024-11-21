<template>
    <el-table v-loading="loading" :data="data" style="width: 100%" size="small" border>
        <!-- 动态生成列 -->
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
            :width="column.width" :align="column.align || 'left'">
            <template v-if="column.slot" #default="scope">
                <slot :name="column.slot" :scope="scope"></slot>
            </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column v-if="actionSlot" label="操作" width="180" align="center">
            <template #default="scope">
                <slot name="actions" :scope="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    columns: {
        type: Array,
        required: true, // [{ label: '姓名', prop: 'name', width: '120', slot: 'name' }]
    },
    actionSlot: {
        type: Boolean,
        default: false, // 是否显示操作列
    },
})
</script>
