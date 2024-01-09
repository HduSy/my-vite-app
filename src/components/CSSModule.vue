<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import indexModuleCss from '../style/index.module.css';

console.debug('indexModuleCss', indexModuleCss)


const divBox = document.createElement('div')
divBox.className = indexModuleCss.divBox

onMounted(() => {
  document.getElementById('app')?.appendChild(divBox)
})
onUnmounted(() => {
  divBox.remove()
})
</script>