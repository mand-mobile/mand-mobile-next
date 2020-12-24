<template>
  <div class="md-captcha-view">
    <div class="md-captcha_content">
      <h2 class="md-captcha_title" v-if="title" v-text="title"></h2>
      <div class="md-captcha_message"><slot/></div>
    </div>
    <md-codebox
      ref="codebox"
      v-model="code"
      :maxlength="maxlength"
      :system="system"
      :mask="mask"
      :closable="false"
      :is-view="isView"
      :justify="true"
      :autofocus="false"
      @submit="$_onSubmit"
    >
      <footer class="md-captcha_footer">
        <div class="md-captcha_error" v-if="errorMsg" v-text="errorMsg"></div>
        <div class="md-captcha_brief" v-else v-text="brief"></div>
        <span
          class="md-captcha_btn"
          :class="{'md-captcha_btn--disabled': this.isCounting}"
          v-if="count"
          v-text="countBtnText"
          @click="$_onResend"
        ></span>
      </footer>
    </md-codebox>
  </div>
</template>

<script>
import Codebox from '../codebox'
import captchaViewMixin from './mixins'

export default {
  name: 'md-captcha-view',

  components: {
    'md-codebox': Codebox,
  },

  mixins: [captchaViewMixin],

  data() {
    return {
      code: '',
      errorMsg: '',
      isCounting: false,
      countBtnText: this.countNormalText,
    }
  },

  watch: {
    code(val) {
      if (val && this.errorMsg) {
        this.errorMsg = ''
      }
    },
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onSubmit(code) {
      this.$emit('submit', code)
    },
    $_onResend() {
      if (this.isCounting) {
        return
      }
      if (this.autoCountdown) {
        this.countdown()
      }
      this.$emit('send', this.countdown)
    },
    $_emitSend() {
      if (this.autoSend) {
        this.$_onResend()
      }
    },
    // MARK: public methods
    countdown() {
      if (!this.count) {
        return
      }
      clearInterval(this.__counter__)
      const timestamp = Date.now()
      let i = this.count
      this.isCounting = true
      this.countBtnText = this.countActiveText.replace('{$1}', i)
      /* istanbul ignore next */
      this.__counter__ = setInterval(() => {
        if (i <= 1) {
          this.resetcount()
        } else {
          i = this.count - Math.floor((Date.now() - timestamp) / 1000)
          this.countBtnText = this.countActiveText.replace('{$1}', i)
        }
      }, 1000)
    },
    resetcount() {
      this.isCounting = false
      this.countBtnText = this.countNormalText
      clearInterval(this.__counter__)
    },
    setError(msg) {
      this.$nextTick(() => {
        this.errorMsg = msg
        // this.code = ''
      })
    },
    focus() {
      this.$refs.codebox && this.$refs.codebox.focus()
    },
    blur() {
      this.$refs.codebox && this.$refs.codebox.blur()
    },
  },
}

</script>

<style lang="stylus">
.md-captcha_content
  font-size md-captcha-font-size
  color md-captcha-color
  text-align center
  line-height 1.2
  margin-bottom 50px

.md-captcha_title
  color md-captcha-title-color
  font-size md-captcha-title-font-size
  font-weight normal
  line-height 1.15
  margin 0 0 16px 0

.md-captcha_footer
  margin 28px 0
  display flex
  font-size md-captcha-footer-font-size
  justify-content space-between
  align-items center
  overflow hidden

.md-captcha_error, .md-captcha_brief
  flex 1 1 0%
.md-captcha_error
  color md-captcha-error-color
.md-captcha_brief
  color md-captcha-brief-color

.md-captcha_btn
  display inline-block
  color md-captcha-btn-color
  font-size md-captcha-footer-font-size
  padding 0
  margin 0 0 0 12px
  border 0
  border-radius 0
  background none
  &--disabled
    color md-color-text-disabled
</style>
