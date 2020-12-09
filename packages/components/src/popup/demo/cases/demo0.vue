<template>
  <div class="md-example-child md-example-child-popup md-example-child-popup-0">
    <md-button class="md-button" inline size="small" @click="showPopUp('center')" style="{height:100px}">屏幕中弹出</md-button>
    <md-popup v-model="isPopupShow.center">
      <div class="md-example-popup md-example-popup-center">
        Popup Center
      </div>
    </md-popup>

    <md-button class="md-button" inline size="small" @click="showPopUp('bottom')">底部弹出</md-button>
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

    <md-button class="md-button" inline size="small" @click="showPopUp('top')">顶部弹出</md-button>
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

    <md-button class="md-button" inline size="small" @click="showPopUp('left')">左侧弹出</md-button>
    <md-popup
      v-model="isPopupShow.left"
      position="left"
    >
      <div class="md-example-popup md-example-popup-left">
        Popup Left
      </div>
    </md-popup>

    <md-button class="md-button" inline size="small" @click="showPopUp('right')">右侧弹出</md-button>
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
import Popup from 'mand-mobile/lib/popup'
import PopupTitleBar from 'mand-mobile/lib/popup/title-bar'
import Button from 'mand-mobile/lib/button'
import Icon from 'mand-mobile/lib/icon'

export default {
  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopupTitleBar,
    'md-button': Button,
    'md-icon': Icon,
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

<style>
.md-example-child-popup-0 {
  position: relative;
  float: left;
  width: 100%;
}
.md-example-child-popup-0 .md-example-popup {
  position: relative;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  box-sizing: border-box;
  background-color: #FFF;
}
.md-example-child-popup-0 .md-example-popup-center {
  padding: 50px;
  border-radius: 8px;
}
.md-example-child-popup-0 .md-example-popup-top {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 75px;
  line-height: 75px;
  background: #2f86f6;
  color: #FFF;
}
.md-example-child-popup-0 .md-example-popup-top .md-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.md-example-child-popup-0 .md-example-popup-bottom {
  width: 100%;
  padding: 100px 0;
}
.md-example-child-popup-0 .md-example-popup-bottom p {
  line-height: 50px;
}
.md-example-child-popup-0 .md-example-popup-left,
.md-example-child-popup-0 .md-example-popup-right {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 150px;
}
</style>
