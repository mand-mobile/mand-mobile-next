<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity" disabled></md-slider>
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
