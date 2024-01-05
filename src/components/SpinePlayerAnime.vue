<script lang="ts" setup>
import * as spine from '@esotericsoftware/spine-player';

import gsap from 'gsap';
import { Spine } from 'pixi-spine';
import * as PIXI from 'pixi.js';
import { onMounted, ref } from 'vue';
import { EGG_SPINE_LOCAL } from '../config';

const eggRef = ref()
let app: PIXI.Application
let eggResource: Spine

const loadEggAnim = () => {
  // CLOUDS_SPINE
  return PIXI.Assets.load(EGG_SPINE_LOCAL).then((res) => {
    eggResource = res
  })
}
const playEggAnim = (animeName: string, loop = true) => {
  const eggSpine = new Spine(eggResource.spineData)
  app.stage.addChild(eggSpine)
  eggSpine.state.setAnimation(0, animeName, loop)
}

const initViewer = () => {
  app = new PIXI.Application({
    autoDensity: true,
    antialias: true
  })
  eggRef.value.appendChild(app.view)
}

const animeConfig = () => {
  gsap.fromTo(eggRef.value, {
    y: -500
  },
  {
    y: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.3)',
  })
}
// spine player
const playerInstance = ref<spine.SpinePlayer|null>(null)
const initSpinePlayer = () => {
  playerInstance.value = new spine.SpinePlayer(eggRef.value, {
    jsonUrl: `/src/assets/caidan/caidan.json`,
    atlasUrl: `/src/assets/caidan/caidan.atlas`,
    alpha: true,
    backgroundColor: '#00000000',
    showControls: false,
    showLoading: false,
    error() {
      console.log('error')
    },
    success() {
      console.log('success')
    },
    preserveDrawingBuffer: true
  })
}
const open = ref(false)
const playEggAnimByPlayer = () => {
  open.value = !open.value
  let name = open.value ? 'DH-1':'DH-2'
  if(playerInstance.value) {
    playerInstance.value.setAnimation(name)
  } else {
    initSpinePlayer()
    playerInstance.value.setAnimation(name)
  }
}


onMounted(async () => {
  // initViewer() // 初始化舞台画布并添加到DOM
  // await loadEggAnim() // 加载彩蛋动画资源
  // // animeConfig()
  // playEggAnim('DH-1')

  playEggAnimByPlayer()
})

</script>

<template>
  <div class="egg" ref="eggRef"></div>
  <div class="btn" @click="playEggAnimByPlayer">点击切换Spine动画</div>
</template>

<style lang="scss" scoped>
.egg {
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