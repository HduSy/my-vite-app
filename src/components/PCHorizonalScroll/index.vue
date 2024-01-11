<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
/**
 * offsetX 鼠标指针相对于目标节点的内填充边的 X 轴坐标
 * clientX 鼠标指针相对于局部 DOM 元素的 X 轴坐标
 */
const list = ref<Array<number>>(Array.from({length:10}, (item, i) => i))
const containerRef = ref<HTMLDivElement>()
const listRef = ref<HTMLDivElement>()

var startX = 0
var translateX = 0 // 横向滑动的距离
var startTranslate // 每次滑动的起始值
var isSlide = false // 是否滑动
var maxWidth = ref(0) //最大滑动长度

function handleMouseDown(e) {
  isSlide = true //开始滑动
  startX = e.clientX // 开始滑动坐标
  startTranslate = translateX
}
/**
 * translateX !important
 */
function handleMouseMove(e) {
  if(isSlide) {
    const currentX = e.clientX // 当前滑动x坐标
    if (startTranslate == 0 && currentX > startX) return
    translateX = currentX - startX + startTranslate  // 横向滑动的终点坐标值
    if(translateX > 0) { //假如超过零点，回到原点
  	  translateX = 0
    } else if (translateX <= maxWidth.value) {  //超过最大坐标，回到末点
      translateX = maxWidth.value
    }
    listRef.value.style.transform = "translate(" + translateX + "px,0px) translateZ(0px)";
  }
}
function handleMouseLeave() {
  isSlide = false
}
function handleMouseUp() {
  isSlide = false
}
            
onMounted(() => {
  const containerDiv = containerRef.value
  maxWidth.value = -((list.value.length-1) * 110 + 100 - 700)
  if(containerDiv) {
    containerDiv.addEventListener("mousedown", handleMouseDown, false)
    containerDiv.addEventListener("mousemove", handleMouseMove, false)
    containerDiv.addEventListener("mouseup", handleMouseUp, false)
    containerDiv.addEventListener("mouseleave", handleMouseLeave, false)
  }
})
onBeforeUnmount(() => {
  const containerDiv = containerRef.value
  if(containerDiv) {
    containerDiv.removeEventListener("mousedown", handleMouseDown, false)
    containerDiv.removeEventListener("mousemove", handleMouseMove, false)
    containerDiv.removeEventListener("mouseup", handleMouseUp, false)
    containerDiv.removeEventListener("mouseleave", handleMouseLeave, false)
  }
})
</script>

<template>
  <div class="container" ref="containerRef">
    <div class="list" ref="listRef">
      <div class="list-item" v-for="(item, index) in list">{{ index }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 700px;
  height: 200px;
  overflow-x: scroll;
  border: 1px solid #ccc;
  position: relative;
  padding: 0 10px;
  .list {
    display: flex;
    flex-direction: row;
    user-select: none;
    transition: 0.8s all ease;
    transition-duration: .3s;
    &:hover {
      cursor: pointer;
    }
    &-item {
      &:last-child {
        margin-right: 0;
      }
      flex-shrink: 0;
      width: 100px;
      height: 200px;
      background-color: red;
      margin-right: 10px;
      user-select: none;
    }
  }
}
</style>