<template>
    <div class="login-container">
        <div class="login-box">
            <!-- 左侧装饰区域 -->
            <div class="login-decoration">
                <div class="decoration-content">
                    <h1>欢迎使用</h1>
                    <p>{{ systemName }}</p>
                    <div class="decoration-image">
                        <img src="@/assets/logo.png" alt="Logo">
                    </div>
                </div>
            </div>

            <!-- 右侧登录表单 -->
            <div class="login-form">
                <div class="form-header">
                    <h2>账号登录</h2>
                    <p>请输入您的账号和密码</p>
                </div>

                <el-form :model="loginForm" class="form-content">
                    <el-form-item>
                        <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User" size="large" />
                    </el-form-item>

                    <el-form-item>
                        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock"
                            :show-password="true" size="large" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="login-button" @click="handleLogin" size="large"
                            :loading="loading">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { login, getUsersMe } from '@/api/user';
import { tokenStorage, userStorage } from '@/storage';
import { User, Lock } from '@element-plus/icons-vue';
import router from '@/router';
const systemName = process.env.VUE_APP_SYSTEM_NAME;
const loginForm = ref({
    username: '',
    password: '',
});

const loading = ref(false);

const handleLogin = async () => {
    if (!loginForm.value.username || !loginForm.value.password) {
        ElMessage.error('请输入用户名和密码');
        return;
    }

    try {
        loading.value = true;
        const resp = await login(loginForm.value.username, loginForm.value.password);
        tokenStorage.set(resp.data.access_token);

        const userResp = await getUsersMe();
        userStorage.set(userResp.data);

        ElMessage.success('登录成功');
        router.push('/');
    } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
            loginForm.value.password = '';
            ElMessage.error('用户名或密码错误');
            return;
        }
        if (err.response?.status === 404) {
            loginForm.value.password = '';
            ElMessage.error('用户不存在');
            return;
        }
        ElMessage.error('登录失败，请稍后重试');
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.login-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-box {
    width: 900px;
    height: 560px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
    display: flex;
    overflow: hidden;
}

.login-decoration {
    flex: 1;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.decoration-content {
    text-align: center;
}

.decoration-content h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    font-weight: 600;
}

.decoration-content p {
    font-size: 1.2em;
    opacity: 0.9;
}

.decoration-image {
    margin-top: 40px;
}

.decoration-image img {
    width: 180px;
    height: 180px;
    object-fit: contain;
}

.login-form {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form-header {
    text-align: center;
    margin-bottom: 40px;
}

.form-header h2 {
    font-size: 1.8em;
    color: #333;
    margin-bottom: 10px;
}

.form-header p {
    color: #666;
    font-size: 1em;
}

.form-content {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
}

.login-button {
    width: 100%;
    height: 45px;
    font-size: 16px;
    margin-top: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
}

.login-button:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    padding: 1px 15px;
}

:deep(.el-input__wrapper:hover) {
    box-shadow: 0 0 0 1px #c0c4cc inset;
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #764ba2 inset !important;
}
</style>
