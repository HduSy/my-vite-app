
import { createRouter, createWebHashHistory } from 'vue-router'
// index
const HelloWorld = () => import('../components/HelloWorld.vue')
// other
const Video  = () => import('../components/VideoItem.vue')
const CSSModule = () => import('../components/CSSModule.vue')
const LazyLoadList = () => import('../components/LazyLoadList/index.vue')
const VirtualScroll  = () => import('../components/VirtualScroll/index.vue')
const PCHorizonalScroll  = () => import('../components/PCHorizonalScroll/index.vue')
const H5DownUpRefresh = () => import('../components/H5DownUpRefresh/index.vue')
const CountDown = () => import('../components/CountDown/index3.vue')

// animation
const PixiSpineAnime = () => import('../components/Animation/PixiSpineAnime.vue')
const SpinePlayerAnime = () => import('../components/Animation/SpinePlayerAnime.vue')
const SVGAAnime = ()=>import('../components/Animation/SVGAAnime.vue')
const LottieAnime  = () => import('../components/Animation/LottieDemo.vue')
const MatchLottery = () => import('../components/Animation/MatchLottery.vue')
const BiliLottery = () => import('../components/9Lottery//index.vue')


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