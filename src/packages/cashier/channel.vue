<template>
  <div class="md-cashier-channel">
    <div class="choose-text">
      <p
        v-if="paymentTitle"
        class="choose-title"
        v-html="paymentTitle"
      ></p>
      <p
        v-if="paymentAmount"
        class="choose-number"
        v-html="paymentAmount"
      ></p>
      <p
        v-if="paymentDescribe"
        class="choose-describe"
        v-html="paymentDescribe"
      ></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    paymentTitle: {
      type: String,
      default: '',
    },
    paymentAmount: {
      type: String,
      default: '',
    },
    paymentDescribe: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {},
})
</script>
