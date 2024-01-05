<script setup lang="ts">
import { onMounted, ref } from 'vue';
const kvLink = 'https://activity.hdslb.com/blackboard/static/20220512/6a806a6a097a741ff3b5beac907646e3/MnPJh0qATY.mp4'
const poster = '/src/assets/p5.jpg'
const poster2 = '/src/assets/16rt5g5qjb.png'
const onVideoProgress = (e: Event) => {
  const target = e.target as HTMLVideoElement
  console.log('播放进度:', target.currentTime)
  if (target.duration - target.currentTime < 0.05) {
    console.log('timeupdate: 未正常播放')
  }
}
const videoRef = ref<HTMLVideoElement>()
const played = ref(false)
// 调用video play()方法返回一个Promise
const videoPromiseDetect = () => {
  const videoEl = videoRef.value
  let playPromise = videoEl?.play()
  if(playPromise!==undefined) {
    playPromise.then(() => {
      console.log('Promise: 正常播放')
    }).catch((err) => {
      console.log('Promise: 未正常播放', err.message)
      videoEl.muted = true
      videoEl.poster = poster2
    })
  }
}
// 事件&浏览器支持度
const detectVideoAutoPlay = () => {
  const videoEl = videoRef.value
  // caniuse支持度差，几乎都不支持
  if(navigator.getAutoplayPolicy) {
    // type 检测（始终推荐）
    if (navigator.getAutoplayPolicy("mediaelement") === "allowed") {
      console.log('The video element will autoplay with audio.')
    } else if (navigator.getAutoplayPolicy("mediaelement") === "allowed-muted") {
      console.log('Mute audio on video')
      videoEl.muted = true;
    } else if (navigator.getAutoplayPolicy("mediaelement") === "disallowed") {
      // Set a default placeholder image.
      videoEl.poster = poster;
    }
  } else if(videoEl) {
    console.log('不支持 navigator.getAutoplayPolicy 检测法')
    // videoPromiseDetect()
  }
}
// play事件监听（浏览器间处理不太兼容
const videoPlayEventDetect = () => {
  // Chrome无play事件触发，Safari上用户触摸video交互后触发play事件执行回调
  const videoEl = videoRef.value
  const handleFirstPlay = (e: Event) => {
      console.log('Event: play')
      if(!played.value) {
        played.value = true
        console.log('Event: 正常播放')
        videoEl.removeEventListener('play', handleFirstPlay)
      } else {
        console.log('Event: 未正常播放')
        videoEl.muted = true
        videoEl.poster = poster
      }
    }
    videoEl.addEventListener('play', handleFirstPlay, false)
}
onMounted(()=>{
  // detectVideoAutoPlay()
  // videoPromiseDetect()
  videoPlayEventDetect()
})
</script>

<template>
  <!-- muted -->
  <!-- :poster="poster" -->
  <video
    width="375"
    ref="videoRef"
    :src="kvLink"
    @touchmove.stop.prevent
    autoplay
    loop
    muted
    preload="auto"
    @timeupdate="onVideoProgress"
    :poster="poster2"
    webkit-playsinline="true"
    playsinline="true"
    x-webkit-airplay="disallow"
    x5-video-player-type="h5"
    x5-video-player-fullscreen="true"
    x5-video-orientation="portraint"
></video>
</template>

<style lang="scss">
*::-webkit-media-controls-panel {
  display: none!important;
  opacity: 0;
  -webkit-appearance: none;
}

/* Old shadow dom for play button */

*::-webkit-media-controls-play-button {
  display: none!important;
  opacity: 0;
  -webkit-appearance: none;
}

/* New shadow dom for play button */

/* This one works! */

*::-webkit-media-controls-start-playback-button {
  display: none!important;
  opacity: 0;
  -webkit-appearance: none;
}
</style>