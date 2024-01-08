<script setup>
import { ref } from 'vue';
import { fire } from '../utils';

const count = ref(0)

const addNum = () => {
  fire('t', ++count.value)
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/public/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="/src/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h3>动画示例目录</h3>
  <div class="dir">
    <router-link to="/video">Video</router-link>
    <router-link to="/pixi-spine-demo">Pixi Spine Animation</router-link>
    <router-link to="/spine-player-demo">Spine Player</router-link>
    <router-link to="/svga-demo">SVGA</router-link>
    <router-link to="/lottie-demo">Lottie</router-link>
    <router-link to="/requestAnimationFrameAnime-demo">requestAnimationFrame</router-link>
  </div>

  <div class="card">
    <button type="button" @click="addNum">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.read-the-docs {
  color: #888;
}
.dir {
  display: flex;
  flex-direction: column;
}
</style>
