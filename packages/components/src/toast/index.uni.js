/* global uni */

function ToastFactory() {
  function Toast() {}

  Toast.create = function({content = '', icon = 'none', duration = 3000, position = 'center', hasMask = false}) {
    uni.showToast({
      title: content,
      mask: hasMask,
      icon,
      position,
      duration,
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
    return Toast.create({
      content,
      duration,
      hasMask,
    })
  }

  Toast.succeed = (content = '', duration = 3000, hasMask = false) => {
    Toast.type = 'succeed'
    return Toast.create({
      icon: 'success',
      content,
      duration,
      hasMask,
    })
  }

  Toast.failed = (content = '', duration = 3000, hasMask = false) => {
    Toast.type = 'failed'
    return Toast.create({
      icon: 'none',
      content,
      duration,
      hasMask,
    })
  }

  /* eslint no-unused-vars: ["error", { "args": "none" }] */
  Toast.loading = (content = '', duration = 0, hasMask = true) => {
    Toast.type = 'loading'
    return uni.showLoading({
      title: content,
      mask: hasMask,
    })
  }

  return Toast
}

export default ToastFactory()
