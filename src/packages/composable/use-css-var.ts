import {
  watch,
  isRef,
  onMounted,
  computed,
  unref,
} from 'vue'
import type { Ref, WatchStopHandle } from 'vue'

let stopWatchCssVar: WatchStopHandle | null = null

export function useCssVar(
  vars:
    | Ref<Record<string, string>>
    | Record<string, string>,
  target?: Ref<HTMLElement> | HTMLElement
) {
  const elRef = computed(
    () => unref(target) || window?.document?.documentElement
  )
  const VAR_PREFIX = '--md-'

  const setVars = (
    target: HTMLElement,
    val: Record<string, string>
  ) => {
    Object.keys(val).forEach((key) => {
      if (key.startsWith(VAR_PREFIX)) {
        target.style.setProperty(key, val[key])
      } else {
        target.style.setProperty(VAR_PREFIX + key, val[key])
      }
    })
  }

  if (stopWatchCssVar) {
    stopWatchCssVar()
    stopWatchCssVar = null
  }

  onMounted(() => {
    isRef(vars)
      ? (stopWatchCssVar = watch(
          vars,
          (val) => {
            setVars(elRef.value, val)
          },
          {
            immediate: true,
          }
        ))
      : setVars(elRef.value, vars)
  })

  return stopWatchCssVar
}
