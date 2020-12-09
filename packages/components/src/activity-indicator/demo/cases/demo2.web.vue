<template>
  <div class="md-example-child md-example-child-activity-indicator md-example-child-activity-indicator-2">
    <md-activity-indicator
      type="carousel"
      :size="15"
    ></md-activity-indicator>
    <md-button type="primary" size="small" @click="createPay">
      <md-activity-indicator
        v-if="loading"
        class="activity-indicator-css"
        type="carousel"
        :size="15"
        color="#fff"
        text-color="#fff"
      ></md-activity-indicator>
      <span v-else>确认支付</span>
    </md-button>
	</div>
</template>

<script>
import ActivityIndicator from 'mand-mobile/lib/activity-indicator'
import Button from 'mand-mobile/lib/button'

export default {
  components: {
    'md-activity-indicator': ActivityIndicator,
    'md-button': Button,
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    createPay() {
      if (this.loading) {
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
  },
}
// #region ignore
export const metaInfo = {
  title: 'Carousel',
  platform: 'web',
}
// #endregion ignore

</script>

<style lang="stylus" scoped>
.md-example-child-activity-indicator-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
    
.md-example-child-activity-indicator-2 .md-button {
  margin-top: 30px;
}

</style>