<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { base64toBlob } from '../utils';

const kvLink = 'https://activity.hdslb.com/blackboard/static/20220117/6a806a6a097a741ff3b5beac907646e3/hqduMu4NwC.mp4'
const kvLocal = '/src/assets/video/KV.f.mp4'
const poster = '/src/assets/p5.jpg'
const poster2 = '/src/assets/16rt5g5qjb.png'

const videoRef = ref<HTMLVideoElement>()
const played = ref(false)
let showVideoFrame = ref(false)

const onVideoProgress = (e: Event) => {
  const target = e.target as HTMLVideoElement
  if(target.currentTime > 0.1) {
    // 解决加载黑屏问题
    console.log('播放进度:', target.currentTime)
    showVideoFrame.value = true
  }
  if (target.duration - target.currentTime < 0.05) {
    console.log('timeupdate: 播放结束')
  }
}
// 监听play事件（浏览器间处理不太兼容
const videoPlayEventDetect = () => {
  // Chrome无play事件触发，Safari上用户触摸video交互后触发play事件执行回调
  const videoEl = videoRef.value
  const handleFirstPlay = (e: Event) => {
      console.log('Event: play')
      if(!played.value) {
        played.value = true
        showVideoFrame.value = true
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
// 执行play方法（浏览器间兼容良好
const videoPromiseDetect = () => {
  // 调用video play()方法返回一个Promise
  const videoEl = videoRef.value
  let playPromise = videoEl?.play()
  if(playPromise!==undefined) {
    playPromise.then(() => {
      console.log('Promise: 正常播放')
      showVideoFrame.value = true
    }).catch((err) => {
      console.error('Promise: 未正常播放\n', err.message)
      videoEl.poster = poster2
      videoEl.muted = true
      videoPlayEventDetect()
    })
  }
}
// 事件&浏览器支持度
const detectVideoAutoPlay = () => {
  const videoEl = videoRef.value
  // caniuse支持度差，几乎都不支持，只有firefox支持
  if(navigator.getAutoplayPolicy) {
    // type 检测（始终推荐）
    if (navigator.getAutoplayPolicy("mediaelement") === "allowed") {
      console.log('The video element will autoplay with audio.')
      showVideoFrame.value = true
    } else if (navigator.getAutoplayPolicy("mediaelement") === "allowed-muted") {
      console.log('Mute audio on video')
      videoEl.muted = true;
    } else if (navigator.getAutoplayPolicy("mediaelement") === "disallowed") {
      // Set a default placeholder image.
      videoEl.poster = poster;
    }
  } else if(videoEl) {
    console.log('不支持 navigator.getAutoplayPolicy 检测法')
    videoPromiseDetect()
    // videoPlayEventDetect()
  }
}

const kvBlob = ref('')
const loadVideoSource =() => {
  // 体积还是太大
  // 加载视频 不可放在mounted里面
  import('../assets/video/video-to-b64/video').then(data => {
    const videoB64Data = data.videoB64Data
    const blob = base64toBlob(videoB64Data, 'video/mp4')
    const blobUrl = URL.createObjectURL(blob)
    kvBlob.value = blobUrl
  }).catch(e=>console.error('base64 视频加载失败'))
}
onMounted(()=>{
  detectVideoAutoPlay()
  // loadVideoSource()
})
</script>

<template>
  <!-- muted -->
  <video
    width="375"
    :class="['ParticleVideo', {showOpacity: showVideoFrame}]"
    ref="videoRef"
    :src="kvLink"
    @touchmove.stop.prevent
    autoplay
    loop
    preload="auto"
    @timeupdate="onVideoProgress"
    :poster="poster2"
    playsinline="true"
    webkit-playsinline="true"
    x-webkit-airplay="disallowed"
    x5-video-player-type="h5"
    x5-video-orientation="portraint"
    x5-video-player-fullscreen="true"
></video>
</template>

<style lang="scss">
.ParticleVideo {
  object-fit: cover;
  //width: 7.5rem;
  //height: 13.14rem;
  //width: 100vw;
  //height: 100%;
  //position: relative;
  //transform: translateY(1185px - 1314px);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  //transform: translateY(-160px);
  &.showOpacity {
    opacity: 1;
  }
}
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