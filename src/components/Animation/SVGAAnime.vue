<script setup lang="ts">
import SVGA from 'svgaplayerweb';
import { onMounted, ref } from 'vue';

const switchAnime = ref(false)
// svga 动画文件
const svgaMap = {
  success: '/src/assets/reZDqJfiTw.svga',
  normal:
    '/src/assets/4klbkrH7qP.svga'
}
const loadSvgaAnime = (isSuccess: boolean) => {
  const player = new SVGA.Player('#svga') // 动画播放相关
  player.loops = 1
  player.setContentMode('AspectFill')
  player.onFinished(() => {
    console.log('finished cb')
  })
  const Parser = new SVGA.Parser() // 动画加载解析
  Parser.load(
    isSuccess ? svgaMap.success : svgaMap.normal,
    (videoItem) => {
      player.setVideoItem(videoItem)
      player.startAnimation()
    }
  )
}
const handleClick = () => {
  switchAnime.value = !switchAnime.value
  loadSvgaAnime(switchAnime.value)
}
onMounted(() => {

})
</script>

<template>
  <div id="svga"></div>
  <div class="btn" @click="handleClick">点击切换SVGA动画</div>
</template>

<style lang="scss" scoped>
#svga {
  width: 375px;
  height: 667px;
  border: 1px solid red;
  margin: auto;
}
.btn {
  width: 100px;
  height: 50px;
  border-radius: 15px;
  border: 1px solid black;
  cursor: pointer;
  margin: 10px auto 0;
}
</style>