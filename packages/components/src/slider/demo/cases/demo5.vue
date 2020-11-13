<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="range" :min="15" :max="80" range></md-slider>
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
    title: '边界值',
  },
  'en-US': {
    title: 'Min & Max',
  },
}
// #endregion ignore

</script>
