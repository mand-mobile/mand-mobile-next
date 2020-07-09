export default function toastFactory (ToastOptions) {
  const Toast = function({
    content = '',
    icon = 'none',
    duration = 3000,
    position = 'center',
    hasMask = false,
  }) {
    uni.showToast({
      title: content,
      mask: hasMask,
      icon,
      position,
      duration
    })
  }

  Toast.hide = () => {
    if (Toast.type === 'loading') {
      uni.hideLoading()
    } else {
      uni.hideToast()
    }
  }

  Toast.info = (content = '', duration = 3000, hasMask = false) => {
    Toast.type = 'info'
    return Toast({
      content,
      duration,
      hasMask,
    })
  }

  Toast.succeed = (content = '', duration = 3000, hasMask = false) => {
    Toast.type = 'succeed'
    return Toast({
      icon: 'success',
      content,
      duration,
      hasMask,
    })
  }

  Toast.failed = (content = '', duration = 3000, hasMask = false) => {
    Toast.type = 'failed'
    return Toast({
      icon: 'none',
      content,
      duration,
      hasMask,
    })
  }

  Toast.loading = (content = '', duration = 0, hasMask = true) => {
    Toast.type = 'loading'
    return uni.showLoading({
      title: content,
      mask: hasMask
    })
  }

  Toast.component = ToastOptions

  return Toast
}