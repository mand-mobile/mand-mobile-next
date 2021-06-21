<template>
  <component
    :is="isView ? 'div' : 'MdDialog'"
    v-model="popupShow"
    class="md-captcha"
    @show="onShow"
    @hide="onHide"
  >
    <div class="md-captcha-content">
      <p
        v-if="title"
        class="md-captcha-title"
        v-text="title"
      ></p>
      <div class="md-captcha-message">
        <slot>{{ content }}</slot>
      </div>
    </div>
    <md-codebox
      ref="codebox"
      v-model="code"
      :maxlength="maxlength"
      :system="system"
      :mask="mask"
      :justify="true"
      :is-view="isView"
    >
      <footer class="md-captcha-footer">
        <div
          v-if="errorMsg"
          class="md-captcha-error"
          v-text="errorMsg"
        ></div>
        <div
          v-else
          class="md-captcha-brief"
          v-text="brief"
        ></div>
        <button
          v-if="count"
          class="md-captcha-btn"
          :disabled="isCounting"
          @click="sendHandler"
          v-text="countBtnText || countNormalText"
        ></button>
      </footer>
    </md-codebox>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MdDialog from 'mand-mobile/dialog'
import MdCodebox from 'mand-mobile/codebox'
import {
  useCaptcha,
  emits,
  captchaProps as props,
} from './use-captcha'

export default defineComponent({
  name: 'MdCaptcha',
  components: { MdDialog, MdCodebox },
  props,
  emits,
  setup(props, context) {
    const {
      popupShow,
      onShow,
      onHide,
      code,
      errorMsg,
      countBtnText,
      isCounting,
      codeboxRef: codebox,
      countdown,
      setError,
      sendHandler,
    } = useCaptcha(props, context)

    return {
      popupShow,
      onShow,
      onHide,
      code,
      errorMsg,
      countBtnText,
      isCounting,
      codebox,
      countdown,
      setError,
      sendHandler,
    }
  },
})
</script>

<style lang="stylus">
.md-captcha
  &.md-dialog
    .md-popup
      z-index captcha-zindex
    .md-dialog-body
      padding 60px 60px 30px 60px
    .md-dialog-content
      margin-bottom number-keyboard-height
  .md-codebox
    margin-bottom 28px

.md-captcha-content
  font-size captcha-font-size
  color captcha-color
  text-align center
  line-height 1.2
  margin-bottom 50px

.md-captcha-title
  color captcha-title-color
  font-size captcha-title-font-size
  font-weight normal
  line-height 1.15
  margin 0 0 16px 0

.md-captcha-footer
  margin 28px 0
  display flex
  font-size captcha-footer-font-size
  justify-content space-between
  align-items center
  overflow hidden

.md-captcha-error, .md-captcha-brief
  flex 1 1 0%
.md-captcha-error
  color captcha-error-color
.md-captcha-brief
  color captcha-brief-color

.md-captcha-btn
  display inline-block
  color captcha-btn-color
  font-size captcha-footer-font-size
  padding 0
  margin 0 0 0 12px
  border 0
  border-radius 0
  background none
  &:disabled
    color color-text-disabled
</style>
