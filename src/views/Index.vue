<template>
    <div class="layout-container">
        <!-- 侧边栏 -->
        <div class="sidebar" :class="{ 'sidebar-collapse': isCollapse }">
            <div class="logo-container">
                <img src="@/assets/logo.png" alt="Logo" class="logo-image" />
                <span class="logo-text" v-show="!isCollapse">{{ systemName }}</span>
            </div>

            <el-menu :default-active="currentPath" class="sidebar-menu" :collapse="isCollapse" popper-effect="dark"
                @select="handleMenuSelect" :unique-opened="false" background-color="transparent"
                :text-color="isCollapse ? '#667eea' : '#fff'" active-text-color="#409EFF">
                <template v-for="item in filteredMenu" :key="item.path">
                    <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
                        <template #title>
                            <el-icon>
                                <component :is="item.meta.icon" />
                            </el-icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item v-for="child in item.children" :key="child.path"
                            :index="`${item.path}/${child.path}`">
                            <el-icon>
                                <component :is="child.meta.icon" />
                            </el-icon>
                            <template #title>{{ child.name }}</template>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else :index="item.path">
                        <el-icon>
                            <component :is="item.meta.icon" />
                        </el-icon>
                        <template #title>
                            <span>{{ item.name }}</span>
                        </template>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>

        <!-- 主要内容区 -->
        <div class="main-container">
            <!-- 顶部导航栏 -->
            <div class="navbar">
                <div class="navbar-left">
                    <el-icon class="collapse-icon" @click="toggleSidebar">
                        <Fold v-if="!isCollapse" />
                        <Expand v-else />
                    </el-icon>
                    <Breadcrumb />
                </div>

                <div class="navbar-right">
                    <el-dropdown trigger="click">
                        <div class="avatar-container">
                            <el-avatar :size="32" :icon="UserFilled" />
                            <span class="username">{{ userMe?.full_name || '未登录' }}</span>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="handleLogout">
                                    <el-icon>
                                        <SwitchButton />
                                    </el-icon>
                                    <span>退出登录</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>

            <!-- 内容区 -->
            <div class="content">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
                    </keep-alive>
                    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserFilled, SwitchButton, Fold, Expand } from '@element-plus/icons-vue';
import { userStorage, clearStorage } from "@/storage";
import { ElMessageBox } from 'element-plus';
import Breadcrumb from "@/components/Breadcrumb.vue";
import { cloneDeep } from 'lodash-es';

const systemName = process.env.VUE_APP_SYSTEM_NAME;

// 组件引用
const route = useRoute();
const router = useRouter();
const currentPath = ref(route.path);
const menu = ref(cloneDeep(router.getRoutes()));
const userMe = ref({});
const isCollapse = ref(false);

// 监听路由变化，更新 currentPath
watch(
    () => route.path,
    (newPath) => {
        currentPath.value = newPath;
    }
);

// 计算菜单项
const filteredMenu = computed(() => {
    if (!userMe.value) {
        router.push("/login");
        return [];
    }

    return menu.value
        .map((item) => {
            const pathParts = item.path.replace(/^\/|\/$/g, '').split('/');
            const isFirstLevel = pathParts.length <= 1;

            if (isFirstLevel && item.meta?.show === true && item.meta?.role.includes(userMe.value.role)) {
                return {
                    ...item,
                    children: item.children?.filter(
                        (child) => child.meta?.show === true && child.meta?.role.includes(userMe.value.role)
                    ) || []
                };
            }
            return null;
        })
        .filter(Boolean); // 移除空值
});

// 方法定义
const toggleSidebar = () => {
    isCollapse.value = !isCollapse.value;
};

const handleMenuSelect = async (index) => {
    await router.push(index);
};

const handleLogout = () => {
    ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        clearStorage();
        router.push("/login");
    }).catch(() => { });
};

// 生命周期钩子
onMounted(() => {
    const userData = userStorage.get();
    if (!userData) {
        router.push("/login");
    } else {
        userMe.value = userData;
    }
});
</script>

<style scoped>
.layout-container {
    display: flex;
    height: 98vh;
    background-color: rgba(245, 245, 245);
}

.sidebar {
    width: 240px;
    height: 100%;
    background: linear-gradient(180deg, #304156 0%, #1f2d3d 100%);
    transition: width 0.3s;
    overflow: hidden;
    position: relative;
    z-index: 1000;
}

.sidebar-collapse {
    width: 64px;
}

.logo-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.1);
}

.logo-image {
    width: 32px;
    height: 32px;

}

.logo-text {
    margin-left: 12px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.3s;
}

.sidebar-menu {
    border: none;
    background-color: transparent;
}


.main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.navbar {
    height: 60px;
    background: linear-gradient(90deg, rgba(236, 245, 255, 1) 0%, rgba(245, 245, 245, 1) 100%);
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
}

.navbar-left {
    display: flex;
    align-items: center;
}

.navbar-right {
    display: flex;
    align-items: center;
}

.collapse-icon {
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    margin-right: 16px;
    color: #666;
}

.collapse-icon:hover {
    background: rgba(0, 0, 0, .025);
}

.avatar-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 8px;
}

.username {
    margin-left: 8px;
    font-size: 14px;
    color: #666;
}

.content {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
}

:deep(.el-menu) {
    border-right: none;
}

:deep(.el-menu-item) {
    border-left: 3px solid transparent;
}

:deep(.el-menu-item.is-active) {
    background: rgba(64, 158, 255, 0.1) !important;
    border-left: 3px solid #409EFF;
}

:deep(.el-dropdown-menu__item) {
    display: flex;
    align-items: center;
    gap: 8px;
}

:deep(.el-sub-menu .el-menu-item) {
    min-width: unset;
    background-color: #1f2d3d;
}

:deep(.el-sub-menu .el-menu-item:hover) {
    background-color: #263445;
}

:deep(.el-sub-menu__title) {
    border-left: 3px solid transparent;
}

:deep(.el-sub-menu__title:hover) {
    background-color: #263445;
}

:deep(.el-menu .el-menu--popup .el-menu--popup-right-start) {
    --el-menu-text-color: #fff;
    --el-menu-hover-text-color: #fff;
    --el-menu-bg-color: #304156 !important;
    --el-menu-hover-bg-color: rgba(0, 0, 0, 0.2);
    --el-menu-active-color: #409EFF;
    --el-menu-level: 1;
}
</style>