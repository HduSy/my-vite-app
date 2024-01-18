<script setup lang="ts">
import { timestampFormat } from 'oh-my-funcs';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = withDefaults(defineProps<{
  time: string|number,
  isMilliSecond: boolean
}>(), {
  time: 1 * 5 * 1000,
  isMilliSecond: true
})

const { time, isMilliSecond } = props

const timer = ref<number|undefined>()
const day = ref(0)
const hour = ref(0)
const min = ref(0)
const ss = ref(0)
const ms = ref(0)
const curTime = ref(0)

// 单位统一转化为 s
const duration = computed(() => {
  return isMilliSecond ? +time : +time * 1000
})

const countDown = (duration: number) => {
  curTime.value = Date.now()
  timer.value && clearTimeout(timer.value)
  if(duration < 0) return
  const {day: d, h, min: m, s, ms: mms} = timestampFormat(duration)
  day.value = d ?? 0
  hour.value = h ?? 0
  min.value = m ?? 0
  ss.value = s ?? 0
  ms.value = mms ?? 0

  // 定时器只能保证，何时将回调推入事件循环，而非何时执行
  timer.value = setTimeout(() => {
    const now = Date.now()
    const diffTime = now - curTime.value
    curTime.value = now
    countDown(Math.round((duration - diffTime)/1000)*1000)
  }, 1000)
}

function setTime(time: number){
  router.replace({
    query: {
      time
    }
  })
}
// 动态修改路由 query 参数
const router = useRouter()
watch(router.currentRoute, (cur, pre) => {
  const { query } = cur
  const lastTime = query.time ?? time ?? 0
  countDown(+lastTime * 1000)
}, { immediate: true })

watch(duration, (cur, pre) => {
  countDown(cur)
})


onMounted(() => {
  countDown(duration.value)
})
</script>

<template>
  <div>秒表: {{ `00${hour}`.slice(-2) }}时{{ `00${min}`.slice(-2) }}分{{ `00${ss}`.slice(-2) }}秒</div>
  <div class="btn-wraper">
    <div class="btn" @click="() => setTime(5)">倒计时5s</div>
    <div class="btn" @click="() => setTime(10)">倒计时10s</div>
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