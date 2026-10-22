<script setup>
import { Circle } from 'lucide-vue-next';
import { Card } from './ui/card';
</script>
<template>
  
  <Card class="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
    <div class="space-y-3">
        <Circle class="mx-auto size-12 text-muted-foreground"/>
        <div>
            <h3 class="font-medium text-foreground"> Không có nhiệm vụ nào!</h3>
        </div>
    </div>

  </Card>
</template>