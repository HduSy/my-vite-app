
import { createRouter, createWebHashHistory } from 'vue-router'
// index
const HelloWorld = () => import('../views/HelloWorld.vue')
// other
const Video  = () => import('../views/VideoItem.vue')
const CSSModule = () => import('../views/CSSModule.vue')
const LazyLoadList = () => import('../views/LazyLoadList/index.vue')
const VirtualScroll  = () => import('../views/VirtualScroll/index.vue')
const PCHorizonalScroll  = () => import('../views/PCHorizonalScroll/index.vue')
const H5DownUpRefresh = () => import('../views/H5DownUpRefresh/index.vue')
const CountDown = () => import('../views/CountDown/index3.vue')

// animation
const PixiSpineAnime = () => import('../views/Animation/PixiSpineAnime.vue')
const SpinePlayerAnime = () => import('../views/Animation/SpinePlayerAnime.vue')
const SVGAAnime = ()=>import('../views/Animation/SVGAAnime.vue')
const LottieAnime  = () => import('../views/Animation/LottieDemo.vue')
const MatchLottery = () => import('../views/Animation/MatchLottery.vue')
const BiliLottery = () => import('../views/9Lottery//index.vue')


const routes = [
  // index
  {path: '/', component: HelloWorld},
  // other
  {path:'/video', component: Video},
  {path: '/css-module', component: CSSModule},
  {path: '/lazyload-list', component: LazyLoadList},
  {path: '/virtual-list', component: VirtualScroll},
  {path: '/pc-h-scroll', component: PCHorizonalScroll},
  {path: '/h5-refresh', component: H5DownUpRefresh},
  {path: '/countdown', component: CountDown},
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