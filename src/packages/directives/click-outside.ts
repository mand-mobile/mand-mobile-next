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

    const isComposed = e.composedPath?.().includes(el)
    const isExcludes =
      excludes.includes(e.target) ||
      excludes.some((item) =>
        (item as HTMLElement)?.contains(e.target as Node)
      )

    if (!isComposed && !isExcludes) {
      typeof bindingObj.bindingFn === 'function' &&
        bindingObj.bindingFn()
    }
  }
}

export const clickOutside: ObjectDirective<HTMLElement> = {
  mounted(el, binding) {
    nodeList.set(el, {
      bindingFn: binding.value,
      excludes: Array.isArray(binding.arg)
        ? binding.arg
        : [binding.arg],
    })
    document?.removeEventListener('click', clickHandler)
    document?.addEventListener('click', clickHandler)
  },
  updated(el, binding) {
    nodeList.set(el, {
      bindingFn: binding.value,
      excludes: Array.isArray(binding.arg)
        ? binding.arg
        : [binding.arg],
    })
    document?.removeEventListener('click', clickHandler)
    document?.addEventListener('click', clickHandler)
  },
  unmounted(el) {
    nodeList.delete(el)
    document?.removeEventListener('click', clickHandler)
  },
}
