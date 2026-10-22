<script setup>
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'
import { RouterView } from 'vue-router'
</script>

<template>
  <Toaster/>
  <RouterView />
</template>
