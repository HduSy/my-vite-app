# 设计思路
## 9宫格UI
计算方格坐标，设置元素style，动态渲染奖品方格
## 抽奖逻辑
设计4档速度，0速、匀速、减速、终止前减速，利用requestAnimationFrame始终监听当前状态，抽奖启动时匀速轮播，抽奖接口请求成功后，设置速度为减速，setTimeout适当延时后将速度调整为终止前减速，直到抽奖结果ID与9宫格奖品ID匹配，回到初始0速状态。
## 核心实现
```js
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
```
## 参考
[9Lottery/index.vue](./index.vue)