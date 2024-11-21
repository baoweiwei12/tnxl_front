<template>
    <el-select v-model="selectedUserId" filterable remote reserve-keyword placeholder="输入姓名查询"
        :remote-method="remoteMethod" :loading="loading" @change="handleUserChange" clearable>
        <el-option v-for="user in users" :key="user.id" :label="user.full_name" :value="user.id" />
    </el-select>
</template>

<script setup>
import { ref, watch } from 'vue'
import { searchUsers } from '@/api'

// 定义属性
const props = defineProps({
    user_id: {
        type: Number,
        default: null
    }
})

// 定义事件
const emit = defineEmits(['update:user_id', 'select-user'])

// 用户列表和加载状态
const users = ref([]);
const loading = ref(false);

// 选中用户的 ID
const selectedUserId = ref(props.user_id);

// 搜索用户方法
const remoteMethod = async (keyword) => {
    loading.value = true;
    try {
        const res = await searchUsers(keyword);
        users.value = res.data;
    } finally {
        loading.value = false;
    }
}

// 当选中用户时触发事件
const handleUserChange = (userId) => {
    const selectedUser = users.value.find(user => user.id === userId);
    emit('update:user_id', userId); // 双向绑定 user_id
    emit('select-user', selectedUser); // 传递完整用户对象
}

// 同步外部传入的 user_id 变化
watch(() => props.user_id, (newValue) => {
    selectedUserId.value = newValue;
});
</script>
