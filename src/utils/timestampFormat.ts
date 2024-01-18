export default function calcTime(timestamp: number) {
  if(timestamp < 0) return
  let [day, hours, minutes, seconds, miliseconds] = [0, 0, 0, 0, 0]
  day = Math.floor(timestamp/(24 * 60 * 60 * 1000))
  hours = Math.floor(timestamp/(60 * 60* 1000)) - day * 24
  minutes = Math.floor(timestamp/(60 * 1000)) - day * 24 * 60 - hours * 60
  seconds = Math.floor(timestamp/1000) - day * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
  miliseconds = Math.floor(timestamp) - day * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000
  return {
    day,
    h: hours,
    min: minutes,
    s: seconds,
    ms: miliseconds
  }
}