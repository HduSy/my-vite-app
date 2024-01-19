import { onMounted, onUnmounted, ref, Ref } from 'vue'

export default function useCountDown(lastTime: number): [time: Ref<number>, setTime: (time: number) => void] {
  const time = ref(lastTime) // 倒计时间
  // 重设时间计时 ⌛️
  const setTime = (t: number) => {
    clearTimeout(timer.value)
    startTime.value = Date.now()
    time.value = t
    calcDown()
  }

  const timer = ref(0) // setTimeout 计时器
  const startTime = ref(Date.now()) // 开始时间
  const interval = ref(1000) // 时间间隔

  const calcDown = () => {
    if(time.value < 0) {
      time.value = 0
      clearTimeout(timer.value)
      return
    }
    timer.value = setTimeout(() => {
      const now = Date.now()
      const past = now - startTime.value
      startTime.value = now
      const last = Math.round((time.value - past) / 1000) * 1000
      console.log('last time', last)
      time.value = last
      calcDown()
    }, interval.value)
  }
  onMounted(() => {
    calcDown()
  })
  onUnmounted(() => {
    clearTimeout(timer.value)
  })

  return [time, setTime]
}
