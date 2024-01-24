<script setup lang="ts">
import { findIndex } from 'lodash-es';
import { computed, reactive, ref } from 'vue';
import { getCoordinate, showToast } from '../../utils';

const currentIndex = ref(0) // 当前轮播下标
const rowCount = ref(3) // 行数
const type = ref('wait') // 轮播状态，'wait'等待下次抽奖状态、'slow'轮播减速状态、'stop'轮播状态
const speed = ref(100) // 轮播速度
const initialSpeed = 100 // 初始速度
const awardIndex = ref(-1) // 中奖ID
const lastTime = ref(0) // timer
const showDialog = ref(false)
let giftInfo = reactive({
    name: '别吃了🙄',
    id: 0,
    img: '//activity.hdslb.com/blackboard/static/20191028/b8f2b74d0482aed61472c7065dc1ed56/2COynIBuC.png',
  })
// 9宫格奖品信息
const giftConfig = [
  {
    name: '别吃了🙄',
    id: 0,
    img: '//activity.hdslb.com/blackboard/static/20191028/b8f2b74d0482aed61472c7065dc1ed56/2COynIBuC.png',
  },
  {
    name: '火锅🥘',
    id: 1,
    img: '//activity.hdslb.com/blackboard/static/20191028/b8f2b74d0482aed61472c7065dc1ed56/2COynIBuC.png',
  },
  {
    name: '烤肉🥓',
    id: 2,
    img: '//activity.hdslb.com/blackboard/static/20191028/b8f2b74d0482aed61472c7065dc1ed56/2COynIBuC.png',
  },
  {
    name: '烧烤🍖',
    id: 3,
    img: '//activity.hdslb.com/blackboard/static/20191028/b8f2b74d0482aed61472c7065dc1ed56/2COynIBuC.png',
  },
  {
    name: '西餐🥩',
    id: 4,
    img: '//activity.hdslb.com/blackboard/static/20191028/b8f2b74d0482aed61472c7065dc1ed56/2COynIBuC.png',
  },
  {
    name: '米饭🍚',
    id: 5,
    img: '//activity.hdslb.com/blackboard/static/20191028/b8f2b74d0482aed61472c7065dc1ed56/2COynIBuC.png',
  },
  {
    name: '面条🍜',
    id: 6,
    img: '//activity.hdslb.com/blackboard/static/20191028/b8f2b74d0482aed61472c7065dc1ed56/2COynIBuC.png',
  },
  {
    name: '饺子🥟',
    id: 7,
    img: '//activity.hdslb.com/blackboard/static/20191028/b8f2b74d0482aed61472c7065dc1ed56/2COynIBuC.png',
  }
]
// 抽奖接口请求成功，执行抽奖动画
const lotteryEnd = (result: boolean) => {
  if(result) {
    // 成功参与抽奖后抽奖结果
    let idx = findIndex(giftConfig, (i: any) => (i.id == 0)) // 判断停在哪里，如果存在停在相应格子， 默认停在未中奖
    giftInfo = giftConfig[Math.floor(Math.random()*giftConfig.length)] // 随机一个奖品吧
    const { id, name }= giftInfo;
    const targetIndex = findIndex(giftConfig, (i: any) => (i.id == id || i.name == name));
    if (targetIndex > -1) {
      idx = targetIndex;
    }
    // 轮播速度变慢
    type.value = 'slow' // 减速
    awardIndex.value = idx // 中奖奖品ID
    const second = (Number(rowCount.value) + Math.random() - 0.5) * 1000 // 动画时长大概控制在rowCount秒左右
    setTimeout(() => {
      // 轮播速度终止
      type.value = 'stop' // 终止前减速
    }, second)
  }
}
// 利用requestAnimationFrame 屏幕刷新时反复侦听type值
const handleChange = () => {
  const len = giftConfig.length;
  /**
   * 过 speed.value ms后才更新轮播索引，间接控制了速度
   * 每轮更新 speed、lastTime
   * type = infinity: speed = 100, 每0.1s更新一次索引 开始轮播
   * type = slow: speed = 120, 每0.12s更新一次索引 减速
   * type = stop: speed = 140, 每0.14s更新一次索引 再减速
   * type = wait: speed = 100, 又初始化了速度
   */
  if (!lastTime.value || (Date.now() - lastTime.value >= speed.value)) {

    if (type.value === 'stop' && awardIndex.value === currentIndex.value) {
      // 动画播放结束，恢复等待抽奖状态
      handleComplete(awardIndex.value)
      type.value = 'wait' // 初始等待抽奖状态
      return
    } else {
      // type.value !== 'stop'
      const typeToAdd = {
        infinity: 0,
        slow: 20,
        stop: 40
      }
      // 更新speed
      speed.value += typeToAdd[type.value] || 0
      lastTime.value = Date.now();
      // 更新currentIndex当前激活框索引位置
      const index = currentIndex.value === len - 1 ? 0 : currentIndex.value + 1;
      currentIndex.value = index;
    }
  }

  requestAnimationFrame(handleChange);
}
// 模拟抽奖接口
const doLottery: Promise<boolean> = new Promise((resolve) => {
  setTimeout(() => {
    resolve(true)
  }, 1000)
})
// 开始抽奖
const handleStart = () => {
  if (type.value !== 'wait') return
  speed.value = initialSpeed;
  type.value = 'infinity'; // 匀速
  doLottery.then((res) => {
    // doLottery 成功参与抽奖 next(true)
    lotteryEnd(res);
  }).catch(err => {
    // doLottery 抽奖失败，网络原因
    console.error(err)
    showToast(err?.message || `请检查网络后，稍后再试`)
  })
  requestAnimationFrame(handleChange);
}
const handleComplete = (index: number) => {
  console.log('后序操作如：弹窗提示')
  showDialog.value = true
}
const margin = computed(() => { 
  return Math.floor(10 / rowCount.value);
})
const unit = computed(() => {
  const margin = Math.floor(10 / rowCount.value);
  return Number(((100 - (rowCount.value - 1) * margin) / rowCount.value).toFixed(1));
})

const getItemClass = (index: number, item: any) => {
  return {
    'lottery-item': true,
    'lottery-item-active': index === currentIndex.value,
    'lottery-item-thanks': item.id == 0
  };
}

// 根据坐标渲染每个奖品格子位置
const getItemStyle = (index: number) => {
  const coordinate = getCoordinate(3)[index];
  return {
    width: `${unit.value}%`,
    height: `${unit.value}%`,
    left: `${coordinate.x * (unit.value + margin.value)}%`,
    top: `${coordinate.y * (unit.value + margin.value)}%`
  };
}
const btnStyle = () => {
  return {
    width: `${unit.value}%`,
    height: `${unit.value}%`,
  }
}

const close = () => {
  showDialog.value = false
}

</script>

<template>
<div class='lottery-wrap'>
  <div class='lottery' :class="{'lottery-wait': type === 'wait'}">
    <div class='lottery-slotbtn' :style="btnStyle()"  @click='handleStart'>今天吃什么？</div>
    <div v-for='(item, index) in giftConfig' :key='index' :class='getItemClass(index, item)' :style='getItemStyle(index)'>
      {{ item.name }}
    </div>
  </div>
  <Transition name="bounce">
    <div class="content" v-if="showDialog">
      <div class="close" @click="close">[x]</div>
      <div class="btn" @click="close">{{ [1,2,3,4].includes(giftInfo.id) ? '好耶 🎉':'好吧 🤷' }}</div>
      <div class="gift">{{ giftInfo.name }}</div>
    </div>
  </Transition>
</div>
</template>

<style lang="scss" scoped>
@import '../../style/mixins';

.bounce-enter-active,
.bounce-leave-active {
  transition: opacity 1s ease;
}
.bounce-enter-from,
.bounce-leave-to {
  opacity: 0;
}
.lottery {
  position: relative;
  padding: 0;
  height: 100%;
  width: 400px;
  height: 400px;

  &-wrap{
    padding: 10px;
    box-sizing: border-box;
    background: #e4e4e4 center / cover no-repeat;
    border-radius: 12px;
  }
}
.lottery-item {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 33%;
  height: 33%;
  background: #f7f7f7;
  text-align: center;
  font-size: 22px;
  @include media-dark-light-color;
  position: absolute;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after{
    content: '';
    position: absolute;
    box-sizing: border-box;
    left: 0;
    top: 0;
    border-radius: 12px;
    bottom: 0;
    right: 0;
    border: 3px solid rgba(#fff, 0);
    transition: .2s ease-in-out;
  }
}

.lottery-item-active {
  &:after{
    border-color: #FB7299;
  }
}
.lottery-wait{
  .lottery-item-active {
    &:after{
      border-color: rgba(#fff, 0);
    }
  }
}

.lottery-slotbtn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #02b5da;
  border-radius: 12px;
}
.content {
  width: 600px;
  height: 430px;
  border-radius: 15px;
  border: 1px solid grey;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: white;
  .close {
    width: 30px;
    height: 30px;
    font-size: 19px;
    text-align: center;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    @include media-dark-light-color;
    &:hover {
      transition: transform 100ms;
      transform: scale(1.5);
    }
  }
  .btn {
    cursor: pointer;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50px;
    background-color: greenyellow;
    @include media-dark-light-color;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-weight: 900;
    font-size: 18px;
    &:hover {
      transition: all 300ms;
      font-size: 26px;
    }
  }
  .gift {
    font-size: 56px;
    font-weight: 900;
    text-align: center;
    line-height: 390px;
    @include media-dark-light-color;
  }
}
</style>
