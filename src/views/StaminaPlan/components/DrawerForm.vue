<template>
    <el-drawer v-model="props.drawerVisible" :title="props.isEdit ? '编辑' : '新增'" size="30%"
        :before-close="handleCloseDrawer">
        <el-form :model="props.form" ref="formRef" label-width="100px" label-position="left">

            <el-form-item v-if="!props.isEdit" label="用户" prop="user_id">
                <UserSearch v-model:user_id="props.form.user_id" />
            </el-form-item>
            <el-form-item v-if="props.isEdit" label="姓名" prop="full_name">
                <el-input v-model="props.form.full_name" placeholder="请输入姓名" disabled />
            </el-form-item>
            <el-form-item label="日期" prop="date">
                <el-date-picker v-model="props.form.date" type="date" placeholder="选择日期" :shortcuts="shortcuts"
                    value-format="YYYY-MM-DD" />
            </el-form-item>
            <el-form-item label="科目" prop="subject">
                <el-select v-model="props.form.subject" placeholder="请选择科目" @click="handleSubjectSelect"
                    @change="handleSubjectChange">
                    <el-option v-for="item in subjectOptions" :key="item.id" :label="item.name" :value="item.name" />
                </el-select>
            </el-form-item>
            <el-form-item label="时间" prop="time">
                <el-select v-model="props.form.time" placeholder="请选择时间">
                    <el-option v-for="item in ['午训练', '晚训练']" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="training_or_examination">
                <el-select v-model="props.form.training_or_examination" placeholder="类型">
                    <el-option v-for="item in ['训练', '考试']" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="计划组数" prop="plan_time">
                <el-input v-model="props.form.plan_time" placeholder="请输入计划组数" type="number" />
            </el-form-item>
            <el-form-item label="实际组数" prop="actual_time">
                <el-input v-model="props.form.actual_time" placeholder="请输入实际组数" type="number" />
            </el-form-item>
            <el-form-item label="成绩" prop="score">
                <el-input v-model="props.form.score" placeholder="请输入成绩" type="number" />
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
import { searchUsers, getSubjects } from '@/api'
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

const subjectOptions = ref([])

const handleSubjectSelect = async () => {
    subjectOptions.value = (await getSubjects({ belong_to: '体能' })).data
}

const handleSubjectChange = (val) => {
    const t_or_e = subjectOptions.value.find(item => item.name === val)?.t_or_e
    if (t_or_e) {
        props.form.training_or_examination = t_or_e
    }

}

const shortcuts = [
    {
        text: '今天',
        value: new Date(),
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: '明天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: '一周前',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        },
    },

]
</script>
