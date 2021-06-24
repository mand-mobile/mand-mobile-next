<template>
  <md-popup
    v-model="popupShow"
    class="md-cashier"
    position="bottom"
    :mask-closable="false"
    @hide="onHide"
    @show="onShow"
  >
    <md-popup-title-bar
      :title="title"
      :describe="describe"
      only-close
      @cancel="hide"
    ></md-popup-title-bar>
    <div class="md-cashier-container">
      <slot name="header" :scene="scene"></slot>
    </div>
  </md-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdPopup, {
  PopupTitleBar as MdPopupTitleBar,
} from 'mand-mobile/popup'
import {
  useCashier,
  cashierProps as props,
} from './use-cashier'

export default defineComponent({
  name: 'MdCashier',
  components: { MdPopup, MdPopupTitleBar },
  props,
  setup(props, context) {
    const { popupShow, onShow, onHide, hide, scene } =
      useCashier(props, context)

    return { popupShow, onShow, onHide, hide, scene }
  },
})
</script>

<style lang="stylus"></style>
