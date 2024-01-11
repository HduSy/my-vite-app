<script setup lang="ts">
import { StyleValue, computed, defineProps, onMounted, onUnmounted, ref } from 'vue';

import { throttle } from '@utils';

const props = defineProps({
  width: Number,
  height: Number,
  itemHeight: Number,
})

const { width = 200, height = 200, itemHeight = 50} = props

const currentScollTop = ref(0)
const containerRef = ref<HTMLDivElement>()
let listData = ref<Array<any>>(Array.from({length: 10000}, (item, i) => i)); // 长列表
const visiableData = ref<Array<number>>([])
const visiableStyles = ref<Array<StyleValue>>([])

// 外部容器高度，内容区存在滚动，监听滚动的目标元素
const containerStyle: StyleValue = {
  position: 'relative',
  width: `${width}px`,
  height: `${height}px`,
  overflow: 'auto',
}
// 所有元素撑起盒子的实际高度，超出container，产生滚动
const contentStyle = computed(() => {
  return {
    width: '100%',
    height: `${itemHeight * listData.value.length}px`,
  }
})
// 更新可视区items
const updateVisiableItems = () => {
  const visiableIndex = Math.floor(currentScollTop.value/ itemHeight)
  const startIndex = Math.max(0, visiableIndex - 5)
  const visiableSize = Math.ceil(height/itemHeight)
  const endIndex = Math.min(listData.value.length, startIndex + visiableSize + 7)
  visiableData.value = listData.value.slice(startIndex, endIndex + 1)
  console.log(`可视区开始索引 ${visiableIndex}`)
  console.log(`上缓冲区 ${startIndex}`)
  console.log(`可视区item数 ${visiableSize}`)
  console.log(`下缓冲区 ${endIndex}`)
  console.log(`visiableData `, visiableData.value)
  // 动态计算item style.top
  let arr = [] as any
  for(let i = startIndex; i <= endIndex; i++) {
    arr.push({
      position: 'absolute',
      height: `${itemHeight}px`,
      top: `${itemHeight * i}px`,
      backgroundColor: i % 2 === 0 ? `#b478ed`:`#b1ed78`
    })
  }
  visiableStyles.value = arr
}
// scroll事件节流，频繁触发，回调函数每100ms内只执行一次
const containerScrollTop = throttle(() => {
  const scrollTarget = containerRef.value
  currentScollTop.value = scrollTarget?.scrollTop || scrollTarget?.scrollTop || 0
  updateVisiableItems()
}, 100)

onMounted(async () => {
  updateVisiableItems()
  containerRef.value?.addEventListener('scroll', containerScrollTop, false)
})
onUnmounted(() => {
  containerRef.value?.removeEventListener('scroll', containerScrollTop, false)
})
</script>

<template>
  <h3>固定高度虚拟列表</h3>
  <div class="container" ref="containerRef" :style="containerStyle">
    <div class="list" :style="contentStyle">
      <div class="item" v-for="(item, index) in visiableData" :style="visiableStyles[index]">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.container {
  border: 1px solid black;
  .list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .item {
      width: 100%;
    }
    .v-node {
      height: 1px;
    }
    .loading {

    }
  }
}
</style>