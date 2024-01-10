
import { createRouter, createWebHashHistory } from 'vue-router'
// index
const HelloWorld = () => import('../components/HelloWorld.vue')
// other
const Video  = () => import('../components/VideoItem.vue')
const CSSModule = () => import('../components/CSSModule.vue')
const VirtualScroll  = () => import('../components/VirtualScroll/index.vue')

// animation
const PixiSpineAnime = () => import('../components/PixiSpineAnime.vue')
const SpinePlayerAnime = () => import('../components/SpinePlayerAnime.vue')
const SVGAAnime = ()=>import('../components/SVGAAnime.vue')
const LottieAnime  = () => import('../components/LottieDemo.vue')
const MatchLottery = () => import('../components/MatchLottery.vue')
const BiliLottery = () => import('../components/9Lottery//index.vue')


const routes = [
  // index
  {path: '/', component: HelloWorld},
  // other
  {path:'/video', component: Video},
  {path: '/css-module', component: CSSModule},
  {path: '/virtual-list', component: VirtualScroll},
  // animation
  {path: '/pixi-spine-demo', component: PixiSpineAnime},
  {path: '/spine-player-demo', component: SpinePlayerAnime},
  {path: '/svga-demo', component: SVGAAnime},
  {path: '/lottie-demo', component: LottieAnime},
  {path: '/match-lottery', component: MatchLottery},
  {path: '/9-lottery', component: BiliLottery},

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router