<script lang="ts" setup>
import lottieWeb, { LottiePlayer } from 'lottie-web';
import { onMounted, ref } from 'vue';
import loading from '../assets/loading/loading.json';

const el = ref(null)
let animation: LottiePlayer
const played = ref(false)
const playorstopLottieAnime = () => {
  if(animation && !played.value) {
    animation.play()
    played.value = true
  } else {
    animation.pause()
    played.value = false
  }
}
onMounted(() => {
  animation = lottieWeb.loadAnimation({
    container: el.value,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: loading
  })
})
</script>

<template>
  <div id="container" ref="el"></div>
  <div class="btn" @click="playorstopLottieAnime">点击切换Lottie动画播放状态</div>
</template>


<style scoped lang="scss">
#container {
  width: 200px;
  height: 200px;
  background-color: #06aeec;
}
.btn {
  padding: 10px;
  border-radius: 15px;
  border: 1px solid black;
  cursor: pointer;
  margin: 10px auto 0;
}
</style>