import { ref, computed, watch, isRef } from 'vue'
import type { Ref } from 'vue'

export function useCssVar(
  vars:
    | Ref<Record<string, string>>
    | Record<string, string>,
  target?: HTMLElement
) {
  const elRef = target || window?.document?.documentElement
  const VAR_PREFIX = '--md-'

  const setVars = (val: Record<string, string>) => {
    Object.keys(val).forEach((key) => {
      if (key.startsWith(VAR_PREFIX)) {
        elRef.style.setProperty(key, val[key])
      } else {
        elRef.style.setProperty(VAR_PREFIX + key, val[key])
      }
    })
  }

  isRef(vars)
    ? watch(
        vars,
        (val) => {
          setVars(val)
        },
        {
          immediate: true,
        }
      )
    : setVars(vars)
}
