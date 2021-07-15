<template>
  <div class="md-action-bar">
    <div class="md-action-bar-container">
      <div
        v-if="!!$slots.default"
        class="md-action-bar-text"
      >
        <slot></slot>
      </div>
      <div class="md-action-bar-group">
        <template
          v-for="(item, index) in coerceActions"
          :key="index"
        >
          <md-button
            class="md-action-bar-button"
            :type="
              item.type ||
              (!!item.disabled ? 'disabled' : 'primary')
            "
            :plain="
              item.plain ||
              index !== coerceActions.length - 1
            "
            :round="item.round"
            :inactive="item.inactive"
            :loading="item.loading"
            :icon="item.icon"
            :icon-svg="item.iconSvg"
            @click="onBtnClick($event, item)"
          >
            {{ item.text }}
          </md-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import MdButton from 'mand-mobile/button'

interface IAction {
  text?: string
  disabled?: boolean
  type?:
    | 'default'
    | 'primary'
    | 'warning'
    | 'disabled'
    | 'link'
  plain?: boolean
  round?: boolean
  icon?: string
  iconSvg?: boolean
  inactive?: boolean
  loading?: boolean
}

export default defineComponent({
  name: 'MdActionBar',
  components: {
    MdButton,
  },
  props: {
    actions: {
      type: Array as PropType<
        Array<
          IAction & {
            onClick: (event: Event, action: IAction) => void
          }
        >
      >,
      default: () => [],
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const coerceActions = computed(() =>
      props.actions.slice(0, 2)
    )

    const onBtnClick = (
      ev: Event,
      action: typeof props.actions[0]
    ) => {
      action.onClick && action.onClick(ev, action)
      emit('click', ev, action)
    }

    return {
      coerceActions,
      onBtnClick,
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-action-bar
  position fixed
  z-index var(--md-action-bar-zindex)
  left 0
  bottom 0
  right 0
  display flex
  padding var(--md-action-bar-padding-v) var(--md-action-bar-padding-h)
  background var(--md-color-bg-inverse)
  clearfix()

.md-action-bar-container
  display flex
  flex 1
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)

.md-action-bar-text
  display flex
  flex 1
  height var(--md-action-bar-slot-height)
  margin-right var(--md-action-bar-button-gap)
  align-items center
  overflow hidden

.md-action-bar-group
  display flex
  flex 1
  height 100%

.md-action-bar-button
  display flex
  float right
  align-items center
  justify-content center
  flex 1
  &:nth-of-type(2)
    margin-left var(--md-action-bar-button-gap)
</style>
