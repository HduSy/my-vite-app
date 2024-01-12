<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface IProps {
  containerWidth?: number
}
const props = withDefaults(defineProps<IProps>(), {
  containerWidth: 700
})

const { containerWidth = 700 } = props
/**
 * offsetX 鼠标指针相对于目标节点的内填充边的 X 轴坐标
 * clientX 鼠标指针相对于局部 DOM 元素的 X 轴坐标
 */
const list = ref<Array<number>>(Array.from({length:10}, (item, i) => i))
const containerRef = ref<HTMLDivElement>()
const listRef = ref<HTMLDivElement>()

var isSlide = false // 滑动前提条件是，指定[元素上][鼠标按下][并移动]
var startX = 0 // 开始滑动坐标，计算每次鼠标横向移动距离
const translateX = ref(0) // 当前横向滑动的距离
const startTranslate = ref(0) // 每次滑动的起始值，在此基础上更新 translateX
var maxScrollWidth = ref(0) // 最大滑动长度

// 鼠标按下
function handleMouseDown(e:MouseEvent) {
  isSlide = true // 开始滑动
  startX = e.clientX
  startTranslate.value = translateX.value // 更新滑动起始值
}
/**
 * translateX !important
 */
function handleMouseMove(e) {
  if(isSlide) {
    const currentX = e.clientX // 当前滑动x坐标
    if (startTranslate.value == 0 && currentX > startX) return // 初始态向右滑不动
    translateX.value = currentX - startX + startTranslate.value  // 横向滑动的终点坐标值
    // 对translateX进行范围限制
    if(translateX.value > 0) { // 假如超过零点，回到原点
  	  translateX.value = 0
    } else if (translateX.value <= maxScrollWidth.value) {  //超过最大坐标，回到末点
      translateX.value = maxScrollWidth.value
    }
  }
}
const listStyle = computed(() => {
  return {
    transform: "translate(" + translateX.value + "px, 0) translateZ(0)"
  }
})
const containerStyle = {
  width: `${containerWidth}px`
}
function handleMouseLeave() {
  isSlide = false
}
function handleMouseUp() {
  isSlide = false
}
            
onMounted(() => {
  const containerDiv = containerRef.value
  let listLen = (list.value.length - 1) * 110 + 100
  maxScrollWidth.value = -(listLen - containerWidth)
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
  <div>基于鼠标事件拖拽PC横向滚动简陋实现</div>
  <div class="container" ref="containerRef" :style="containerStyle">
    <div class="list" ref="listRef" :style="listStyle">
      <div class="list-item" v-for="(item, index) in list">{{ index }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 200px;
  overflow-x: hidden;
  /* overflow-x: auto; */
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