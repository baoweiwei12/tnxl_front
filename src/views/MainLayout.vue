<template>
    <div class="main-layout">
        <el-container style="height: 100%">
            <el-aside>
                <el-menu :default-active="currentPath" class="el-menu-vertical-demo" @select="handleMenuSelect">
                    <el-menu-item v-for="item in filteredMenu" :key="item.path" :index="item.path">
                        <el-icon v-if="item.icon">
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.text }}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-tag type="primary">{{
                        userMe == null ? "未登录" : userMe.username
                    }}</el-tag>
                    <el-dropdown>
                        <el-icon style="height: 100%; margin-left: 10px; margin-right: 20px">
                            <Tools />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
                        </keep-alive>
                        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { House, User, School, Stamp, Wallet } from "@element-plus/icons-vue";
import { userStorage, tokenStorage, clearStorage } from "@/storage";


const isSchoolSwitcherVisible = ref(false);
const route = useRoute();
const router = useRouter();
const currentPath = ref(route.path);
const menu = ref([
    {
        text: "首页",
        icon: House,
        path: "/",
        role: ["product_admin", "school_admin"],
    }, {
        text: "test",
        icon: User,
        path: "/test",
        role: ["admin"],
    },
    {
        text: "用户管理",
        icon: User,
        path: "/user",
        role: ["admin", "group_admin"],
    },
    {
        text: "分组管理",
        icon: School,
        path: "/group",
        role: ["admin"],
    },
    {
        text: "体能信息",
        icon: School,
        path: "/Stamina",
        role: ["admin", "group_admin"],
    }
]);

const userMe = ref({});

onMounted(() => {
    userMe.value = userStorage.get();

    if (userMe.value === null) {
        router.push("/login");
    }
});

const filteredMenu = computed(() => {
    if (!userMe.value) {
        router.push("/login");
        return;
    }
    return menu.value.filter((item) => item.role.includes(userMe.value.role));
});

const handleMenuSelect = (index) => {

    router.push(index);
};

const handleLogout = async () => {
    clearStorage();
    await router.push("/login");
};




</script>

<style scoped>
.main-layout {
    height: 98vh;
    background-color: #fff;
}

.el-header {
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    gap: 10px;
}

.el-aside {
    width: 180px;
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    text-align: center;
    border-right: 1px solid #e0e0e0;
}

.el-main {
    background-color: #ffffff;
    color: #333;
    padding: 20px;
}
</style>
