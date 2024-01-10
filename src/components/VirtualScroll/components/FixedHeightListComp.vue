<script setup lang="ts">
import { StyleValue, computed, defineProps, onMounted, onUnmounted, ref } from 'vue';

import { throttle } from '@utils';

const props = defineProps({
  width: Number,
  height: Number,
  itemHeight: Number,
  listData: Array<number>
})

const containerRef = ref<HTMLDivElement>()
const currentScollTop = ref(0)
const visiableData = ref<Array<number>>([])

const {width = 200, height = 200, itemHeight = 25, listData = []} = props

// 外部容器高度
const containerStyle: StyleValue = {
  position: 'relative',
  width: `${width}px`,
  height: `${height}px`,
  overflow: 'auto',
}

// listData所有元素撑起盒子的实际高度
const contentStyle: StyleValue = {
  width: '100%',
  height: `${itemHeight * listData?.length}px`
}

const itemStyle = computed((index: number):StyleValue => ({
  position: 'absolute',
  width: '100%',
  height: `${itemHeight}px`,
  top: itemHeight * index,
  backgroundColor: index % 2 === 0 ? `#b478ed`:`#b1ed78`
}))

const styles = ref<Array<StyleValue>>()

const updateVisiableItems = () => {
  const visiableIndex = Math.floor(currentScollTop.value/ itemHeight) // 可视区开始索引
  const startIndex = Math.max(0, visiableIndex - 5) // 上缓冲区
  const visiableSize = Math.ceil(height/itemHeight) // 可视区item数
  const endIndex = Math.min(listData.length, startIndex + visiableSize + 10) // 下缓冲区
  visiableData.value = listData.slice(startIndex, endIndex)
  // 动态计算item style.top
  const arr = [] as any
  for(let i = startIndex; i <= endIndex; i++) {
    arr.push({
      position: 'absolute',
      width: '100%',
      height: `${itemHeight}px`,
      top: `${itemHeight * i}px`,
      backgroundColor: i % 2 === 0 ? `#b478ed`:`#b1ed78`
    })
  }
  styles.value = arr
}
// scroll事件节流，频繁触发，回调函数每100s内只执行一次
const containerScrollTop = throttle(() => {
  currentScollTop.value = containerRef.value?.scrollTop || containerRef.value?.scrollTop || 0
  updateVisiableItems()
}, 100)



onMounted(() => {
  updateVisiableItems()
  containerRef.value?.addEventListener('scroll', containerScrollTop, false)
})
onUnmounted(() => {
  containerRef.value?.removeEventListener('scroll', containerScrollTop, false)
})
</script>

<template>
  <div ref="containerRef" :style="containerStyle">
    <div :style="contentStyle">
      <div v-for="(item, index) in visiableData" :style="styles[index]">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>