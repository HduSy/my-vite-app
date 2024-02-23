<script setup>
import { onPageResume, timestampFormat, toast } from 'oh-my-funcs';
import { storeToRefs } from 'pinia';
import { onMounted, ref, toRef } from 'vue';
import { useNaubStore } from '../stores/index';
import { receive } from '../utils';
const count = ref(0)
const obj = ref({name: 't'})
const arr = ref([1])

const naubStore = useNaubStore()
// const { message } = naubStore
// const message = computed(() => naubStore.message)
// const { message } = storeToRefs(naubStore)
// const {message} = toRefs(naubStore)
const message = toRef(naubStore, 'message')

const { emojiMessage, fullMessage } = storeToRefs(naubStore)

naubStore.updateMessageSync('New message by sync.')

naubStore.updateMessageASync('New message by async.')

onMounted(() => {
  receive('t', () => {
    console.log(count.value++)
  })
  console.log(timestampFormat(10001))
  onPageResume(() => {
    toast('进入前台', 1500)
  })

  setTimeout(() => {
    naubStore.message = '直接修改'
    obj.value.name = 'tt'
    // Vue3改进了Vue2对对象响应式监听的限制
    obj.value.school = 'hdu' // 添加新属性
    // Vue3改进了Vue2对数组响应式监听的限制
    // arr.value[1] = 2 // 通过index修改数组项
    arr.value.length = 0 // 通过length修改数组长度
  }, 2000)

})
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/public/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="/src/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://pinia.vuejs.org/" target="_blank">
      <img src="/src/assets/pinia.svg" class="logo pinia" alt="Pinia logo" />
    </a>
  </div>
  <div>{{ fullMessage }}</div>
  <div>{{ emojiMessage }}</div>
  <div>{{ message }}</div>
  <div>{{ naubStore.message }}</div>
  <div>{{ `${obj.name}-${obj.school || 'unknown'}` }}</div>
  <div>{{ arr.toString() }}</div>
</template>

<style lang="scss" scoped>
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
.logo.pinia:hover {
  filter: drop-shadow(0 0 2em yellow);
}
</style>