import type {
  App,
  VNode,
  ComponentPublicInstance,
} from 'vue'
import {
  createComponent,
  noop,
} from 'mand-mobile-next/utils'
import { t } from 'mand-mobile-next/locale'
import ActionSheetConstructor from './index.vue'

type ActionSheetFactory = typeof ActionSheetConstructor & {
  _instance: VNode
  _show: (() => void) | null
  create: <T = unknown>(args: {
    modelValue?: string | number
    title?: string
    options?: T[]
    invalidIndex?: number
    cancelText?: string
    maxHeight?: number
    onShow?: (args?: any) => void
    onHide?: (args?: any) => void
    onCancel?: (args?: any) => void
    onSelect?: (args: T) => void
    onMaskClick?: (args?: any) => void
  }) => ComponentPublicInstance | undefined | null
  install: (app: App) => void
}

const visibleHandler = 'onUpdate:visible'
const modelHander = 'onUpdate:modelValue'

ActionSheetConstructor._instance = null
ActionSheetConstructor._show = null
ActionSheetConstructor.create = function ({
  modelValue = '',
  title = '',
  options = [],
  invalidIndex = -1,
  cancelText = t('md.action_sheet.cancel'),
  maxHeight = 400,
  onShow = noop,
  onHide = noop,
  onCancel = noop,
  onSelect = noop,
  onMaskClick = noop,
} = {}) {
  const props = {
    modelValue,
    title,
    options,
    invalidIndex,
    cancelText,
    maxHeight,
    onShow,
    onHide,
    onCancel,
    onChange: onSelect,
    [visibleHandler]: onMaskClick,
  }
  /**
   * Vue3 drop vm.$on & vm.$off
   * All event listeners are props with prefix `on`
   * example:
   *   emits
   *    emit('show')
   *   props
   *    onShow="() => {}"
   */
  ActionSheetConstructor._show = () =>
    ActionSheetConstructor._instance?.component.proxy.updateProps(
      {
        visible: true,
      }
    )

  if (ActionSheetConstructor._instance) {
    ActionSheetConstructor._instance.component.proxy.updateProps(
      props
    )
    ActionSheetConstructor._show?.()
    return ActionSheetConstructor._instance.component.proxy
  }

  const vm = (ActionSheetConstructor._instance =
    createComponent(ActionSheetConstructor, props))

  ActionSheetConstructor._show?.()
  if (vm?.component?.proxy) {
    const originFn = vm.component.proxy.remove
    vm.component.proxy.remove = (...args) => {
      originFn?.apply(vm.component?.proxy, args)
      ActionSheetConstructor._instance = null
    }
  }
  return vm?.component?.proxy
}

const ActionSheet =
  ActionSheetConstructor as ActionSheetFactory

ActionSheet.install = (app: App) => {
  app.component(ActionSheet.name, ActionSheet)
}

export { ActionSheet }
export default ActionSheet
