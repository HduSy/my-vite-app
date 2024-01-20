<script setup lang="ts">
import { onMounted } from 'vue';
import useCountDown from '../../hooks/useCountDownRaf';

const [time, setTime] = useCountDown(15 * 60 * 1000)

const show = () => {
  const idx = requestAnimationFrame(show)
  if(time.value <= 0) cancelAnimationFrame(idx)
}
onMounted(() => {
  show()
})
</script>

<template>
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