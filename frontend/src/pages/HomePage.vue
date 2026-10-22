<script setup>
import AddTask from '@/components/AddTask.vue';
import Header from '@/components/Header.vue';
import TaskList from '@/components/TaskList.vue';
import { ref } from 'vue';

const taskListRef = ref(null);

const handleTaskChanged = () => {
  taskListRef.value?.loadTasks();
}
</script>

<template>
  <div class="min-h-screen w-full bg-[#fef9f7] relative">
    <!-- Warm Soft Coral & Cream Background -->
    <div
      class="absolute inset-0 z-0 pointer-events-none"
      :style="{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(255, 160, 146, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 244, 228, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 160, 146, 0.15) 0%, transparent 50%)`
      }"
    ></div>

    <!-- Your Content/Components -->
    <div class="relative z-10 container pt-8 mx-auto">
      <div class="w-full max-w-2xl p-6 mx-auto space-y-6">
        <!-- Dau trang - Header -->
        <Header/>

        <!-- Them nhiem vu -->
        <AddTask @taskAdded="handleTaskChanged"/>


        <!-- Danh sach nhiem vu -->
        <TaskList ref="taskListRef"/>

          <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">

          </div>
    

        
      </div>
    </div>
  </div>
</template>
