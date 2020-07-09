<template>
  <div class="md-example-child md-example-child-transition md-example-child-transition-1">
    <md-button class="md-button" @click="showPopUp('md-fade')">Fade</md-button>
    <md-button class="md-button" @click="showPopUp('md-fade-up')">Fade Up</md-button>
    <md-button class="md-button" @click="showPopUp('md-fade-down')">Fade Down</md-button>
    <md-button class="md-button" @click="showPopUp('md-fade-left')">Fade Left</md-button>
    <md-button class="md-button" @click="showPopUp('md-fade-right')">Fade Right</md-button>
    <md-button class="md-button" @click="showPopUp('md-bounce')">Bounce</md-button>
    <md-button class="md-button" @click="showPopUp('md-punch')">Punch</md-button>
    <md-button class="md-button" @click="showPopUp('md-zoom')">Zoom</md-button>
    <md-button class="md-button" @click="showPopUp('md-slide-up')">Slide Up</md-button>
    <md-button class="md-button" @click="showPopUp('md-slide-down')">Slide Down</md-button>
    <md-button class="md-button" @click="showPopUp('md-slide-left')">Slide Left</md-button>
    <md-button class="md-button" @click="showPopUp('md-slide-right')">Slide Right</md-button>

    <div class="wrapper" v-show="isWrapperShow">
      <md-transition :show="isBoxShow" name="md-fade">
        <div class="layer" @click="hidePopup"></div>
      </md-transition>
      <md-transition
        :show="isBoxShow"
        :name="transitionName"
        @afterLeave="hideWrapper"
      >
        <div class="box" v-text="transitionName"></div>
      </md-transition>
    </div>
  </div>
</template>

<script>
import Button from 'mand-mobile/button'
import Transition from 'mand-mobile/transition'

export default {
  name: 'transition-demo',
  components: {
    'md-button': Button,
    'md-transition': Transition

  },
  data() {
    const styles = {
      // 'position': 'fixed',
      // 'bottom': 0,
      // 'top': 0,
      // 'left': 0,
      // 'right': 0,
      // 'display': 'flex',
      // 'justify-content': 'center',
      // 'align-items': 'center',
      // 'z-index': 99
    }
    return {
      isWrapperShow: false,
      isBoxShow: false,
      transitionName: '',
      styles,
    }
  },
  methods: {
    showPopUp(name) {
      this.isWrapperShow = true
      this.transitionName = name
      this.isBoxShow = true
      // setTimeout(() => {
      //   this.isBoxShow = true
      // }, 50)
      // this.$set(this.isPopupShow, index, !this.isPopupShow[index])
    },
    hidePopup() {
      this.isBoxShow = false
      // setTimeout(() => {
      //   this.isPopupShow = false
      // }, 300)
    },
    hideWrapper() {
      this.isWrapperShow = false
    }
  },
}

</script>

<style lang="stylus">
.md-button
  display block
  margin-bottom 20px
.wrapper
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  display flex
  align-items center
  justify-content center
  z-index 99
  // pointer-events none
  // background-color rgba(37,38,45,.7)
.layer
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(37,38,45,.7)
.box
  position relative
  // width 200px
  height 100px
  padding 0 20px
  border-radius 8px
  background #FFF
  text-align center
  line-height 100px
  color #314659
  font-weight bold
  z-index 20
</style>
