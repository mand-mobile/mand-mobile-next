<template>
  <div class="md-example-child md-example-child-popup md-example-child-popup-1">
    <md-button class="md-button" @click="showPopUp('align')">标题居左</md-button>
    <md-popup
      class="inner-popup"
      v-model="isPopupShow.align"
      position="bottom"
    >
      <md-popup-title-bar
        only-close
        title="标题"
        describe="标题和描述居左"
        title-align="left"
        @cancel="hidePopUp('align')"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-align">
        <div class="md-scroll-view">
          <p>Scroll View</p>
        </div>
      </div>
    </md-popup>

    <md-button class="md-button" @click="showPopUp('top')">无遮罩层</md-button>
    <md-popup
      v-model="isPopupShow.top"
      :hasMask="false"
      position="top"
    >
      <div class="md-example-popup md-example-popup-top">
        Popup Top
        <md-icon
          class="md-icon"
          name="close"
          @click.native="hidePopUp('top')"
        ></md-icon>
      </div>
    </md-popup>
  </div>
</template>

<script>
import Popup from 'mand-mobile/popup'
import PopupTitleBar from 'mand-mobile/popup/title-bar'
import Button from 'mand-mobile/button'
import Icon from 'mand-mobile/icon'

export default {
  name: 'popup-demo',
  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopupTitleBar,
    'md-button': Button,
    'md-icon': Icon,
    // [ScrollView.name]: ScrollView,
  },
  data() {
    return {
      isPopupShow: {},
    }
  },
  methods: {
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true)
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false)
    },
  },
}

</script>

<style lang="stylus">
.md-example-child-popup-1
  float left
  width 100%
  .md-button
    display block
    margin-bottom 20px
  .md-popup-title-bar
    .md-popup-cancel
      .md-icon
        align-self flex-start
        margin-left 32px
  .md-example-popup
    position relative
    font-size font-minor-large
    background color-bg-base
    box-sizing border-box
    text-align center
    background-color #FFF
  .md-example-popup-align
    padding 0 40px
    .md-scroll-view
      height 500px
      background #EEE
      p
        line-height 500px
        font-size 64px
        font-weight 200
        color #999
  .md-example-popup-top
    position relative
    width 100%
    height 75px
    line-height 75px
    background #4a4c5b
    color #fff
    .md-icon
      position absolute
      right 20px
      top 50%
      transform translateY(-50%)
  .md-example-popup-bottom
    width 100%
    padding 0 0 150px
    p
      margin-bottom 100px
      font-size 64px
      font-weight 200
      color #999
  .md-example-popup-left, .md-example-popup-right
    height 100%
    padding 0 150px
    display flex
    align-items center
</style>
