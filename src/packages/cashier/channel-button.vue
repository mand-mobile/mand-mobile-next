<template>
  <div class="md-cashier-block-btn">
    <!-- eslint-disable vue/no-v-html-->
    <md-button
      v-for="(action, index) in actions"
      :key="index"
      :type="
        index === actions.length - 1 ? 'primary' : 'default'
      "
      :inline="actions.length > 1"
      @click="
        () => {
          action.handler && action.handler()
        }
      "
      v-html="action.buttonText"
    >
    </md-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Button from 'mand-mobile/button'

export default defineComponent({
  name: 'MdCashierChannelButton',

  components: {
    [Button.name]: Button,
  },

  props: {
    actions: {
      type: Array as PropType<
        Array<{
          handler?: (...args: any[]) => void
          buttonText: string
        }>
      >,
      default: () => [],
    },
  },
})
</script>

<style lang="stylus">
.md-cashier-block-btn
  display flex
  .md-button
    flex 1
    margin-right h-gap-md
    &:last-of-type
      margin 0
</style>
