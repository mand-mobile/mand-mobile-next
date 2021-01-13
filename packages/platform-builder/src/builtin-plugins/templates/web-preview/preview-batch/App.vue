<template>
  <div class="mand">
    <template v-if="isHome">
      <router-view></router-view>
    </template>
    <template v-else>
      <div class="md-nav">
        <p class="home" @click="goToCategory">
          <md-icon name="home" size="lg"></md-icon>
        </p>
        <p class="name" v-text="navTitle"></p>
        <p class="name-zh" v-text="navSubTitle"></p>
      </div>
      <div class="md-example-wrapper">
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>

<script>
import Icon from '@mand-mobile/components/src/icon'

import './assets/responsive'
export default {
  name: 'app',
  components: {
    [Icon.name]: Icon,
  },
  computed: {
    navTitle() {
      return this.$route.name
    },
    navSubTitle() {
      return this.$route.meta.description
    },
    isHome() {
      const path = this.$route.path
      return path === '/' || path === '/home' || path === '/category'
    },
  },
  methods: {
    goToCategory() {
      this.$router.push('/category')
    },
  },
}

</script>

<style lang="stylus">
block()
  float left
  width 100%
.mand
  position relative
  min-height 100%
  max-width 750px
  font-size 28px
  font-size-adjust none
  -webkit-text-size-adjust 100%
  -webkit-overflow-scrolling touch
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  background #f3f4f5
  .md-nav
    position relative
    display flex
    padding 32px 20px
    p
      position relative
      display inline-block
      line-height 1
      &.home
        top 10px
        .md-icon
          color #111A34
      &.name
        margin-left 28px
        font-size 60px
        font-weight 500
        color #111A34
      &.name-zh
        top 9px
        margin-left 12px
        font-size 28px
        font-weight 400
        color #666f83
        
  .md-example-wrapper
    position relative
    z-index 3
    padding 20px
    clearfix()
    
.md-dialog pre
  width 100%
  padding 20px 10px
  box-sizing border-box
  white-space pre-wrap
  word-wrap break-word
  font-size 20px
  background #F9FAFB
  border-radius 4px
@media screen and (min-width: 749px)
  .mand
    margin-left -360px
    left 50%
</style>

