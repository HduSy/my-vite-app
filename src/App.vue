<script setup>
import { onMounted } from 'vue';
import { receive } from './utils';

onMounted(()=>{
  receive('t', res => console.log(res))
})
</script>

<template>
  <router-view></router-view>
</template>