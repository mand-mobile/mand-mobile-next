import {
  HIDE_EVENT,
  SHOW_EVENT,
  UPDATE_VISIBLE_EVENT,
} from 'mand-mobile/utils'
import { computed } from 'vue'
import type { SetupContext } from 'vue'

export function useShow<
  T extends { visible: boolean },
  E extends ('update:visible' | 'hide' | 'show')[]
>(props: T, emit: SetupContext<E>['emit']) {
  const popupShow = computed({
    get: () => props.visible,
    set: () => hide(),
  })
  const onHide = () => {
    emit(HIDE_EVENT)
    hide()
  }
  const onShow = () => {
    emit(SHOW_EVENT)
  }

  const hide = () => {
    emit(UPDATE_VISIBLE_EVENT, false)
  }
  return { popupShow, onHide, onShow, hide }
}
