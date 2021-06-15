<script lang="ts">
export default {
  name: 'SliderDemo',
  title: '禁用',
}
</script>
<script setup lang="ts">
import MdSlider from 'mand-mobile/slider'
import { ref } from 'vue'

const step = ref(55)
</script>

<template>
  <div class="md-example-child md-example-child-slider-0">
    <md-slider v-model="step" :disabled="true"></md-slider>
  </div>
</template>

<style lang="stylus">
.md-example-child-slider-0
  padding 0 16px
</style>
