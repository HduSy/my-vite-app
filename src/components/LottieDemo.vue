<script lang="ts" setup>
import lottieWeb from 'lottie-web';
import { onMounted, ref } from 'vue';
import loading from '../assets/loading/loading.json';

const el = ref(null)
onMounted(() => {
  lottieWeb.loadAnimation({
    container: el.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: loading
  })
})
</script>

<template>
  <div id="container" ref="el"></div>
</template>


<style scoped lang="scss">
#container {
  width: 200px;
  height: 200px;
  background-color: #06aeec;
}
</style>