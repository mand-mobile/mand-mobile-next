<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity" :format="format"></md-slider>
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
  title: '格式化',
  titleEnUS: 'Format',
  /* DELETE */
  components: {
    'md-slider': Slider,
  },
  data() {
    return {
      quantity: 50,
    }
  },
  methods: {
    format(val) {
      return '￥' + val
    },
  },
}

</script>
