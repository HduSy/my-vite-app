<script setup lang="ts">
import { StyleValue, computed, defineProps, onMounted, onUnmounted, ref } from 'vue';


const props = defineProps({
  width: Number,
  height: Number,
  itemHeight: Number,
})

const {width = 200, height = 200, itemHeight = 50} = props

let listData = ref<Array<any>>([]);
const vNode = ref<HTMLDivElement>()
const ioInstance = ref<IntersectionObserver>()
const loading = ref(false)
const index = ref(0)

/**
 * 监测列表底部虚节点曝光触底操作
 */
const observeEl = () => {
  ioInstance.value = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(async entry => {
      if(entry.isIntersecting) {
        console.log('曝光')
        const newItems = await loadItems()
        listData.value = [...listData.value, ...newItems]
        console.log(listData.value)
        // observer.unobserve(entry.target)
      }
    })
  }, {

  })
  ioInstance.value.observe(vNode.value)
}

// 外部容器高度
const containerStyle: StyleValue = {
  position: 'relative',
  width: `${width}px`,
  height: `${height}px`,
  overflow: 'auto',
}

// listData所有元素撑起盒子的实际高度
const contentStyle = computed(() => {
  return {
    width: '100%',
    height: `${itemHeight * listData.value.length}px`,
  }
})

const itemStyle = (index: number):StyleValue => ({
  height: `${itemHeight}px`,
  backgroundColor: index % 2 === 0 ? `#b478ed`:`#b1ed78`
})

// 模拟异步请求
const loadItems = (): Promise<Array<any>> => {
  loading.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('懒加载新数据')
      loading.value = false
      resolve(Array.from({length:10}, () => index.value++))
    }, Math.random() * 1000)
  })
}

onMounted(async () => {
  listData.value.push(...await loadItems())
  observeEl()
})
onUnmounted(() => {
  vNode.value && ioInstance && ioInstance.unobserve(vNode.value)
})
</script>

<template>
  <h3>传统懒加载</h3>
  <h4>解决不了列表数据逐渐庞大后长列表全渲染出来导致的性能下降</h4>
  <div class="container" :style="containerStyle">
    <div class="list" :style="contentStyle">
      <div class="item" v-for="(item, index) in listData" :style="itemStyle(index)">
        {{ item }}
      </div>
      <div class="v-node" ref="vNode"></div>
      <Transition name="fade">
        <div v-if="loading" class="loading">loading...</div>
      </Transition>
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
  margin: 0 auto;
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