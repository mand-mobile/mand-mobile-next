<template>
  <div class="md-action-bar">
    <div class="md-action-bar_container">
      <div class="md-action-bar_text" v-if="hasSlots">
        <slot></slot>
      </div>
      <div class="md-action-bar_group">
        <template v-for="(item, index) in coerceActions">
          <md-button
            class="md-action-bar_button"
            :type="item.type || (!!item.disabled ? 'disabled' : 'primary')"
            :plain="item.plain || (index !== coerceActions.length - 1)"
            :round="item.round"
            :inactive="item.inactive"
            :loading="item.loading"
            :icon="item.icon"
            :icon-svg="item.iconSvg"
            :key="index"
            @click="$_onBtnClick($event, item, index)"
          >
            {{ item.text }}
          </md-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {isEmptyObject} from '@mand-mobile/shared/lib/util'
import Button from '../button'

export default {
  name: 'md-action-bar',

  components: {
    'md-button': Button,
  },

  props: {
    actions: {
      type: Array,
      default: [],
    },
  },

  computed: {
    coerceActions() {
      return this.actions.slice(0, 2)
    },
    hasSlots() {
      return !isEmptyObject(this.$slots)
    },
  },

  methods: {
    // MARK: events handler
    $_onBtnClick(event, action, index) {
      if (action.onClick) {
        action.onClick(event, action, index)
      }
      this.$emit('click', event, action, index)
    },
  },
}

</script>

<style lang="stylus">
.md-action-bar
  // position fixed
  position relative
  z-index md-action-bar-zindex
  left 0
  bottom 0
  right 0
  display flex
  padding md-action-bar-padding-v md-action-bar-padding-h
  background md-color-bg-inverse
  clearfix()

.md-action-bar_container
  display flex
  flex 1
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)
  
.md-action-bar_text
  display flex
  flex 1
  height md-action-bar-slot-height
  margin-right md-action-bar-button-gap
  align-items center
  overflow hidden

.md-action-bar_group
  display flex
  flex 1
  height 100%

.md-action-bar_button
  display flex
  float right
  align-items center
  justify-content center
  flex 1
  &:nth-of-type(2)
    margin-left md-action-bar-button-gap
</style>
