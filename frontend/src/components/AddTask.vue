<script setup>
import { Plus } from 'lucide-vue-next';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import api from '@/lib/axios';

const emit = defineEmits(['taskAdded']);
const title = ref('');
const dueDate = ref('');

const addTask = async () => {
  if (!title.value.trim()) {
    toast.error("Bạn cần nhập nội dung nhiệm vụ!");
    return;
  }
  try {
    //Goi api de them task vao torng backend
    await api.post('/todos', {
      title: title.value.trim(),
      due_date: dueDate.value || null,
    });
    toast.success("Nhiệm vụ đã được thêm thành công!");
    //Tai lai danh sach task
    emit('taskAdded');
    //Reset lai o nhao
    title.value = '';
    dueDate.value = '';
  } catch (error) {
    console.error("Lỗi xảy ra khi thêm nhiệm vụ", error);
    toast.error("Lỗi xảy ra khi thêm nhiệm vụ");
  } 
}


</script>

<template>
  <Card class="p-6 border-0 bg-gradient-card shadow-custom-lg">
    <div class="flex flex-col gap-3 sm:flex-row">
      <Input
        v-model="title"
        type="text"
        placeholder="Cần phải làm gì?"
        class="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50"
        @keyup.enter="addTask"
      />
      <Input
        v-model="dueDate"
        type="date"
        placeholder="Thời hạn"
        class="h-12 sm:w-44 border-border/50"
        style="color:#333333"
      />
      <Button variant="gradient" size="xl" class="px-6 cursor-pointer" @click="addTask">
        <Plus class="size-5" />
        Add
      </Button>
    </div>
    
  </Card>
</template>