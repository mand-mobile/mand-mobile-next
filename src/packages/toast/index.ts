import type {
  App,
  ComponentPublicInstance,
  VNode,
} from 'vue'
import {
  createComponent,
  close,
} from 'mand-mobile-next/utils'
import ToastConstructor from './index.vue'

type ToastFactory = typeof ToastConstructor & {
  _instance: VNode
  info: (
    content: string,
    duration?: number,
    hasMask?: boolean
  ) => void
  loading: (
    content: string,
    duration?: number,
    hasMask?: boolean
  ) => void
  succeed: (
    content: string,
    duration?: number,
    hasMask?: boolean
  ) => void
  failed: (
    content: string,
    duration?: number,
    hasMask?: boolean
  ) => void
  hide: (remove?: boolean) => void
  create: (args: {
    content: string
    icon?: string
    iconSvg?: boolean
    duration?: number
    position?: string
    hasMask?: boolean
  }) => ComponentPublicInstance | undefined | null
  install: (app: App) => void
}

ToastConstructor._instance = null
ToastConstructor.create = function ({
  content = '',
  icon = '',
  iconSvg = false,
  duration = 3000,
  position = 'center',
  hasMask = false,
}) {
  const options = {
    content,
    icon,
    iconSvg,
    duration,
    position,
    hasMask,
  }

  if (ToastConstructor._instance) {
    ToastConstructor._instance.component.proxy.updateProps(
      options
    )
    ToastConstructor._instance.component.proxy.show()
    return
  }

  const vm = (ToastConstructor._instance = createComponent(
    ToastConstructor,
    options
  ))

  ;(vm?.component?.proxy as any)?.show()

  return vm?.component?.proxy
}

/**
 * Hide toast
 */
ToastConstructor.hide = (remove?: boolean) => {
  if (remove) {
    close(
      ToastConstructor._instance?.component.props.id ?? ''
    )
    ToastConstructor._instance = null
  } else {
    ToastConstructor._instance?.component.proxy.hide()
  }
}

/**
 * Show info toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */
ToastConstructor.info = (
  content = '',
  duration = 3000,
  hasMask = false
) => {
  return ToastConstructor.create({
    icon: '',
    content,
    duration,
    hasMask,
  })
}

/**
 * Show succeed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */
ToastConstructor.succeed = (
  content = '',
  duration = 3000,
  hasMask = false
) => {
  return ToastConstructor.create({
    icon: 'success',
    content,
    duration,
    hasMask,
  })
}

/**
 * Show failed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=true]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */
ToastConstructor.failed = (
  content = '',
  duration = 3000,
  hasMask = false
) => {
  return ToastConstructor.create({
    icon: 'fail',
    content,
    duration,
    hasMask,
  })
}

/**
 * Show loading toast
 * @param {string} content
 * @param {number=} [duration=0]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */
ToastConstructor.loading = (
  content = '',
  duration = 0,
  hasMask = true
) => {
  return ToastConstructor.create({
    icon: 'spinner',
    iconSvg: true,
    content,
    duration,
    hasMask,
  })
}

const Toast = ToastConstructor as ToastFactory

Toast.install = (app: App) => {
  app.component(Toast.name, Toast)
}

export { Toast }
export default Toast
