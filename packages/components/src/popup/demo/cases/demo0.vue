<template>
  <div class="md-example-child md-example-child-popup md-example-child-popup-0" @touchstart="touchstart">
    <md-button class="md-button" id="md-button" @click="showPopUp('center')" style="{height:100px}">屏幕中弹出</md-button>
    <md-popup v-model="isPopupShow.center">
      <div class="md-example-popup md-example-popup-center">
        Popup Center
      </div>
    </md-popup>

    <md-button class="md-button" @click="showPopUp('bottom')">底部弹出</md-button>
    <md-popup
      v-model="isPopupShow.bottom"
      position="bottom"
    >
      <md-popup-title-bar
        title="Popup Title"
        describe="Popup Description"
        ok-text="ok"
        cancel-text="cancel"
        large-radius
        @confirm="hidePopUp('bottom')"
        @cancel="hidePopUp('bottom')"
      ></md-popup-title-bar>
      <div class="md-example-popup md-example-popup-bottom">
        Popup Bottom
      </div>
    </md-popup>

    <md-button class="md-button" @click="showPopUp('top')">顶部弹出</md-button>
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

    <md-button class="md-button" @click="showPopUp('left')">左侧弹出</md-button>
    <md-popup
      v-model="isPopupShow.left"
      position="left"
    >
      <div class="md-example-popup md-example-popup-left">
        Popup Left
      </div>
    </md-popup>

    <md-button class="md-button" @click="showPopUp('right')">右侧弹出</md-button>
    <md-popup
      v-model="isPopupShow.right"
      position="right"
    >
      <div class="md-example-popup md-example-popup-right">
        Popup Right
      </div>
    </md-popup>
  </div>
</template>

<script>
import Popup from 'mand-mobile/popup'
import PopupTitleBar from 'mand-mobile/popup/title-bar'
import Button from 'mand-mobile/button'
import Icon from 'mand-mobile/icon'
import {root} from 'mand-mobile/_util'

export default {
  name: 'popup-demo',
  components: {
    'md-popup': Popup,
    // [PopupTitleBar.name]: PopupTitleBar,
    'md-button': Button,
    'md-icon': Icon,
    'md-popup-title-bar': PopupTitleBar
  },
  data() {
    return {
      isPopupShow: {}
    }
  },
  async mounted() {
    const ref = this.$MDDom().querySelectorAll('.md-button')[1]
    const res0 = await ref.id
    console.log(res0)
    // const res1 = await this.$MDDom().querySelector('#md-button').getComputedStyle(['height'])
    // setTimeout(async () => {
    //   const res2 = await this.$MDDom().documentElement().getScrollOffset()
    //   console.log(res2)
    // }, 3000)
    // root.requestAnimationFrame(() => {
    //   console.log('xxxxxx')
    // })
    // uni.getSystemInfo({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  },
  methods: {
    touchstart(e) {
      console.log(e.touches[0])
    },
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
.md-example-child-popup-0
  position relative
  float left
  width 100%
  .md-button
    display block
    margin-bottom 20px
    height 100px
  .md-example-popup
    position relative
    font-size 28px
    font-family DINPro
    font-weight 500
    box-sizing border-box
    text-align center
    background-color #FFF
  .md-example-popup-center
    padding 50px
    border-radius radius-normal
  .md-example-popup-top
    display flex
    justify-content center
    align-items center
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
    padding 100px 0
    p
      line-height 50px
  .md-example-popup-left, .md-example-popup-right
    height 100%
    padding 0 150px
    display flex
    align-items center
</style>
