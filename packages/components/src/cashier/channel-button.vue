<template>
  <div class="md-cashier_container_block_btn">
    <md-button
      v-for="(action, index) in actions"
      :type="index === actions.length - 1 ? 'primary': 'default'"
      :inline="actions.length > 1"
      :key="index"
      v-html="action.buttonText"
      @click="() => {
        action.handler && action.handler()
      }"
    >
    </md-button>
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
.md-cashier_container_block_btn
  display flex
  .md-button
    flex 1
    margin-right md-h-gap-md
    &:last-of-type
      margin 0
</style>

