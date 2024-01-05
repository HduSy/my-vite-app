const child_process = require('child_process')
const withAudio = false
/**
 * 转 MP4
 */
function transfrom2mp4() {
  child_process.execSync(`ffmpeg -i ./video.mov -vcodec copy ${withAudio ? '-acodec copy':''} ./video.mp4 -y`)
}
/**
 * 压缩视频文件体积
 */
function compressVideo() {
  child_process.execSync(`ffmpeg ${withAudio? '':'-f lavfi -i anullsrc'} -i ./KV.mp4 -shortest -vcodec libx264 -acodec aac -b 1000k ./KV.f.mp4 -y`)
}
// transfrom2mp4()
compressVideo()