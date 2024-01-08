<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const box = document.querySelector(".box") as HTMLDivElement;
  let anime = null;
  let positionX = 0;
  const animate = () => {
    if (anime) cancelAnimationFrame(anime);
    positionX -= 1;
    if (positionX < -(5 * 100 + 5 * 20)) positionX = 0;
    box.style.transform = `translateX(${positionX}px)`;
    anime = requestAnimationFrame(animate);
  };
  animate();
})
</script>

<template>
  <div class="wrapper">
    <div class="box">
      <div class="child" style="background-color: red">这</div>
      <div class="child" style="background-color: gold">里</div>
      <div class="child" style="background-color: yellowgreen">是</div>
      <div class="child" style="background-color: purple">三</div>
      <div class="child" style="background-color: brown">土</div>
      <div class="child" style="background-color: red">这</div>
      <div class="child" style="background-color: gold">里</div>
      <div class="child" style="background-color: yellowgreen">是</div>
      <div class="child" style="background-color: purple">三</div>
      <div class="child" style="background-color: brown">土</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: calc(100px * 5 + 20px * 4);
  margin: 60px auto 0;
  border: 1px solid black;
  overflow: hidden;
}
.box {
  width: fit-content;
  display: flex;
}
.box .child {
  width: 100px;
  height: 100px;
  margin-left: 20px;
  line-height: 100px;
  text-align: center;
  font-size: 33px;
}
.box .child:first-child {
  margin-left: 0;
}

</style>