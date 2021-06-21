/**
 *  use API to mounted component
 */
import { render, mergeProps, createVNode } from 'vue'

import type { Component, VNode } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    remove?: (callback?: (args?: any) => void) => void
    updateProps?: (args: Record<string, any>) => void
  }
}

let seed = 1

const instances: VNode[] = []

export const createComponent = (
  CompConstructor: Component,
  options: Record<string, any>
) => {
  const container = document.createElement('div')
  const id = 'toast_' + seed++

  const vm = createVNode(CompConstructor, {
    ...options,
    id,
  })

  vm.props = mergeProps(vm.props || {}, options)
  render(vm, container)
  instances.push(vm)
  /**
   * mounted dom
   */
  document.body.appendChild(container)

  if (vm?.component?.proxy) {
    /**
     * remove instnace
     */
    ;(vm.component.proxy as any).remove = function (
      callback?: (args?: any) => void
    ) {
      render(null, container)
      document.body.removeChild(container)
      callback?.()
    }
    /**
     * update props
     */
    ;(vm.component.proxy as any).updateProps = function (
      props: Record<string, any>
    ) {
      props &&
        Object.keys(props).forEach((k) => {
          ;(vm as any).component.props[k] = props[k]
        })
    }
  }

  return vm
}

export function close(id: string) {
  const idx = instances.findIndex((vm) => {
    const { id: _id } = vm?.component?.props as any
    return id === _id
  })

  if (idx === -1) {
    return
  }

  ;(instances[idx].component?.proxy as any).remove()
  instances.splice(idx, 1)
}
