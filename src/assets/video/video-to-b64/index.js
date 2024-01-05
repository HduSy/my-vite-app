const path = require('path')
const fs = require('fs')
/**
 * @param fileIPath 输入文件路径
 * @param fileOPath 输出文件路径
 */
function compressVideo2Base64(fileIPath, fileOPath) {
  const fs = require('fs')
  const data = fs.readFileSync(fileIPath, { encoding: 'base64' })

  const fileContent = `export const videoB64Data = '${data}'`
  fs.writeFileSync(fileOPath, fileContent)

  console.log(`已写入视频base64文件: ${fileOPath}`)
}

compressVideo2Base64(path.resolve(__dirname, '../KV.f.mp4'), path.resolve(__dirname, './video.ts'))
