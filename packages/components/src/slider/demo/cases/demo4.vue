<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="bucket" :step="10"></md-slider>
	</div>
</template>

<script>
import Slider from 'mand-mobile/lib/slider'

export default {
  components: {
    'md-slider': Slider,
  },
  data() {
    return {
      bucket: 10,
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '步长',
  },
  'en-US': {
    title: 'Steps',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-slider {
  padding: 20px;
  border-radius: 6px;
  background: #fff;
}
</style>
