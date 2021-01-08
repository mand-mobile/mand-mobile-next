<template>
  <div class="md-example-child md-example-child-slider">
    <md-slider v-model="quantity" :format="format"></md-slider>
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
  methods: {
    format(val) {
      return '￥' + val
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '格式化',
  },
  'en-US': {
    title: 'Formatting',
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
