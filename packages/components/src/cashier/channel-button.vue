<template>
  <div class="md-cashier-block-btn">
    <md-button
      class="md-button"
      v-for="(action, index) in actions"
      :type="index === actions.length - 1 ? 'primary': 'default'"
      :key="index"
      v-html="action.buttonText"
      @click="$emit('action', action)"
    ></md-button>
  </div>
</template>

<script>
import Button from '../button'

export default {
  name: 'md-cashier-channel-button',

  components: {
    'md-button': Button,
  },

  props: {
    actions: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
  },
}

</script>

<style lang="stylus">
.md-cashier-block-btn
  display flex
  block()
  padding 0 40px 40px
  box-sizing border-box
  .md-button
    flex 1
    margin-right md-h-gap-md
    &:last-of-type
      margin 0
</style>

