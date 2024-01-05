
import { createRouter, createWebHashHistory } from 'vue-router'
const Video  = () => import('../components/VideoItem.vue')
const PixiSpineAnime = () => import('../components/PixiSpineAnime.vue')
const SpinePlayerAnime = () => import('../components/SpinePlayerAnime.vue')
const HelloWorld = () => import('../components/HelloWorld.vue')
const SVGAAnime = ()=>import('../components/SVGAAnime.vue')
const CSSModule = () => import('../components/CSSModule.vue')

const routes = [
  {path: '/', component: HelloWorld},
  {path:'/video', component: Video},
  {path: '/pixi-spine-demo', component: PixiSpineAnime},
  {path: '/spine-player-demo', component: SpinePlayerAnime},
  {path: '/svgademo', component: SVGAAnime},
  {path: '/css-module', component: CSSModule}

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router