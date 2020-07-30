<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity"></md-slider>
  </div>
</template>

<script>import Slider from '../../index'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '基本',
  titleEnUS: 'Basic',
  /* DELETE */
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
