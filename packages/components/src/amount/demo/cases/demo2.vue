<template>
  <div class="md-example-child md-example-child-amount">
    <p>
      <md-amount :value="val" :duration="800" transition></md-amount>
    </p>
    <md-button class="btn" inline size="small" @click="randomDelta">加{{delta}}</md-button>
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
.md-example-child-amount {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 48px;
}
.md-example-child-amount .btn {
  margin-top: 20px;
}
</style>