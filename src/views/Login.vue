<template>
    <div class="login-container">
        <el-card class="login-card">
            <h2 class="login-title">登录</h2>
            <form label-width="80px">
                <el-input v-model="loginForm.username" placeholder="请输入用户名" class="login-input">
                </el-input>

                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" class="login-input">
                </el-input>

                <el-button type="primary" @click="handleLogin" class="login-button">
                    登录
                </el-button>
            </form>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { login, getUsersMe } from '@/api';
import { tokenStorage, userStorage } from '@/storage';
import router from '@/router';

const loginForm = ref({
    username: '',
    password: '',
});

const handleLogin = async () => {
    try {
        if (!loginForm.value.username || !loginForm.value.password) {
            ElMessage.error('请输入用户名和密码');
            return;
        }
        const resp = await login(loginForm.value.username, loginForm.value.password);
        console.log(resp.data.access_token);
        tokenStorage.set(resp.data.access_token);
        const userResp = await getUsersMe();
        userStorage.set(userResp.data);
        ElMessage.success('登录成功');
        router.push('/');

    } catch (err) {
        console.log(err);
        if (err.status) {
            if (err.response.status === 401) {
                loginForm.value.password = '';
                ElMessage.error('用户名或密码错误');
                return;
            }
            if (err.response.status === 404) {
                loginForm.value.password = '';
                ElMessage.error('用户不存在');
                return;
            }
        }


        ElMessage.error(`登录失败：${JSON.stringify(err)}`);
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #f5f5f5, #e0e0e0);
}

.login-card {
    width: 400px;
    padding: 20px;
    border-radius: 10px;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

}

.login-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

.login-input {
    margin-bottom: 15px;

}

.login-button {
    width: 100%;

    padding: 10px;

}
</style>
