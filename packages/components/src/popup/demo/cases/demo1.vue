<template>
  <div class="md-example-child md-example-child-popup md-example-child-popup-1">
    <md-button class="md-button" inline size="small" @click="showPopUp('align')">标题居左</md-button>
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

    <md-button class="md-button" inline size="small" @click="showPopUp('top')">无遮罩层</md-button>
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
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '其它配置',
  },
  'en-US': {
    title: 'Other configurations',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-popup-1 {
  position: relative;
  float: left;
  width: 100%;
}
.md-example-child-popup-1 .md-popup-title-bar .md-popup-cancel .md-icon {
  align-self: flex-start;
  margin-left: 32px;
}
.md-example-child-popup-1 .md-example-popup {
  position: relative;
  font-size: 24px;
  text-align: center;
  box-sizing: border-box;
}
.md-example-child-popup-1 .md-example-popup-align {
  padding: 0 40px;
  background: #FFF;
}
.md-example-child-popup-1 .md-example-popup-align .md-scroll-view {
  line-height: 500px;
  font-size: 64px;
  font-weight: 200;
  color: #999;
  background: #F9FAFB;
}
.md-example-child-popup-1 .md-example-popup-top {
  position: relative;
  width: 100%;
  height: 75px;
  line-height: 75px;
  background: #2f86f6;
  color: #FFF;
}
.md-example-child-popup-1 .md-example-popup-top .md-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.md-example-child-popup-1 .md-example-popup-bottom {
  width: 100%;
  padding: 0 0 150px;
}
.md-example-child-popup-1 .md-example-popup-bottom p {
  margin-bottom: 100px;
  font-size: 64px;
  font-weight: 200;
  color: #999;
}
.md-example-child-popup-1 .md-example-popup-left,
.md-example-child-popup-1 .md-example-popup-right {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 150px;
}
</style>
