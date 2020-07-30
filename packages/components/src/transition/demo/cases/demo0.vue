<template>
  <div class="md-example-child md-example-child-transition">
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
        @after-leave="hideWrapper"
      >
        <div class="box" v-text="transitionName"></div>
      </md-transition>
    </div>
  </div>
</template>

<script>
import Button from '../../../button'
import Transition from '../../index'

export default {
  name: 'transition-demo',
  components: {
    'md-button': Button,
    'md-transition': Transition,
  },
  data() {
    return {
      isWrapperShow: false,
      isBoxShow: false,
      transitionName: '',
    }
  },
  methods: {
    showPopUp(name) {
      this.transitionName = name
      this.isWrapperShow = true
      this.isBoxShow = true
    },
    hidePopup() {
      this.isBoxShow = false
    },
    hideWrapper() {
      this.isWrapperShow = false
    },
  },
}

</script>

<style>
.md-example-child-transition .md-button {
  display: block;
  margin-bottom: 20px;
}

.md-example-child-transition .wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.md-example-child-transition .wrapper .layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
}

.md-example-child-transition .wrapper .box {
  position: relative;
  height: 100px;
  padding: 0 20px;
  line-height: 100px;
  text-align: center;
  color: #314659;
  font-weight: bold;
  border-radius: 8px;
  background: #FFF;
  z-index: 2;
}
</style>