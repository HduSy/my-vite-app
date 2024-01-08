
import { createRouter, createWebHashHistory } from 'vue-router'
const HelloWorld = () => import('../components/HelloWorld.vue')
const Video  = () => import('../components/VideoItem.vue')
const CSSModule = () => import('../components/CSSModule.vue')
const PixiSpineAnime = () => import('../components/PixiSpineAnime.vue')
const SpinePlayerAnime = () => import('../components/SpinePlayerAnime.vue')
const SVGAAnime = ()=>import('../components/SVGAAnime.vue')
const LottieAnime  = () => import('../components/LottieDemo.vue')
const RequestAnimationFrameAnime = () => import('../components/RequestAnimationFrame.vue')

const routes = [
  {path: '/', component: HelloWorld},
  {path:'/video', component: Video},
  {path: '/css-module', component: CSSModule},
  {path: '/pixi-spine-demo', component: PixiSpineAnime},
  {path: '/spine-player-demo', component: SpinePlayerAnime},
  {path: '/svga-demo', component: SVGAAnime},
  {path: '/lottie-demo', component: LottieAnime},
  {path: '/requestAnimationFrameAnime-demo', component: RequestAnimationFrameAnime},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router