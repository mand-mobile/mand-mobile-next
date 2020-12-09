<template>
  <div class="md-doc-home">
    <section class="home-block">
      <div class="home-banner">
        <img src="https://pt-starimg.didistatic.com/static/starimg/img/23iUuVLsnS1605512486154.png" alt="">
      </div>
      <div class="home-text">
        <p class="home-text-h1">
          Mand Mobile <em class="number"><span>3</span></em>
        </p>
        <p class="home-text-p">
          面向金融场景，基于Vue DSL的开放式多平台兼容组件库
        </p>
        <div class="home-text-action">
          <router-link 
            class="home-text-action-button home-text-action-button_primary"
            to="/packages/components/development/">开始使用</router-link>
          <a class="home-text-action-button home-text-action-button_ghost" href="#">了解更多</a>
        </div>
      </div>
    </section>
    <Content />
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.md-doc-home
  width 1000px
  margin 80px auto
  .home-block
    display inline-block
    margin-bottom 50px
    .home-banner
      float left
      width 50%
      img
        width 100%
    .home-text
      width 50%
      padding 48px
      box-sizing border-box
      overflow hidden
      p
        margin 0
        line-height 1.5
      .home-text-h1
        font-size 54px
        font-family DINAlternate-Bold
        color #111A34
        .number
          position relative
          top -24px
          display inline-block
          width 54px
          height 54px
          line-height 54px
          text-align center
          border-radius 100%
          border solid 1px $accentColor
          overflow hidden
          &::before,
          &::after 
            content ""
            position absolute
            left 50%
            bottom 20%
            width 500%
            height 500%
            border-radius 45%
            background-color $accentColor
            transform translateX(-50%) // 居中
            animation rotate 15s linear infinite
          &::before
            bottom 15%
            opacity .5
            border-radius 47%
          span
            position relative
            top -8px
            z-index 2
            font-size 36px
            font-style normal
            // font-family "source-code-pro-special"
            color #fff

      .home-text-p
        font-size 18px
        font-family DINAlternate-Bold
        color #666f83
    .home-text-action
      margin-top 80px
    .home-text-action-button
      display inline-block
      width 140px
      height 48px
      margin-right 10px
      text-align center
      line-height 48px
      font-size 1.2em
      font-weight 500
      border-radius 24px
      box-sizing border-box
      &_primary
        background $accentColor
        border solid 1px $accentColor
        color #fff
      &_ghost
        border solid 1px $accentColor

@keyframes rotate 
  from
    transform translateX(-50%) rotateZ(0deg)

  to
    transform translateX(-50%) rotateZ(360deg)
</style>

<style lang="stylus">
.dark
  .md-doc-home .home-block .home-text .home-text-h1
    color #f5f6f7
</style>