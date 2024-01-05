<script lang="ts" setup>
import { Spine } from 'pixi-spine';
import * as PIXI from 'pixi.js';
import { onMounted, ref } from 'vue';
import { WOOD_SPINE } from '../config';

let app: PIXI.Application
let bgResource: Spine
const boxRef = ref()
let bgSpine = ref()

const loadBgAnim = () => {
  return PIXI.Assets.load(WOOD_SPINE).then((res) => {
    bgResource = res
  })
}

const addSpineAnime = () => {
  bgSpine.value = new Spine(bgResource.spineData)
  bgSpine.value.x = app.view.width/2
  bgSpine.value.y = app.view.height/2
  app.stage.addChild(bgSpine.value)
}
const playAnimByName = (animeName: string) => {
  bgSpine.value.state.setAnimation(0, animeName, true)
}

const initViewer = () => {
  app = new PIXI.Application({
    autoDensity: true,
    antialias: true,
    backgroundAlpha: 0,
  })
  boxRef.value.appendChild(app.view)
}

let index = ref(0)
function handleClick() {
  index.value++
  if(index.value > 3) index.value = 1
  playAnimByName(`WOOD_0${index.value}`)
}

onMounted(async () => {
  initViewer() // 初始化舞台画布并添加到DOM
  await loadBgAnim() // 加载背景动画资源
  addSpineAnime() // 添加动画到舞台上
  handleClick() // 播放动画
})

</script>
<template>
  <div id="land" ref="boxRef"></div>
  <div class="btn" @click="handleClick">点击切换Pixi-Spine {{index}}动画</div>
</template>

<style lang="scss" scoped>
#land {
  border: 1px solid red;
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