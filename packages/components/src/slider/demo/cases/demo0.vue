<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity"></md-slider>
  </div>
</template>

<script>
import Slider from 'mand-mobile/lib/slider'

export default {
  components: {
    'md-slider': Slider,
  },
  data() {
    return {
      quantity: 25,
    }
  },
}

</script>

<style scoped>
.md-example-child-slider {
  padding: 20px;
  border-radius: 6px;
  background: #fff;
}
</style>
