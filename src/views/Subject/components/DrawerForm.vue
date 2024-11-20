<template>
    <el-drawer v-model="props.drawerVisible" :title="props.isEdit ? '编辑' : '新增'" size="30%"
        :before-close="handleCloseDrawer">
        <el-form :model="props.form" ref="formRef" label-width="100px" label-position="left">
            <el-form-item label="科目名" prop="name">
                <el-input v-model="props.form.name" placeholder="科目名" />
            </el-form-item>
            <el-form-item label="科目类型" prop="t_or_e">
                <el-select v-model="props.form.t_or_e" placeholder="科目类型">
                    <el-option v-for="item in ['训练', '考试']" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="科目归属" prop="belong_to">
                <el-select v-model="props.form.belong_to" placeholder="科目归属">
                    <el-option v-for="item in ['双一', '体能', '专业']" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleCloseDrawer">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { searchUsers } from '@/api'
import UserSearch from '@/components/UserSearch.vue';
const props = defineProps({
    form: {
        type: Object,
        default: () => ({})
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    drawerVisible: {
        type: Boolean,
        default: false
    }
})


const emit = defineEmits(['submit', 'close'])


const handleCloseDrawer = () => {
    emit('close')
}

const handleSubmit = () => {
    emit('submit')
}


</script>
