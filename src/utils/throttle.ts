// 节流

export function throttle(cb, time) {
  let timer = null
  return () => {
    if(timer) return
    timer = setTimeout(() => {
      cb&&cb()
      timer = null
    }, time)
  }
}