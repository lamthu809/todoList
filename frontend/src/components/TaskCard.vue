<script setup>
import { ref } from 'vue';
import { Check, X, SquarePen, Trash2, Calendar, Clock } from 'lucide-vue-next';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'vue-sonner';
import api from '@/lib/axios';


const props = defineProps({
  task: Object
});

const emit = defineEmits(['deleted']);

const isEditing = ref(false);
const newTitle = ref(props.task?.title || '');

const handleStartEdit = () => {
  newTitle.value = props.task.title;
  isEditing.value = true;
};

const handleSave = () => {
  if (newTitle.value.trim()) {
    props.task.title = newTitle.value.trim();
  }
  isEditing.value = false;
};

const handleCancel = () => {
  isEditing.value = false;
};
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

const deleteTask = async (taskId) => {
  try {
    await api.delete(`/todos/${taskId}`);
    toast.success('Nhiệm vụ đã xóa thành công!');
    emit('deleted');
  } catch (error) {
    console.error("Lỗi xảy ra khi xóa nhiệm vụ!", error);
    toast.error("Lỗi xảy ra khi xóa nhiệm vụ!");
  }
}
</script>

<template>
  <Card class="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
    
    <!-- Chinh sua -->
    <div v-if="isEditing" class="flex items-center gap-2 w-full">
      <Input 
        v-model="newTitle"
        placeholder="Cần phải làm gì?"
        class="flex-1 h-9 text-base border-border/50 focus:border-primary/50"
        type="text"
        autofocus
        @keyup.enter="handleSave"
        @keyup.esc="handleCancel"
      />
      <!-- Nút Lưu -->
      <Button 
        variant="ghost" 
        size="icon" 
        class="size-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
        @click="handleSave"
      >
        <Check class="size-4" />
      </Button>
      <!-- Nút Hủy -->
      <Button 
        variant="ghost" 
        size="icon" 
        class="size-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        @click="handleCancel"
      >
        <X class="size-4" />
      </Button>
    </div>

    <!-- Binh thuong -->
    <div v-else class="flex items-center justify-between w-full gap-3">
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <!-- Checkbox trạng thái -->
        <input 
          type="checkbox" 
          v-model="task.status"
          true-value="completed"
          false-value="active" 
          class="size-5 rounded cursor-pointer accent-orange-500" 
        />
        <!-- Tên công việc (gạch ngang nếu completed) -->
        <div class="text-left flex-1">
          <span 
          :class="{ 
            'line-through text-slate-400': task.status === 'completed', 
            'text-slate-800 font-medium': task.status === 'active' 
          }"
          class="truncate cursor-pointer select-none"
          @dblclick="handleStartEdit"
        >
          {{ task.title }}
        </span>
        <!-- Ngay thang -->
        <div v-if="task.created_at || task.createdAt" class="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
          <Calendar class="size-3" />
          <span>{{ formatDate(task.created_at || task.createdAt) }}</span>
          <template v-if="task.complete_at || task.completedAt">
            <span> - </span>
            <Calendar class="size-3 text-emerald-500" />
            <span class="text-emerald-600 font-medium">{{ formatDate(task.complete_at || task.completedAt) }}</span>
          </template>
          <div 
            v-if="task.due_date || task.dueDate" 
            class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-medium"
          >
            <Clock class="size-3 text-amber-500" />
            <span>Hạn: {{ formatDate(task.due_date || task.dueDate) }}</span>
          </div>
        </div> 
      </div>
      </div>

      <!-- Các nút thao tác khi hover vào card -->
      <div class="hidden gap-1 group-hover:inline-flex transition-all">
        <!-- Nút xóa -->
        <Button
          variant="ghost"
          size="icon"
          class="flex-shrink-0 transition-color size-8 text-muted-foreground hover:text-destructive"
          @click="deleteTask(task.id)"
          >
          <Trash2 class="size-4" />
        </Button>
      </div>
    </div>

  </Card>
</template>