import {
  watch,
  isRef,
  onMounted,
  computed,
  unref,
} from 'vue'
import type { Ref, WatchStopHandle } from 'vue'

let stopWatchCssVar: WatchStopHandle | null = null

/**
 * If you pass a Ref vars param, it will generate a watch handler.
 *
 * In main.ts:
 *
 * ```ts
 * const themeVars ={
 *  '--md-color-primary': '#f44336',
 *  '--md-color-white': '#2196f3',
 * }
 * useCssVar(themeVars)
 * ```
 *
 * In components' steup:
 *
 * ```ts
 * setup() {
 *  const themeVars = ref({
 *    '--md-button-default-background-color': '#f44336',
 *    '--md-button-default-font-color': '#2196f3',
 *  })
 *  const stop = useCssVar(themeVars)
 *
 *  onUnmount(() => {
 *   stop()
 *  })
 * }
 * ```
 */
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
