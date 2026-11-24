import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import nprogress from 'nprogress'

export function toast(message, type = 'success', dangerouslyUseHTMLString = false) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000
  })
}

export function showModal(content, type = 'warning', title = '提示') {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type
    }
  )
}

export function showFullLoading() {
  nprogress.start()
}

export function hideFullLoading() {
  nprogress.done()
}
// 弹出输入框
export function showPrompt(tip,value = ""){
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value
  })
}