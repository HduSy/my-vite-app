interface IStyle {
  [key:string]:string
}

export function showToast(text: string, time = 3) {
  if (!text) return
  if (typeof text !== 'string') return
  const toast = document.createElement('div')
  const rootEle = document.documentElement
  const body = rootEle.getElementsByTagName('body')[0]
  toast.innerHTML = text
  const styles: IStyle = {
    padding: '7px 12px',
    borderRadius: '8px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontSize: '14px',
    textAlgn: 'center',
    fontFamily: 'PingFang SC',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1000'
  }
  Object.keys(styles).forEach((key: string) => {
    if (styles.hasOwnProperty(key)) {
      toast.style[key] = styles[key]
    }
  })
  body.appendChild(toast)
  const timer = setTimeout(() => {
    body.removeChild(toast)
    clearTimeout(timer)
  }, time * 1000)
}