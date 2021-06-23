import {
  provide,
  inject,
  computed,
  reactive,
  toRefs,
  ref,
  watchEffect,
} from 'vue'
import {
  CHANGE_EVENT,
  UPDATE_MODEL_EVENT,
} from 'mand-mobile/utils'
import type {
  InjectionKey,
  ComponentPublicInstance,
  ExtractPropTypes,
  SetupContext,
} from 'vue'

type IModelType = boolean | string | number

interface RadioGroupContext {
  name: 'MdRadioGroup'
  modelValue: IModelType
  checkEvent: (val: IModelType) => void
}

interface IPartialRadioProps {
  modelValue?: IModelType
  name: IModelType
  disabled?: boolean
  iconDisabled?: string
  icon?: string
  iconInverse?: string
}

const radioGroupKey: InjectionKey<RadioGroupContext> =
  'RadioGroup' as any

export const radioProps = {
  name: {
    type: [String, Number, Boolean],
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  size: {
    type: String,
    default: 'md',
  },
  label: {
    type: String,
    default: '',
  },
  inline: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: 'checked',
  },
  iconInverse: {
    type: String,
    default: 'check',
  },
  iconDisabled: {
    type: String,
    default: 'check-disabled',
  },
  iconSvg: {
    type: Boolean,
    default: false,
  },
}

export const useRadio = (
  props: ExtractPropTypes<typeof radioProps>,
  { emit }: SetupContext<'update:modelValue'[]>
) => {
  const radioGroup = inject(
    radioGroupKey,
    {} as RadioGroupContext
  )
  const isGroup = computed(
    () => radioGroup?.name === 'MdRadioGroup'
  )

  const isChecked = computed(
    () =>
      props.modelValue === props.name ||
      (isGroup.value &&
        radioGroup.modelValue === props.name)
  )

  const currentIcon = computed(() =>
    props.disabled
      ? props.iconDisabled
      : isChecked.value
      ? props.icon
      : props.iconInverse
  )

  const clickHandler = () => {
    if (!props.disabled) {
      if (isGroup.value) {
        radioGroup.checkEvent(
          props.name as Exclude<
            IModelType | undefined,
            undefined
          >
        )
      } else {
        emit(UPDATE_MODEL_EVENT, props.name)
      }
    }
  }

  return {
    isChecked,
    currentIcon,

    clickHandler,
  }
}

export const useRadioGroup = (
  props: {
    modelValue: IModelType
  },
  { emit }: SetupContext<'update:modelValue'[]>
) => {
  const checkEvent = (name: IModelType) => {
    emit(UPDATE_MODEL_EVENT, name)
  }

  provide(
    radioGroupKey,
    reactive({
      name: 'MdRadioGroup',
      ...toRefs(props),
      checkEvent,
    })
  )
}

export const useRadioList = (
  props: {
    modelValue: IModelType
  },
  { emit }: SetupContext<('update:modelValue' | 'change')[]>
) => {
  const selectedValue = computed<IModelType>({
    get: () => props.modelValue,
    set: (val) => emit(UPDATE_MODEL_EVENT, val),
  })

  const selectHandler = (
    item: { value: IModelType },
    index: number
  ) => {
    const isChange = item.value === selectedValue.value
    selectedValue.value = item.value
    inputSelected.value = false
    inputValue.value = ''
    !isChange && emit(CHANGE_EVENT, item, index)
  }

  const mdInput = ref<ComponentPublicInstance | null>(null)
  const inputSelected = ref(false)
  const inputValue = ref('')
  const focusHandler = () => (
    (inputSelected.value = true), (selectedValue.value = '')
  )
  const blurHandler = () => (inputSelected.value = false)

  watchEffect(() => {
    if (inputValue.value)
      selectedValue.value = inputValue.value
  })

  return {
    selectedValue,
    selectHandler,

    mdInput,
    inputValue,
    inputSelected,
    focusHandler,
    blurHandler,
  }
}
