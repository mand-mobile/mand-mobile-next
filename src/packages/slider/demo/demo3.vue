<script lang="ts">
export default {
  name: 'SliderDemo',
  title: '步长与格式化',
}
</script>
<script setup lang="ts">
import MdSlider from 'mand-mobile-next/slider'
import { ref } from 'vue'

const step = ref(20)
</script>

<template>
  <div class="md-example-child md-example-child-slider-0">
    <md-slider
      v-model="step"
      :step="5"
      :format="(val) => `￥${val}`"
    ></md-slider>
  </div>
</template>

<style lang="stylus">
.md-example-child-slider-0
  padding 0 16px
</style>
