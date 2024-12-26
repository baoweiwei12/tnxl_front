<template>
  <component :is="layoutComponent" />
</template>

<script setup>
import { computed } from 'vue';
import MainLayout from './views/Index.vue';
import LoginView from './views/Login/index.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layoutComponent = computed(() => {
  return route.path === '/login' ? LoginView : MainLayout;
});
</script>
