<template>
  <!-- PLATFORM: globally registered primitive component-->
  <md-transition-primitive
    :show="show"
    :name="name"
    :styles="styles"
    @before-enter="$_onBeforeEnter"
    @enter="$emit('enter')"
    @after-enter="$_onAfterEnter"
    @before-leave="$_onBeforeLeave"
    @after="$emit('leave')"
    @after-leave="$_onAfterLeave"
  >
    <slot></slot>
  </md-transition-primitive>
</template>

<script>
import '@mand-mobile/shared/lib/style/transition.styl'
import Transition from '@mand-mobile/platform/lib/runtime/component/transition'

export default {
  name: 'md-transition',
  props: ['show', 'name', 'styles'],
  components: {
    'md-transition-primitive': Transition
  },
  methods: {
    $_onBeforeEnter() {
      this.$emit('beforeEnter')
      this.$emit('before-enter')
    },
    $_onBeforeLeave() {
      this.$emit('beforeLeave')
      this.$emit('before-leave')
    },
    $_onAfterEnter() {
      this.$emit('afterEnter')
      this.$emit('after-enter')
    },
    $_onAfterLeave() {
      this.$emit('afterLeave')
      this.$emit('after-leave')
    },
  }
}
</script>
<style lang="stylus">
// @import '@mand-mobile/shared/lib/style/transition.styl'
</style>