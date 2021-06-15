import type {
  App,
  ComponentPublicInstance,
  ExtractPropTypes,
  VNode,
} from 'vue'
import { t } from 'mand-mobile/locale'
import { createComponent, noop } from 'mand-mobile/utils'
import DialogContstructor from './index.vue'
import { dialogProps } from './use-dialog'

type method = (
  args: Partial<ExtractPropTypes<typeof dialogProps>> & {
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
  }
) => ComponentPublicInstance
type DialogFactory = typeof DialogContstructor & {
  _intance: VNode
  _show: () => void
  confirm: method
  alert: method
  succeed: method
  failed: method
  create: method
}

const modelHander = 'onUpdate:modelValue'

DialogContstructor.create = function ({
  title = '',
  icon = '',
  iconSvg = false,
  content = '',
  closable = false,
  transition = 'md-bounce',
  actions = [],
  onShow = noop,
  onHide = noop,
  onClose = noop,
}) {
  const props = {
    title,
    icon,
    iconSvg,
    content,
    closable,
    actions,
    transition,
    preventScroll: true,
    onShow,
    onHide,
    [modelHander]: onClose,
  }

  DialogContstructor._show = () => {
    DialogContstructor._instance.component.proxy.updateProps(
      {
        modelValue: true,
      }
    )
  }

  if (DialogContstructor._instance) {
    DialogContstructor._instance.component.proxy.updateProps(
      props
    )
    DialogContstructor._show?.()
    return DialogContstructor._instance.component.proxy
  }

  const vm = (DialogContstructor._instance =
    createComponent(DialogContstructor, props))

  DialogContstructor._show?.()

  if (vm?.component?.proxy) {
    const originFn = vm.component.proxy.remove
    vm.component.proxy.remove = (...args) => {
      originFn?.apply(vm.component?.proxy, args)
      DialogContstructor._instance = null
    }
  }

  return vm?.component?.proxy
}

DialogContstructor.confirm = ({
  title = '',
  icon = '',
  iconSvg = false,
  content = '',
  cancelText = t('md.dialog.cancel'),
  cancelWarning = false,
  confirmText = t('md.dialog.confirm'),
  confirmWarning = false,
  closable = false,
  transition = 'md-bounce',
  onConfirm = noop,
  onCancel = noop,
  onShow = noop,
  onHide = noop,
}) => {
  const dialog = DialogContstructor.create({
    title,
    icon,
    iconSvg,
    content,
    closable,
    transition,
    onShow,
    onHide,
    actions: [
      {
        text: cancelText,
        warning: cancelWarning,
        handler: () => {
          onCancel()
          dialog.updateProps({
            modelValue: false,
          })
        },
      },
      {
        text: confirmText,
        warning: confirmWarning,
        handler: () => {
          onConfirm()
          dialog.updateProps({
            modelValue: false,
          })
        },
      },
    ],
  })

  return dialog
}

DialogContstructor.alert = ({
  title = '',
  icon = '',
  iconSvg = false,
  content = '',
  confirmText = t('md.dialog.confirm'),
  closable = false,
  warning = false,
  transition = 'md-bounce',
  onConfirm = noop,
  onShow = noop,
  onHide = noop,
}) => {
  const dialog = DialogContstructor.create({
    title,
    icon,
    iconSvg,
    content,
    closable,
    transition,
    onShow,
    onHide,
    actions: [
      {
        text: confirmText,
        warning,
        handler: () => {
          onConfirm()
          dialog.updateProps({
            modelValue: false,
          })
        },
      },
    ],
  })

  return dialog
}

DialogContstructor.succeed = (
  props: Partial<ExtractPropTypes<typeof dialogProps>> & {
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
  }
) => {
  props.icon = 'success-color'
  return DialogContstructor.confirm(props)
}

DialogContstructor.failed = (
  props: Partial<ExtractPropTypes<typeof dialogProps>> & {
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
  }
) => {
  props.icon = 'warn-color'
  return Dialog.confirm(props)
}

const Dialog = DialogContstructor as DialogFactory

Dialog.install = (app: App) => {
  app.component(Dialog.name, Dialog)
}

export { Dialog }
export default Dialog
