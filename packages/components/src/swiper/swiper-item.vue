<template>
  <div
    class="md-swiper-item"
    :class="{'md-swiper-item-fade': isFade}"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'md-swiper-item',

  inject: {
    rootSwiper: {default: null},
  },

  data() {
    return {
      transformStyle: {}
    }
  },

  computed: {
    swiperWidth: {
      get() {
        return this.rootSwiper && !this.rootSwiper.isVertical ? this.rootSwiper.dimension : 0
      },
      cache: false
    },
    swiperHeight: {
      get() {
        return this.rootSwiper && this.rootSwiper.isVertical ? this.rootSwiper.dimension : 0
      },
      cache: false
    },
    isFade() {
      return this.rootSwiper && !this.rootSwiper.isSlide
    },
    style() {
      const width = this.swiperWidth ? `${this.swiperWidth}px` : 'auto'
      const height = this.swiperHeight ? `${this.swiperHeight}px` : 'auto'
      let style = `width:${width};height:${height};`

      // Object.keys(this.transformStyle).forEach(key => {
      //   style += `${key}:${this.transformStyle[key]};`
      // })
      //  return style

      return Object.keys(this.transformStyle).reduce((style, key) => {
        return style += `${key}:${this.transformStyle[key]};`
      }, `width:${width};height:${height};`)
    }
  },

  mounted() {
    return this.rootSwiper && this.rootSwiper.swiperItemCreated(this)
  },

  destroyed() {
    return this.rootSwiper && this.rootSwiper.swiperItemDestroyed(this)
  },

  methods: {
    setTransform(style) {
      this.transformStyle = style
    }
  }
}

</script>

<style lang="stylus">
.md-swiper-item
  position relative
  width 100%
  flex-shrink 0
  &.md-swiper-item-fade
    position absolute
    opacity 0
    top 0
    left 0
</style>
