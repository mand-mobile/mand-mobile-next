<script lang="ts">
export default {
  name: 'SliderDemo',
  title: '边界值',
}
</script>
<script setup lang="ts">
import MdSlider from 'mand-mobile-next/slider'
import { ref } from 'vue'

const range = ref([10, 80])
</script>

<template>
  <div class="md-example-child md-example-child-slider-0">
    <md-slider
      v-model="range"
      :min="10"
      :max="80"
    ></md-slider>
  </div>
</template>

<style lang="stylus">
.md-example-child-slider-0
  padding 0 16px
</style>
