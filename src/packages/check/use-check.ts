import {
  provide,
  inject,
  computed,
  reactive,
  toRefs,
} from 'vue'
import { UPDATE_MODEL_EVENT } from 'mand-mobile/utils'

import type {
  InjectionKey,
  ExtractPropTypes,
  SetupContext,
} from 'vue'

type IGroupModelType = Array<string | number>
type IModelType = boolean | string | number

interface CheckGroupContext {
  name: 'MdCheckGroup'
  modelValue: IGroupModelType
  max: number
  isMax: boolean
  checkEvent: (val: IModelType) => void
}

const checkGroupKey: InjectionKey<CheckGroupContext> =
  'CheckGroup' as any

export const checkProps = {
  name: {
    type: [Boolean, String, Number],
    default: true,
  },
  modelValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  size: {
    type: String,
    default: 'md',
  },
  label: {
    type: String,
    default: '',
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
  iconSize: {
    type: String,
    default: 'md',
  },
  iconPosition: {
    type: String,
    default: 'right',
  },
}

export const useCheck = (
  props: ExtractPropTypes<typeof checkProps>,
  { emit }: SetupContext<'update:modelValue'[]>
) => {
  const checkGroup = inject(
    checkGroupKey,
    {} as CheckGroupContext
  )
  const isGroup = computed(
    () => checkGroup?.name === 'MdCheckGroup'
  )
  const isMax = computed(() => checkGroup.isMax)

  const isChecked = computed(
    () =>
      props.modelValue === props.name ||
      (isGroup.value &&
        checkGroup.modelValue.includes(
          props.name as Exclude<IModelType, boolean>
        ))
  )

  const clickHandler = () => {
    if (!props.disabled) {
      if (typeof props.name === 'boolean') {
        emit(UPDATE_MODEL_EVENT, !props.modelValue)
      } else {
        if (isGroup.value) {
          checkGroup.checkEvent(props.name)
        } else {
          emit(
            UPDATE_MODEL_EVENT,
            isChecked.value ? '' : props.name
          )
        }
      }
    }
  }

  const currentIcon = computed(() => {
    if (isGroup.value && isMax.value && !isChecked.value) {
      return props.iconDisabled
    } else {
      return props.disabled
        ? props.iconDisabled
        : isChecked.value
        ? props.icon
        : props.iconInverse
    }
  })

  return {
    isChecked,
    currentIcon,

    clickHandler,
  }
}

export const useCheckGroup = (
  props: {
    modelValue: IGroupModelType
    max: number
  },
  { emit, slots }: SetupContext
) => {
  const isMax = computed(
    () =>
      props.max !== 0 &&
      props.modelValue.length === props.max
  )

  const toggleAll = (all = true) => {
    const children = slots.default?.()
    const names = children
      ?.filter((c) => c.props?.disabled === undefined)
      .map((c) => c.props?.name)

    const reverseNames = [...(names ?? [])]
    props.modelValue.forEach((c) =>
      reverseNames?.splice(
        reverseNames.findIndex((n) => n === c),
        1
      )
    )

    all
      ? emit(
          UPDATE_MODEL_EVENT,
          props.max === 0
            ? names?.slice()
            : names?.slice(0, props.max)
        )
      : emit(UPDATE_MODEL_EVENT, reverseNames)
  }

  const checkEvent = (
    name: Exclude<IModelType, boolean>
  ) => {
    const updateData = [...new Set(props.modelValue)]
    const index = updateData.findIndex(
      (val) => val === name
    )

    index === -1
      ? !isMax.value && updateData.push(name)
      : updateData.splice(index, 1)

    emit(UPDATE_MODEL_EVENT, updateData)
  }

  provide(
    checkGroupKey,
    reactive({
      name: 'MdCheckGroup',
      ...toRefs(props),
      checkEvent,
      isMax,
    })
  )

  return { toggleAll }
}
