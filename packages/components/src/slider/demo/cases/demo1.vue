<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity" disabled></md-slider>
	</div>
</template>

<script>import Slider from '../../index'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '禁用',
  titleEnUS: 'Disabled',
  /* DELETE */
  components: {
    'md-slider': Slider,
  },
  data() {
    return {
      quantity: 50,
    }
  },
}
</script>
