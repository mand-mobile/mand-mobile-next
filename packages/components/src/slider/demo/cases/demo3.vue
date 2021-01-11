<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="range" range></md-slider>
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
      range: [25, 50],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '范围',
  },
  'en-US': {
    title: 'Range',
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

