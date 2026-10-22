<script setup>
import { ref, computed, onMounted } from 'vue';
import TaskEmptyState from './TaskEmptyState.vue';
import TaskCard from './TaskCard.vue';
import { fetchTasks } from '@/lib/api'; // Import hàm gọi API

    const tasks = ref([]) //Mang danh sach cong viec
    const isLoading = ref(true);
    const loadTasks = async () => { //Tu dong goi backend de lay toan bo ds task
    try {
        isLoading.value = true;
        tasks.value = await fetchTasks();
    } catch (error) {
        console.error('Không thể tải task:', error);
    } finally {
        isLoading.value = false;
    }
    };
    onMounted(() => {
        loadTasks();
    });

    // const filteredTasks = computed (() => {
    //     return tasks.value
    // })

    const completedCount = computed (() => {
        return tasks.value.filter(task => task.status === 'completed').length
    })

    const activeCount = computed (() => {
        return tasks.value.filter(task => task.status === 'active').length
    })
    defineExpose({ loadTasks });
</script>

<template>
  <div v-if="isLoading" class="text-center py-6 text-slate-400">
    Đang tải công việc từ cơ sở dữ liệu...
  </div>
  <div v-else class="space-y-3">
    <!-- Khi rỗng -->
    <TaskEmptyState v-if="tasks.length === 0" />
    <!-- Khi có dữ liệu -->
    <div v-else class="space-y-3">
      <div class="flex items-center justify-between p-3 text-sm rounded-lg bg-slate-100 text-slate-600">
        <span>Chưa hoàn thành: <strong class="text-orange-500">{{ activeCount }}</strong></span>
        <span>Đã hoàn thành: <strong class="text-emerald-600">{{ completedCount }}</strong></span>
        <span>Tổng cộng: <strong>{{ tasks.length }}</strong></span>
      </div>
      <TaskCard 
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @deleted="loadTasks"
      />
    </div>
  </div>
</template>
