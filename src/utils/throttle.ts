// 节流

export function throttle(cb, time) {
  let timer = 0
  return () => {
    if(timer) return
    timer = setTimeout(() => {
      cb&&cb()
      clearTimeout(timer)
    }, time)
  }
}