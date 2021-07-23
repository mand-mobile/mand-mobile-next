<template>
  <!-- todo radio-group 重新实现  -->
  <div
    class="md-radio-list"
    :class="{ 'is-align-center': alignCenter }"
  >
    <md-cell-item
      v-for="(item, index) in options"
      :key="index"
      class="md-radio-item"
      :class="{
        'is-selected':
          selectedValue === item.value && !inputSelected,
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
      :no-border="index === options.length - 1"
      @click="selectHandler(item, index)"
    >
      <template v-if="isSlotScope || !!$slots.default">
        <slot
          :option="item"
          :index="index"
          :selected="selectedValue === item.value"
        ></slot>
      </template>

      <template
        v-if="
          !isSlotScope &&
          !$slots.default &&
          !alignCenter &&
          !inputSelected
        "
        #[iconPosition]
      >
        <md-radio
          ref="inputItem"
          v-model="selectedValue"
          :disabled="item.disabled"
          :name="item.value"
          :size="iconSize"
          :icon="icon"
          :icon-inverse="iconInverse"
          :icon-disabled="iconDisabled"
          :icon-svg="iconSvg"
        ></md-radio>
      </template>
      <template #[otherSlot]>
        <slot
          :name="otherSlot"
          :option="item"
          :index="index"
          :selected="selectedValue === item.value"
        ></slot>
      </template>
    </md-cell-item>
    <md-input-item
      v-if="hasInput"
      v-model="inputValue"
      class="md-radio-item"
      :class="{
        'is-selected': inputSelected,
      }"
      :title="inputLabel"
      :placeholder="inputPlaceholder"
      @focus="focusHandler"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MdCellItem from 'mand-mobile-next/cell-item'
import MdInputItem from 'mand-mobile-next/input-item'
import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
} from 'mand-mobile-next/utils'
import MdRadio from './index.vue'
import { useRadioList } from './use-radio'

export default defineComponent({
  name: 'MdRadioList',
  components: {
    MdRadio,
    MdCellItem,
    MdInputItem,
  },
  props: {
    options: {
      type: Array as PropType<
        Array<{
          value: string | number
          disabled?: boolean
          text?: string | number
          label?: string | number
          brief?: string | number
          [k: string]: any
        }>
      >,
      default: () => {
        /* istanbul ignore next */
        return []
      },
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    hasInput: {
      type: Boolean,
      default: false,
    },
    inputLabel: {
      type: String,
      default: '',
    },
    inputPlaceholder: {
      type: String,
      default: '',
    },
    alignCenter: {
      type: Boolean,
      default: false,
    },
    isSlotScope: {
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
      type: String as PropType<'left' | 'right'>,
      default: 'left',
    },
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props, context) {
    const {
      selectedValue,
      selectHandler,
      mdInput: inputItem,

      inputValue,
      inputSelected,
      focusHandler,
      blurHandler,
    } = useRadioList(props, context)

    const otherSlot: 'left' | 'right' =
      props.iconPosition === 'left' ? 'right' : 'left'

    return {
      selectedValue,
      selectHandler,
      inputItem,

      inputValue,
      inputSelected,
      focusHandler,
      blurHandler,

      otherSlot,
    }
  },
})
</script>

<style lang="stylus">
.md-radio-item
  .md-radio
    margin-top 0
    margin-bottom 0

.md-radio-list
  .md-cell-item-body.multilines .md-cell-item-title
    font-weight var(--md-font-weight-medium)
  &.is-align-center
    .md-cell-item-content
      text-align center
    .md-cell-left,
    .md-cell-right
      display none
</style>
