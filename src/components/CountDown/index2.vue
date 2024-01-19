<script setup lang="ts">
import useCountDown from '../../hooks/useCountDown';
// import { useCountDown, useDevicePixelRatio } from 'oh-my-vueuse';
import { onMounted } from 'vue';

const [time, setTime] = useCountDown(5 * 1000)
// const [time2,  setTime2] = useCountDown(6 * 1000)
// const  [ pixelRatio ] = useDevicePixelRatio()

// console.log('pixelRatio', pixelRatio.value)

const show = () => {
  // console.log(time.value, time2.value)
  const idx = requestAnimationFrame(show)
  if(time.value <= 0) cancelAnimationFrame(idx)
}
onMounted(() => {
  show()
})
/**
 * 唯独hook里拿不到
 */
// const x = computed(() => time.value)
// watch(time, (newv) => {
//   console.log(newv, 'watch')
// })
</script>

<template>
  <!-- <div>秒表: {{ `00${hour}`.slice(-2) }}时{{ `00${min}`.slice(-2) }}分{{ `00${ss}`.slice(-2) }}秒</div> -->
  <div>{{ time / 1000 }}</div>
  <div class="btn-wraper">
    <div class="btn" @click="() => setTime(5 * 1000)">倒计时5s</div>
    <div class="btn" @click="() => setTime(15 * 60 * 1000)">倒计时10s</div>
  </div>
</template>

<style lang="scss" scoped>
.btn-wraper {
  width: 220px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .btn {
    width: 100px;
    height: 30px;
    cursor: pointer;
    border-radius: 25px;
    border: 1px solid #000;
    box-shadow: 3px 2px 2px #6f6c6c;
    user-select: none;
  }
}
</style>