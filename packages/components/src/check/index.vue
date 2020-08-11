<template>
  <label
    class="md-check"
    :class="{
      'md-check--is-disabled': disabled,
      'md-check--is-checked': isChecked
    }"
    @click.stop="$_onClick"
  >
    <div class="md-check_icon">
      <md-icon :name="currentIcon" :size="size" :svg="iconSvg"/>
    </div>
    <div class="md-check_label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script>
import Icon from 'mand-mobile/lib/icon'
import checkMixin from './mixin'

export default {
  name: 'md-check',

  mixins: [checkMixin],

  components: {
    'md-icon': Icon,
  },

  props: {
    name: {
      default: true,
    },
    value: {
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
  },

  computed: {
    isChecked() {
      return this.value === this.name || (this.rootGroup && this.rootGroup.value.indexOf(this.name) !== -1)
    },
    currentIcon() {
      return this.disabled ? this.iconDisabled : this.isChecked ? this.icon : this.iconInverse
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
.md-check
  display flex
  align-items center
  margin-top md-v-gap-sm
  margin-bottom md-v-gap-sm
  &--is-checked
    .md-check_icon
      color md-check-color
  &--is-disabled
    .md-check_icon
    .md-check_label
      color md-color-text-disabled

.md-check_icon
  position relative
  color md-color-text-placeholder
  .md-icon
    display flex

.md-check_label
  margin-left md-h-gap-sm
  font-size inherit
</style>
