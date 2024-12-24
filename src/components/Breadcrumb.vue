<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentRoute.meta.text }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router';
const currentRoute = useRoute();
</script>