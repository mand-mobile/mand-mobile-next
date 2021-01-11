<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity" disabled></md-slider>
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
      quantity: 50,
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '禁用',
  },
  'en-US': {
    title: 'Disabled',
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
