<script lang="ts">
import { defineComponent } from 'vue';
import FixedHeightListComp from './components/FixedHeightListComp.vue';

export default defineComponent({
  components: { FixedHeightListComp },
  setup(props, context) {
    const listData = [...new Array(10000).keys()]
    const loadItems = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Array(10).fill(true))
        }, Math.random() * 800)
      })
    }
    return {
      listData
    }
  }
})

</script>

<template>
  <div>
    <FixedHeightListComp :width="200" :height="200" :item-height="50"/>
  </div>
</template>

<style scoped lang="scss">

</style>