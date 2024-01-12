<script setup lang="ts">
import { onMounted, ref } from 'vue';
const listData = ref<Array<number>>([])
const containerRef = ref<HTMLDivElement>()
const listRef = ref<HTMLDivElement>()
const startY = ref(0)
const txt = ref('下拉刷新')
const distance = ref(0)
const loading = ref(false)

const loadItems = (): Promise<boolean> => {
  return new Promise((rs) => {
    setTimeout(() => {
      listData.value = Array.from({length:30}, (item,i) => i)
      rs(true)
    }, Math.random() * 1000)
  })
}

const handleTouchStart = (e: TouchEvent) => {
  startY.value = e.touches[0].pageY
}
const handleTouchMove = (e) => {
  const curY = e.touches[0].pageY
  distance.value = curY - startY.value
  const containerDiv = containerRef.value
  const listDiv = listRef.value
  if(containerDiv && containerDiv.scrollTop < 1) {
    if(distance.value > 30) {
      txt.value = '释放刷新'
    }
    if(distance.value < 60) {
      if(distance.value > 30) loading.value = true
      listDiv && (listDiv.style.transition = 'transform 0s')
      listDiv && (listDiv.style.transform = `translateY(${distance.value}px)`)
    }
  }
}
const handleTouchEnd = (e: TouchEvent) => {
  const listDiv = listRef.value
  if(listDiv) {
    listDiv.style.transition = 'transform 1s' // 回弹效果
    if(distance.value > 0 && distance.value < 60) {
      loading.value = false
      return listDiv.style.transform = 'translateY(0)'
    }
    if(distance.value > 60) {
      txt.value = '刷新中...'
      listDiv.style.transform = 'translateY(60px)'
      loadItems().then((res) => {
        txt.value = '刷新成功'
        setTimeout(() => {
          loading.value = false
          listDiv.style.transform = 'translateY(0)'
        }, 500)
      })
    }

  }
}

onMounted(async () => {
  await loadItems()
  const containDiv = containerRef.value
  if(containDiv) {
    containDiv.addEventListener('touchstart', handleTouchStart)
    containDiv.addEventListener('touchmove', handleTouchMove)
    containDiv.addEventListener('touchend', handleTouchEnd)
  }
})
</script>

<template>
  <div>下拉刷新列表</div>
  <div class="container" ref="containerRef">
    <div v-if="loading" class="loading">{{ txt }}</div>
    <div class="list" ref="listRef">
      <div class="list-item" v-for="(item, index) in listData" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 10px auto 0;
  width: 300px;
  height: 70vh;
  border: 1px solid black;
  overflow: auto;
  position: relative;
  .loading {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .list {
    &-item {
      height: 30px;
      border: 1px dashed black;
      margin-bottom: 10px;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
  }
}
</style>