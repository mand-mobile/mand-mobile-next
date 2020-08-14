/* global uni */

function dialogFactory() {
  const noop = function() {}
  function Dialog() {}

  Dialog.create = ({
    content = '',
    title = '',
    showCancel = true,
    cancelText = '取消',
    confirmText = '确认',
    onConfirm = noop,
    onFailed = noop,
    confirmColor = '#2f86f6',
  }) => {
    uni.showModal({
      title,
      content,
      showCancel,
      cancelText,
      confirmText,
      confirmColor,
      success: function(res) {
        if (res.confirm) {
          onConfirm(res)
        } else if (res.cancel) {
          onFailed(res)
        }
      },
    })
  }

  Dialog.confirm = ({
    title = '',
    content = '',
    cancelText = '取消',
    confirmText = '确认',
    onConfirm = noop,
    onFailed = noop,
  }) => {
    return Dialog.create({
      title,
      content,
      cancelText,
      confirmText,
      onConfirm,
      onFailed,
    })
  }

  Dialog.alert = ({
    title = '',
    content = '',
    showCancel = false,
    cancelText = '取消',
    confirmText = '确认',
    onConfirm = noop,
  }) => {
    return Dialog.create({
      title,
      content,
      showCancel,
      cancelText,
      confirmText,
      onConfirm,
    })
  }

  Dialog.succeed = ({
    title = '',
    content = '',
    cancelText = '取消',
    confirmText = '确认',
    onConfirm = noop,
    onFailed = noop,
  }) => {
    return Dialog.create({
      title,
      content,
      cancelText,
      confirmText,
      onConfirm,
      onFailed,
    })
  }

  Dialog.failed = ({
    title = '',
    content = '',
    cancelText = '取消',
    confirmText = '确认',
    onConfirm = noop,
    onFailed = noop,
  }) => {
    return Dialog.create({
      title,
      content,
      cancelText,
      confirmText,
      onConfirm,
      onFailed,
    })
  }

  return Dialog
}

export default dialogFactory()
