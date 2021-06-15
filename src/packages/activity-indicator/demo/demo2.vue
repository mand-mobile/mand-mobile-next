<template>
  <div
    class="
      md-example-child
      md-example-child-md-activity-indicator
      md-example-child-md-activity-indicator-2
    "
  >
    <md-activity-indicator
      type="carousel"
      :size="15"
    ></md-activity-indicator>
    <md-button type="primary" @click="createPay">
      <md-activity-indicator
        v-if="loading"
        class="md-activity-indicator-css"
        type="carousel"
        :size="15"
        color="#fff"
        text-color="#fff"
      ></md-activity-indicator>
      <span v-else>确认支付</span>
    </md-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ActivityIndicator } from 'mand-mobile/activity-indicator'
import { Button } from 'mand-mobile/button'

export default defineComponent({
  name: 'ActivityIndicatorDemo',
  title: 'Carousel',
  components: {
    [ActivityIndicator.name]: ActivityIndicator,
    [Button.name]: Button,
  },
  setup() {
    const loading = ref(false)

    const createPay = () => {
      if (loading.value) {
        return
      }
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }

    return {
      loading,
      createPay,
    }
  },
})
</script>

<style lang="stylus">
.md-example-child-md-activity-indicator-2
  display flex
  flex-direction column
  align-items center
  .md-activity-indicator
    margin-bottom 30px
  .md-button
    width 100%
    .md-activity-indicator-css
      margin-bottom 0
      .md-activity-indicator-svg
        height 15px !important
</style>
