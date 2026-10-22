<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
    <img src="/404_NotFound.png" alt="not found" class="max-w-full mb-6 w-96">
    <p class="text-xl font-semibold mb-4">Bạn đang vào vùng cấm</p>
    <RouterLink to="/" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Quay về Trang chủ</RouterLink>
  </div>
</template>