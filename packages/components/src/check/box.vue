<template>
  <md-check-base-box
    class="md-check-box"
    :label="label"
    :is-checked="isChecked"
    :disabled="disabled"
    @click.native="$_onClick"
  >
    <slot>{{label}}</slot>
  </md-check-base-box>
</template>

<script>import CheckBaseBox from '../check-base'

export default {
  name: 'md-check-box',

  components: {
    'md-check-base-box': CheckBaseBox,
  },

  props: {
    name: {
      default: true,
    },
    value: {
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isChecked() {
      return this.value === this.name || (this.rootGroup && this.rootGroup.value.indexOf(this.name) !== -1)
    },
  },

  inject: {
    rootGroup: {default: null},
  },

  mounted() {
    if (this.rootGroup) {
      this.rootGroup.register(this)
    }
  },
  destroyed() {
    if (this.rootGroup) {
      this.rootGroup.unregister(this)
    }
  },

  methods: {
    $_onClick() {
      if (this.disabled) {
        return
      }

      if (typeof this.name === 'boolean') {
        this.$emit('input', !this.value)
      } else if (this.isChecked) {
        this.$emit('input', '')
        if (this.rootGroup) {
          this.rootGroup.uncheck(this.name)
        }
      } else {
        this.$emit('input', this.name)
        if (this.rootGroup) {
          this.rootGroup.check(this.name)
        }
      }
    },
  },
}
</script>

<style lang="stylus">
.md-check-box
  position relative
  &--is-checked
    color md-checkbox-active-color
    border-color md-checkbox-active-border-color
    &--is-disabled
      color md-checkbox-active-color
      border-color md-checkbox-active-border-color
      opacity 0.6
  &--is-disabled
    color md-checkbox-disabled-color
    border-color md-checkbox-disabled-color

  .md-tag
    position absolute
    top 0
    right 0
    .quarter-bg
      background-color md-checkbox-active-color
</style>
