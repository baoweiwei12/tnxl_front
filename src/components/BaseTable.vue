<template>
    <el-table v-loading="loading" :data="data" style="width: 100%" size="small" border>
        <!-- 动态生成列 -->
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
            :width="column.width" :align="column.align || 'left'" :formatter="column.formatter">
            <template v-if="column.slot" #default="scope">
                <slot :name="column.slot" :scope="scope"></slot>
            </template>

            <!-- 图片列 -->
            <template v-else-if="column.isImage" #default="scope">
                <el-image v-if="_.get(scope.row, column.prop)?.length > 0" :src="_.get(scope.row, column.prop)[0]"
                    :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="_.get(scope.row, column.prop)"
                    :initial-index="0" fit="cover" style="max-width: 100px; max-height: 100px;"
                    preview-teleported="true"></el-image>
                <template v-else>
                    <div class="image-slot">
                        <el-icon>
                            <Picture></Picture>
                        </el-icon>
                        <span>暂无图片</span>
                    </div>
                </template>
            </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column v-if="actionSlot" label="操作" :width="actionColumnWidth" align="center">
            <template #default="scope">
                <slot name="actions" :scope="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { dateTimeFormat } from '@/utils';
import { Picture } from '@element-plus/icons-vue';

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
        required: true, // [{ label: '姓名', prop: 'name', width: '120', slot: 'name', isImage: true }]
    },
    actionSlot: {
        type: Boolean,
        default: false, // 是否显示操作列
    },
    actionColumnWidth: {
        type: [String, Number],
        default: 180, // 默认操作列宽度
    }
})

// 示例：为时间字段创建格式化函数
const timeFormatter = (row, column, value) => {
    if (!value) return '--';
    return dateTimeFormat(value); // 格式化为 "YYYY-MM-DD HH:mm:ss"
};

// 示例：动态列配置中加入格式化规则
props.columns.forEach((column) => {
    if (column.isTime) {
        column.formatter = timeFormatter;
    }
});
</script>

<style scoped>
.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 15px;
}
</style>
