import {
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { t } from 'mand-mobile/locale'
import {
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
  CHANGE_EVENT,
} from 'mand-mobile/utils'
import { useShow } from 'mand-mobile/selector'
import type {
  ExtractPropTypes,
  SetupContext,
  PropType,
} from 'vue'

type EmitsType =
  | 'update:modelValue'
  | 'update:visible'
  | 'hide'
  | 'show'
  | 'change'
type PropsType = ExtractPropTypes<typeof tabPickerProps>

export const emits: EmitsType[] = [
  CHANGE_EVENT,
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
]

type DataOpstions = {
  name: string
  label: string
  options: Array<{
    value: string
    label: string
    children?: DataOpstions
  }>
}

export const tabPickerProps = {
  modelValue: {
    type: [Number, String, Array] as PropType<
      (string | number)[]
    >,
    default: () => [],
  },
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as PropType<DataOpstions>,
    default: () => ({}),
  },
  /**
   * @deprecated
   */
  defaultValue: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: t('md.tab-picker.choose'),
  },
  value: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  describe: {
    type: String,
    default: '',
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  maxHeight: {
    type: String,
    default: '40vh',
  },
  minHeight: {
    type: String,
    default: '40vh',
  },
}

export const useTabPicker = (
  props: PropsType,
  { emit }: SetupContext<EmitsType[]>
) => {
  const tabsRef = ref<any>(null)
  const { popupShow, onHide, onShow, hide } = useShow(
    props,
    emit
  )

  watch(popupShow, (val) => {
    if (val) {
      nextTick(() => {
        /**
         * important reset scroller
         */
        const tabBar = tabsRef.value.$refs.tabBar

        tabsRef.value.swiper.renderSwiper()
        tabBar.setInkStyle(tabBar.modelIndex)
      })
    }
  })

  const innerValue = computed({
    get: () => props.modelValue,
    set: (val) => emit(UPDATE_MODEL_EVENT, val),
  })

  const createPane = (data: DataOpstions) => {
    const pane: any = reactive({})
    if (data && data.name) {
      pane.name = data.name
      pane.label = data.label
      pane.options = data.options
    }
    return pane
  }

  const panes = ref<DataOpstions[]>([])

  const changeHandler = (options: any, index: number) => {
    const item = options.find(
      (opt: any) => opt.value === innerValue.value[index]
    )

    panes.value[index].label = item.label

    emit(CHANGE_EVENT, {
      index,
      options,
      value: innerValue.value[index],
    })

    panes.value.splice(index + 1)
    innerValue.value.splice(index + 1)

    if (item.children) {
      panes.value[index + 1] = createPane(item.children)
      nextTick(() => {
        tabsRef.value.swiper
          .getSwiperInstance()
          ?.goToPage(index + 1, 0)
      })
    } else {
      hide()
    }
  }

  onMounted(() => {
    panes.value.push(createPane(props.data))
  })

  return {
    tabsRef,
    popupShow,
    onHide,
    onShow,
    hide,
    panes,
    innerValue,
    changeHandler,
  }
}
