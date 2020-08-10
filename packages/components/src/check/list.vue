<template>
  <md-check-group
    ref="group"
    class="md-check-list"
    :class="{ 'md-check-list--is-align-center': alignCenter }"
    :value="value"
    @input="$_onInput"
  >
    <md-cell-item
      v-for="(item, index) in options"
      :key="index"
      class="md-check-item"
      :class="{
        'md-check-item--is-checked': value.indexOf(item.value) !== -1,
      }"
      :title="hasSlot ? '' : (item.text || item.label)"
      :active="isTitleActive && value.indexOf(item.value) !== -1"
      :brief="hasSlot ? '' : item.brief"
      :disabled="item.disabled"
      @click="$_check(item, index)"
    >
      <template v-if="hasSlot">
        <slot :option="item" :index="index" :selected="value.indexOf(item.value) > -1"></slot>
      </template>
      <!--iconPosition-->
      <template #right>
        <md-check
          v-if="!alignCenter && iconPosition === 'right'"
          :name="item.value"
          :disabled="item.disabled"
          :size="iconSize"
          :icon="icon"
          :icon-inverse="iconInverse"
          :icon-disabled="iconDisabled"
          :icon-svg="iconSvg"
        />
      </template>
      <template #left>
        <md-check
          v-if="!alignCenter && iconPosition === 'left'"
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

<script>
import Check from '../check'
import CellItem from '../cell-item'
import CheckGroup from '../check/group'
import checkMixin from './mixin'

export default {
  name: 'md-check-list',

  mixins: [checkMixin],

  components: {
    'md-check': Check,
    'md-check-group': CheckGroup,
    'md-cell-item': CellItem,
  },

  props: {
    options: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    value: {
      type: Array,
      default() {
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
    isTitleActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasSlot() {
      return this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default
    },
  },

  methods: {
    // MARK: private methods 小程序事件冒泡不生效
    $_check(option) {
      this.$refs.group.toggle(option.value)
    },
    // MARK: private events
    $_onInput(value) {
      this.$emit('input', value)
    },
  },
}

</script>

<style lang="stylus" scoped>
.md-check-item
  text-align left
</style>
