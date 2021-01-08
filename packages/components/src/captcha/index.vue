<template>
  <div class="md-captcha" v-show="isView || value || visible">
    <template v-if="isView">
      <md-captcha-view
        ref="captchaView"
        is-view
        :title="title"
        :brief="brief"
        :maxlength="maxlength"
        :mask="mask"
        :system="system"
        :count="count"
        :auto-countdown="autoCountdown"
        :auto-send="autoSend"
        :count-normal-text="countNormalText"
        :count-active-text="countActiveText"
      ><slot/></md-captcha-view>
    </template>
    <template v-else>
      <md-dialog
        :value="value"
        :closable="true"
        :appendTo="false"
        position="top"
        @input="$_onInput"
        @show="$_onShow"
        @hide="$_onHide"
      >
        <md-captcha-view
          ref="captchaView"
          :title="title"
          :brief="brief"
          :maxlength="maxlength"
          :mask="mask"
          :system="system"
          :count="count"
          :auto-countdown="autoCountdown"
          :auto-send="autoSend"
          :count-normal-text="countNormalText"
          :count-active-text="countActiveText"
        ><slot/></md-captcha-view>
      </md-dialog>
    </template>
  </div>
</template>

<script>
import {createProxyApiMixin, createProxyEventsMixin} from '@mand-mobile/shared/lib/mixin/proxy'
import {mdDocument} from '@mand-mobile/shared/lib/util'
import Dialog from '../dialog/dialog'
import Button from '../button'
import CaptchaView from './captcha-view'
import captchaViewMixin from './mixins'

export default {
  name: 'md-captcha',

  mixins: [
    createProxyApiMixin({
      captchaView: ['countdown', 'resetcount', 'setError'],
    }),
    createProxyEventsMixin({
      captchaView: ['send', 'submit'],
    }),
    captchaViewMixin,
  ],

  components: {
    'md-captcha-view': CaptchaView,
    'md-dialog': Dialog,
    'md-button': Button,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    isView: {
      type: Boolean,
      default: false,
    },
    appendTo: {
      default: null,
    },
  },

  data() {
    return {
      visible: false,
      firstShown: false,
    }
  },

  watch: {
    value(val) {
      if (!val) {
        return
      }

      const captchaView = this.$refs.captchaView
      captchaView.code = ''

      if (!this.firstShown) {
        this.firstShown = true
        captchaView.$_emitSend()
      }
    },
  },

  mounted() {
    if (this.value || this.isView) {
      this.firstShown = true
      this.$refs.captchaView.$_emitSend()
    }
  },

  beforeDestroy() {
    if (!this.isView) {
      ;(this.appendTo || mdDocument.body).removeChild(this.$el)
    }
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onInput(val) {
      this.$emit('input', val)
    },
    $_onShow() {
      this.visible = true
      this.$refs.captchaView.focus()
      this.$emit('show')
    },
    $_onHide() {
      this.visible = false
      this.$refs.captchaView.blur()
      this.$emit('hide')
    },
  },
}

</script>

