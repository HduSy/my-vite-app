<script setup lang="ts">
import { timestampFormat } from 'oh-my-funcs';
import { onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{ time: number }>(), {
  time: 15 * 60 * 1000
})

const { time } = props

const timer = ref<number|undefined>()
const day = ref(0)
const hour = ref(0)
const min = ref(0)
const ss = ref(0)
const ms = ref(0)
const exacuteTime = ref(0) // 执行时间
const lastTime = ref(time) // 剩余时间

const countDown = (dr: number) => {
  exacuteTime.value = Date.now()
  timer.value && clearTimeout(timer.value)
  if(dr < 0) {
    lastTime.value = 0
    return
  }
  const {day: d, h, min: m, s, ms: mms} = timestampFormat(dr)
  day.value = d ?? 0
  hour.value = h ?? 0
  min.value = m ?? 0
  ss.value = s ?? 0
  ms.value = mms ?? 0

  // 定时器只能保证，何时将回调推入事件循环，而非何时执行
  timer.value = setTimeout(() => {
    const now = Date.now()
    const pastTime = now - exacuteTime.value // 当前时间 - 倒计时开始时间 = 过去了多少时间
    exacuteTime.value = now
    lastTime.value = Math.round((dr - pastTime)/1000)*1000 // 剩下的时间 = 倒计时时间 - 过去了多少时间
    console.log(`剩余时间: `, lastTime.value)
    countDown(lastTime.value)
  }, 1000)
}

onMounted(() => {
  countDown(lastTime.value)
})
</script>

<template>
  <div>秒表: {{ `00${hour}`.slice(-2) }}时{{ `00${min}`.slice(-2) }}分{{ `00${ss}`.slice(-2) }}秒</div>
  <div>{{ lastTime / 1000 }}</div>
</template>

<style lang="scss" scoped>
</style>