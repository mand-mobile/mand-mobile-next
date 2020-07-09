<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="bucket" :step="10"></md-slider>
	</div>
</template>

<script>
// #ifdef H5
import Slider from "mand-mobile/slider";
// #endif
// #ifdef MP-WEIXIN
import Slider from "mand-mobile/slider/index.uni";
// #endif

export default {
  name: 'slider-demo',
  /* DELETE */
  title: '步长',
  titleEnUS: 'Steps',
  /* DELETE */
  components: {
    'md-slider': Slider,
  },
  data() {
    return {
      bucket: 10,
    }
  },
}

</script>
