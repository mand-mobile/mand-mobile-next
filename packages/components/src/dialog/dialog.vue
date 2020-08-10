<template>
  <div class="md-dialog">
    <md-popup
      :value="value"
      :hasMask="hasMask"
      :maskClosable="maskClosable"
      position="center"
      :transition="transition"
      :preventScroll="preventScroll"
      :preventScrollExclude="preventScrollExclude"
      @input="$_onInput"
      @show="$_onShow"
      @hide="$_onHide"
    >
      <div class="md-dialog_content">
        <slot name="header"></slot>
        <div class="md-dialog_content_body">
          <div
            role="button"
            v-if="closable"
            class="md-dialog_content_body_close"
            @click="close"
          >
            <md-icon name="close" />
          </div>
          <div v-if="icon" class="md-dialog_content_body_icon">
            <md-icon :name="icon" :svg="iconSvg" />
          </div>
          <h2 class="md-dialog_content_body_title" v-if="title" v-text="title"></h2>
          <slot>
            <div class="md-dialog_content_body_text" v-html="content"></div>
          </slot>
        </div>
        <footer
          class="md-dialog_content_actions"
          :class="{ 'md-dialog_content_actions--is-column': layout === 'column' }"
        >
          <template v-for="(btn, index) in btns">
            <div
              role="button"
              class="md-dialog_content_actions_btn"
              :class="{
                'md-dialog_content_actions_btn--disabled': !!btn.disabled,
                'md-dialog_content_actions_btn--warning': !btn.disabled && !!btn.warning,
              }"
              :key="index"
              @click="$_onClick(btn, index)"
              @touchmove.prevent
            >
              <!--              <md-activity-indicator-rolling v-if="btn.loading" class="md-dialog-btn-loading"></md-activity-indicator-rolling>-->
              <md-icon
                v-if="btn.icon"
                class="md-dialog_content_actions_btn_icon"
                :name="btn.icon"
                :svg="btn.iconSvg"
                size="md"
              ></md-icon>
              {{ btn.text }}
            </div>
          </template>
        </footer>
      </div>
    </md-popup>
  </div>
</template>

<script>
import Popup from '../popup'
import Icon from '../icon'
// import ActivityIndicatorRolling from '../activity-indicator/roller'

export default {
  name: 'md-dialog',

  components: {
    'md-popup': Popup,
    'md-icon': Icon,
    // 'md-activity-indicator-rolling': ActivityIndicatorRolling,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: '',
    },
    btns: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    layout: {
      type: String,
      default: 'row',
    },
    appendTo: {
      default: false,
    },
    hasMask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'md-fade',
    },
    preventScroll: {
      type: Boolean,
      default: false,
    },
    preventScrollExclude: {
      type: String,
      default: '',
    },
  },

  mounted() {
    if (this.appendTo && this.appendTo.appendChild) {
      this.appendTo.appendChild(this.$el)
    }
  },

  beforeDestroy() {
    if (this.appendTo && this.appendTo.removeChild) {
      this.appendTo.removeChild(this.$el)
    }
  },

  methods: {
    // MARK: private methods

    // MARK: events handler
    $_onInput(val) {
      this.$emit('input', val)
    },
    $_onShow() {
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
    },
    $_onClick(btn, index) {
      if (btn.disabled || btn.loading) {
        return
      }
      if (typeof btn.handler === 'function') {
        btn.handler.call(null, btn)
      } else if (!btn.autoCloseDisabled) {
        this.close()
      }
      this.$emit('click', btn, index)
    },
    // MARK: public methods
    close() {
      this.$emit('input', false)
    },
  },
}

</script>

<style lang="stylus">
.md-dialog
  .md-popup
    z-index md-dialog-zindex

.md-dialog_content
  width md-dialog-width
  border-radius md-dialog-radius
  background-color md-color-bg-inverse
  overflow hidden

.md-dialog_content_body
  color md-dialog-text-color
  font-size md-dialog-text-font-size
  text-align left
  padding md-dialog-body-padding

.md-dialog_content_body_icon
  position relative
  display block
  width md-dialog-icon-size
  height md-dialog-icon-size
  margin md-v-gap-md auto 28px
.md-dialog .md-dialog_content_body_icon .md-icon
.md-dialog .md-dialog_content_body_icon .md-icon.icon-svg
.md-dialog .md-dialog_content_body_icon .md-icon.icon-font
  display flex
  align-items center
  justify-content center
  position absolute
  top 0
  left 0
  width md-dialog-icon-size
  height md-dialog-icon-size
  fill md-dialog-icon-fill
  color md-dialog-icon-fill
  font-size md-dialog-icon-size
  line-height md-dialog-icon-size

.md-dialog_content_body_close
  position absolute
  color md-dialog-close-color
  top 32px
  right 32px
  z-index 15

.md-dialog_content_body_title
  color md-dialog-title-color
  text-align center
  font-size md-dialog-title-font-size
  font-weight md-font-weight-normal
  line-height 1.2
  margin 0 0 28px 0

.md-dialog_content_body_text
  display flex
  justify-content center

.md-dialog_content_actions
  position relative
  display flex
  hairline(top, md-dialog-action-border-color)
  &--is-column
    flex-direction column
    .md-dialog_content_actions_btn
      flex 0 0 auto
      remove-hairline(right)
      &:not(:first-child)
        hairline(top, md-dialog-action-border-color)
      &:last-child
        color md-color-text-minor
      &:first-child
        color md-dialog-action-highlight-color

.md-dialog_content_actions_btn
  position relative
  flex 1 1 0%
  display flex
  align-items center
  justify-content center
  height md-dialog-action-height
  font-size md-dialog-action-font-size
  font-weight md-dialog-action-font-weight
  color md-color-text-minor
  text-align center
  hairline(right, md-dialog-action-border-color)
  transition background-color .3s
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  &--warning
    color md-color-text-error !important
    // .md-dialog-btn-loading .md-activity-indicator_svg .md-circle circle
    //   stroke md-color-text-error !important
  &--disabled
    color md-color-text-disabled !important
    // .md-dialog-btn-loading .md-activity-indicator_svg .md-circle circle
    //   stroke md-color-text-disabled !important
  &:last-child
    color md-dialog-action-highlight-color
    remove-hairline(right)
    // .md-dialog-btn-loading .md-activity-indicator_svg .md-circle circle
    //   stroke md-dialog-action-highlight-color
  &:not(.disabled):active
    background-color md-color-bg-tap
  // .md-dialog-btn-loading .md-activity-indicator_svg
  //   width 32px !important
  //   height 32px !important
  //   margin-right 10px
  //   .circle circle
  //     stroke md-color-text-minor
  .md-dialog_content_actions_btn_icon
    margin-right 10px
</style>
