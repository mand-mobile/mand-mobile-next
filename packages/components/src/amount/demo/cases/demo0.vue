<template>
  <div class="md-example-child md-example-child-amount">
    <div class="md-example-child-amount_item">
      <p class="describe">Original</p>
      <md-amount :value="1234.125" :precision="3"></md-amount>
    </div>
    <div class="md-example-child-amount_item">
      <p class="describe">Round</p>
      <md-amount :value="1234.125"></md-amount>
    </div>
    <div class="md-example-child-amount_item">
      <p class="describe">Floor</p>
      <md-amount :value="1234.123" :is-round-up="false"></md-amount>
    </div>
	</div>
</template>

<script>
import Amount from 'mand-mobile/lib/amount'

export default {
  components: {
    'md-amount': Amount,
  },
}

</script>

<style scoped>
.md-example-child-amount .md-example-child-amount_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  font-size: 48px;
}
.md-example-child-amount .md-example-child-amount_item .describe {
  color: #999;
  font-size: 18px;
  font-weight: 300;
}
</style>