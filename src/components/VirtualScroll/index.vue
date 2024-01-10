<script lang="ts">
import { defineComponent } from 'vue';
import FixedHeightListComp from './components/FixedHeightListComp.vue';

export default defineComponent({
  components: { FixedHeightListComp },
  setup(props, context) {
    const listData = [...new Array(10000).keys()]
    return {
      listData
    }
  }
})

</script>

<template>
  <div>
    <h3>固定高度虚拟列表</h3>
    <FixedHeightListComp class="list" :width="200" :height="200" :item-height="50" :list-data="listData" />
  </div>
</template>

<style scoped lang="scss">
.list {
  border: 1px solid black;
}
</style>