<template>
  <md-popup
    v-model="popupShow"
    class="md-cashier"
    position="bottom"
    :mask-closable="false"
    :prevent-scroll="true"
    prevent-scroll-exclude=".md-cashier-container"
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

      <!-- Choose pay channel -->
      <div
        v-if="scene === 'choose'"
        class="md-cashier-block md-cashier-choose"
      >
        <md-cashier-channel
          v-model="currentPayChannelValue"
          :payment-title="paymentTitle"
          :payment-amount="paymentAmount"
          :payment-describe="paymentDescribe"
          :more-button-text="moreButtonText"
          :pay-button-text="payButtonText"
          :pay-button-disabled="payButtonDisabled"
          :channels="channels"
          :channel-limit="channelLimit"
          @pay="payHandler"
        ></md-cashier-channel>
      </div>

      <!-- Captcha -->
      <div
        v-else-if="scene === 'captcha'"
        class="md-cashier-block md-cashier-captcha"
      >
        <md-captcha
          ref="captcha"
          :maxlength="sceneOption.captcha.maxlength"
          :count="sceneOption.captcha.count"
          :count-normal-text="
            sceneOption.captcha.countNormalText
          "
          :count-active-text="
            sceneOption.captcha.countActiveText
          "
          :auto-countdown="
            sceneOption.captcha.autoCountdown
          "
          :brief="sceneOption.captcha.brief"
          is-view
          @send="sceneOption.captcha.onSend"
          @submit="sceneOption.captcha.onSubmit"
        >
          <div v-text="sceneOption.captcha.text"></div>
        </md-captcha>
      </div>

      <!-- Loaing, Success -->
      <div
        v-else-if="
          scene === 'loading' || scene === 'success'
        "
        class="md-cashier-block"
        :class="{
          'md-cashier-loading': scene === 'loading',
          'md-cashier-success': scene === 'success',
        }"
      >
        <div class="md-cashier-block-icon">
          <md-activity-indicator-success
            ref="rolling"
            :is-success="scene === 'success'"
          ></md-activity-indicator-success>
        </div>
        <div class="md-cashier-block-text">
          {{
            scene === 'success'
              ? sceneOption.success.text
              : sceneOption.loading.text
          }}
        </div>
        <md-cashier-channel-button
          v-if="scene === 'success'"
          :actions="
            sceneOption.success.actions || [
              {
                buttonText: sceneOption.success.buttonText,
                handler: sceneOption.success.handler,
              },
            ]
          "
        />
      </div>

      <!-- Fail -->
      <div
        v-else-if="scene === 'fail'"
        class="md-cashier-block md-cashier-fail"
      >
        <div class="md-cashier-block-icon">
          <md-icon name="warn-color"></md-icon>
        </div>
        <div
          class="md-cashier-block-text"
          v-text="sceneOption.fail.text"
        ></div>
        <md-cashier-channel-button
          :actions="
            sceneOption.fail.actions || [
              {
                buttonText: sceneOption.fail.buttonText,
                handler: sceneOption.fail.handler,
              },
            ]
          "
        />
      </div>

      <!-- Custom -->
      <div
        v-else-if="scene === 'custom'"
        class="md-cashier-block md-cashier-custom"
      >
        <slot name="scene"></slot>
      </div>

      <slot name="footer" :scene="scene"></slot>
    </div>
  </md-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdPopup, {
  PopupTitleBar as MdPopupTitleBar,
} from 'mand-mobile-next/popup'
import MdIcon from 'mand-mobile-next/icon'
import MdCaptcha from 'mand-mobile-next/captcha'
import { ActivityIndicatorSuccess as MdActivityIndicatorSuccess } from 'mand-mobile-next/activity-indicator'
import MdCashierChannel from './channel.vue'
import MdCashierChannelButton from './channel-button.vue'
import {
  useCashier,
  cashierProps as props,
} from './use-cashier'

export default defineComponent({
  name: 'MdCashier',
  components: {
    MdPopup,
    MdPopupTitleBar,
    MdCashierChannel,
    MdIcon,
    MdCaptcha,
    MdActivityIndicatorSuccess,
    MdCashierChannelButton,
  },
  props,
  emits: [
    'pay',
    'hide',
    'update:visible',
    'show',
    'select',
  ],
  setup(props, context) {
    const {
      popupShow,
      onShow,
      onHide,
      hide,
      scene,
      sceneOption,
      currentPayChannelValue,
      payHandler,
      next,
    } = useCashier(props, context)

    return {
      popupShow,
      onShow,
      onHide,
      hide,

      scene,
      sceneOption,

      currentPayChannelValue,
      payHandler,
      next,
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-cashier
  .md-popup-title-bar .md-popup-cancel
    .md-icon
      align-self flex-start
      margin-left var(--md-h-gap-lg)
  .md-popup-box
    background-color var(--md-color-bg-inverse)
    border-radius var(--md-popup-title-bar-radius) var(--md-popup-title-bar-radius) 0 0
  .md-cashier-container
    block()
    position relative
    background var(--md-cashier-bg)
    -webkit-touch-callout none
    user-select none
    transition all .3s
    overflow hidden
    .md-cashier-block
      clearfix()
      .md-cashier-block-icon
        position relative
        left 50%
        float left
        width 100px
        height 100px
        margin-top 75px
        transform translateX(-50%)
        .md-activity-indicator-svg
          width 100px !important
          height 100px !important
      .md-cashier-block-text
        block()
        margin-top 20px
        margin-bottom 180px
        font-size var(--md-font-minor-large)
        color var(--md-color-text-minor)
        text-align center
      .md-cashier-block-btn
        block()
        padding 0 40px 40px
        box-sizing var(--md-border-box)
      // &.md-cashier-choose

      &.md-cashier-captcha
        .md-captcha
          block()
        .md-captcha-content
          margin-top 44px
          margin-bottom 20px
          color var(--md-color-text-caption)
        .md-codebox
          margin-bottom 26px
        .md-captcha-content,
        .md-captcha-message,
        .md-codebox,
        .md-captcha-footer
          margin-left 40px
          margin-right 40px
        .md-captcha-footer
          margin-bottom 44px

      &.md-cashier-fail
        .md-cashier-block-icon
          position relative
          text-align center
          line-height 100px
          .md-icon-warn-color
            position relative
            z-index 2
            color #FFF6F1
            width 100px
            height 100px
</style>
