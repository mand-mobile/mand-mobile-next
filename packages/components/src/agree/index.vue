<template>
  <div
    class="md-agree"
    :class="[
      disabled ? 'md-agree--disabled' : ''
    ]">
    <div
      class="md-agree_icon"
      :class="[
        value ? 'md-agree_icon--checked' : ''
      ]"
      @click="$_onChange($event)">
      <div class="md-agree_icon_container">
        <md-icon class="md-agree_icon--checked" name="checked" :size="size"></md-icon>
        <md-icon class="md-agree_icon--check" name="check" :size="size"></md-icon>
      </div>
    </div>
    <div class="md-agree_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Icon from 'mand-mobile/lib/icon'

export default {
  name: 'md-agree',

  components: {
    'md-icon': Icon,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
  },

  data() {
    return {}
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onChange(event) {
      if (this.disabled) {
        return
      }
      this.$emit('input', !this.value)
      this.$emit('change', event)
    },
  },
}

</script>

<style lang="stylus" scoped>
.md-agree
  display flex
  align-items center
  &--disabled
    opacity md-agree-disabled-opacity

.md-agree_icon
  display flex
  justify-content center
  align-items center
  align-self flex-start
  flex-shrink 0
  position relative
  margin-right md-h-gap-sm
  color md-agree-fill
  width 50px
  height 50px
  .md-agree_icon_container
    position relative
    .md-icon
      display flex
      width auto 
      height auto
      line-height 1
      will-change auto
    .md-agree_icon--checked
      position absolute
      top 0
      left 0
      transform scale(0.6)
      color transparent
      transition all .3s md-ease-in-out-quint
    .md-agree_icon--check
      color md-agree-fill
  &--checked .md-agree_icon_container
    .md-agree_icon--checked
      transform scale(1)
      color md-agree-fill
    .md-agree_icon--check
      opacity 0.8

.md-agree_content
  flex 1 1 0%
  line-height 1.5
</style>
