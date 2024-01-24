<template>
  <div>v-model/emits: {{ name }}</div>
</template>
<script setup lang="ts">
const name = defineModel()

setTimeout(() => {
  name.value = 'Hello'
}, 2000)

</script>
<style lang="scss" scoped>
  
</style>