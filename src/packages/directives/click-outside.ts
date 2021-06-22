import type { ObjectDirective } from 'vue'

const nodeList: Map<
  HTMLElement,
  {
    bindingFn?: () => void
    excludes?: unknown[]
  }
> = new Map()

function clickHandler(e: UIEvent) {
  for (const [el, bindingObj] of nodeList) {
    const excludes =
      bindingObj?.excludes?.map((item) => {
        if (typeof item === 'string' && item !== '') {
          return document.querySelector(item)
        }
        return item
      }) ?? []

    const isSelf = el === e.target
    const isComposed = e.composedPath?.().includes(el)
    const isContainedByEl = el.contains(e.target as Node)
    const isExcludes =
      excludes.includes(e.target) ||
      excludes.some((item) =>
        (item as HTMLElement)?.contains(e.target as Node)
      )

    if (
      !isSelf &&
      !isComposed &&
      !isContainedByEl &&
      !isExcludes
    ) {
      typeof bindingObj.bindingFn === 'function' &&
        bindingObj.bindingFn()
    }
  }
}

export const clickOutside: ObjectDirective<HTMLElement> = {
  beforeMount(el, binding) {
    nodeList.set(el, {
      bindingFn: binding.value,
      excludes: Array.isArray(binding.arg)
        ? binding.arg
        : [binding.arg],
    })
    document &&
      document.addEventListener('click', clickHandler)
  },
  updated(el, binding) {
    nodeList.set(el, {
      bindingFn: binding.value,
      excludes: Array.isArray(binding.arg)
        ? binding.arg
        : [binding.arg],
    })
    document &&
      document.addEventListener('click', clickHandler)
  },
  unmounted(el) {
    nodeList.delete(el)
    document &&
      document.removeEventListener('click', clickHandler)
  },
}
