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
  background md-color-primary-background
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
          color md-color-text-base
      &.name
        margin-left md-h-gap-lg
        font-size md-font-heading-large
        font-weight md-font-weight-medium
        color md-color-text-base
      &.name-zh
        top 9px
        margin-left md-h-gap-sm
        font-size md-font-body-large
        font-weight md-font-weight-normal
        color md-color-text-minor

  .md-example-wrapper
    position relative
    z-index 3
    padding 20px
    clearfix()
    .md-example
      .md-example-section
        clearfix()
        margin-bottom 30px
        color md-color-text-base
        .md-example-title
          block()
          font-size md-font-body-normal
          font-weight md-font-weight-medium
          a
            margin-right 5px
            background md-color-primary
            color #fff
            padding 5px 10px
            border-radius md-radius-normal
            font-size md-font-minor-large
            font-weight 300
            line-height 28px
            text-decoration none
        .md-example-describe
          block()
          margin-top 15px
          font-size md-font-minor-large
          font-weight 300
          color md-color-text-minor
        .md-example-content
          block()
          position relative
          margin-top 20px
          box-sizing border-box
          font-size 28px
.md-dialog pre
  width 100%
  padding 20px 10px
  box-sizing border-box
  white-space pre-wrap
  word-wrap break-word
  font-size md-font-minor-normal
  background md-color-primary-background
  border-radius md-radius-normal
@media screen and (min-width: 749px)
  .mand
    margin-left -360px
    left 50%
</style>

