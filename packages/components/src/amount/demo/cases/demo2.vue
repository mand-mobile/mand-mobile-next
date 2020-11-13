<template>
  <div class="md-example-child md-example-child-amount">
    <md-amount class="amount" :value="val" :duration="800" transition></md-amount>
    <md-button inline size="small" @click="randomDelta">加{{delta}}</md-button>
	</div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Amount from 'mand-mobile/lib/amount'

export default {
  components: {
    'md-button': Button,
    'md-amount': Amount,
  },
  data() {
    return {
      val: 1000,
      delta: 0,
    }
  },
  mounted() {
    this.randomDelta()
  },
  methods: {
    randomDelta() {
      this.delta = +(Math.random() * 100).toFixed(2)
      this.val += this.delta
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '变化动效',
  },
  'en-US': {
    title: 'Transition',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-amount .amount{
  font-weight: 300;
  font-size: 48px;
  text-align: center;
  color: #666;
}
</style>