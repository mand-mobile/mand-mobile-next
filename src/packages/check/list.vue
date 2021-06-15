<template>
  <md-check-group
    ref="group"
    class="md-check-list"
    :class="{ 'is-align-center': alignCenter }"
    :model-value="modelValue"
    @update:modelValue="checkEvent"
  >
    <md-cell-item
      v-for="(item, index) in options"
      :key="index"
      class="md-check-item"
      :class="{
        'is-checked': modelValue.includes(item.value),
      }"
      :title="
        isSlotScope && !!$slots.default
          ? ''
          : item.text || item.label
      "
      :brief="
        isSlotScope && !!$slots.default ? '' : item.brief
      "
      :disabled="item.disabled"
      @click="cellClickHandler(index)"
    >
      <template v-if="isSlotScope || !!$slots.default">
        <slot
          :option="item"
          :index="index"
          :selected="modelValue.includes(item.value)"
        ></slot>
      </template>
      <template v-if="!alignCenter" #[iconPosition]>
        <md-check
          :ref="
            (el) => {
              if (el) checks[index] = el
            }
          "
          :name="item.value"
          :disabled="item.disabled"
          :size="iconSize"
          :icon="icon"
          :icon-inverse="iconInverse"
          :icon-disabled="iconDisabled"
          :icon-svg="iconSvg"
        />
      </template>
    </md-cell-item>
  </md-check-group>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  onBeforeUpdate,
} from 'vue'
import MdCellItem from 'mand-mobile/cell-item'
import { UPDATE_MODEL_EVENT } from 'mand-mobile/utils'
import MdCheckGroup from './group.vue'
import MdCheck from './index.vue'

export default defineComponent({
  components: { MdCheckGroup, MdCheck, MdCellItem },
  props: {
    options: {
      type: Array as PropType<
        Array<{
          value: string | number
          disabled?: boolean
          text?: string
          label?: string
          brief?: string
        }>
      >,
      default: () => {
        /* istanbul ignore next */
        return []
      },
    },
    modelValue: {
      type: Array as PropType<(string | number)[]>,
      default: () => {
        /* istanbul ignore next */
        return []
      },
    },
    alignCenter: {
      type: Boolean,
      default: false,
    },
    isSlotScope: {
      type: Boolean,
      default: undefined,
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
      type: String as PropType<'left' | 'right'>,
      default: 'right',
    },
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(_, { emit }) {
    const checkEvent = (
      values: (string | number)[] | undefined
    ) => {
      emit(UPDATE_MODEL_EVENT, values)
    }

    const checks = ref<any[]>([])
    onBeforeUpdate(() => {
      checks.value = []
    })

    const cellClickHandler = (index: number) => {
      checks.value[index].clickHandler()
    }

    return { checkEvent, checks, cellClickHandler }
  },
})
</script>

<style lang="stylus">
.md-check-item
  .md-check
    margin-top 0
    margin-bottom 0
    pointer-events none
  .md-cell-item-body.multilines .md-cell-item-title
    font-weight font-weight-medium

.md-check-list.is-align-center
  .md-cell-item-content
    text-align center
  .md-cell-left,
  .md-cell-right
    display none
</style>
