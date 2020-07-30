<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="range" range></md-slider>
	</div>
</template>

<script>import Slider from '../../index'

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '范围',
  titleEnUS: 'Range',
  /* DELETE */
  components: {
    'md-slider': Slider,
  },
  data() {
    return {
      range: [25, 50],
    }
  },
}
</script>

