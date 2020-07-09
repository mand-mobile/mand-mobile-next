<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity"></md-slider>
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
  name: "slider-demo",
  /* DELETE */
  title: "基本",
  titleEnUS: "Basic",
  /* DELETE */
  components: {
    "md-slider": Slider,
  },
  data() {
    return {
      quantity: 25,
    };
  }
};
</script>
