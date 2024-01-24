<template>
  <div id="wrapper">
    <div :class="style.blueBox"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, useCssModule } from 'vue';
import indexModuleCss from '../style/index.module.css';

console.debug('indexModuleCss', indexModuleCss)


const divBox = document.createElement('div')
divBox.className = indexModuleCss.divBox

const style = useCssModule('box') // script里操作CSSModule

onMounted(() => {
  document.getElementById('wrapper')?.appendChild(divBox)
  console.log(style)
})
onUnmounted(() => {
  divBox.remove()
})
</script>

<style lang="scss" module="box">
.blue-box {
  width: 100px;
  height: 100px;
  background-color: blue;
}
:deep(.inner-child) {
  /* 父组件深入透传子组件样式 */
}
</style>