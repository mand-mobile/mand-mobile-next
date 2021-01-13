<template>
  <div class="md-number-keyboard" :class="[{'md-number-keyboard--view': isView}]">
    <template v-if="isView">
      <div class="md-number-keyboard_wrapper">
        <div class="md-number-keyboard_slot" v-if="$slots.default">
          <slot></slot>
        </div>
        <md-number-keyboard-container
          ref="keyborad"
          :type="type"
          :disorder="disorder"
          :ok-text="okText"
          :is-view="false"
          :hide-dot="hideDot"
          :text-render="textRender"
          @enter="$_onEnter"
          @delete="$_onDelete"
          @confirm="$_onConfirm"
          @hide="isKeyboardShow = false"
        ></md-number-keyboard-container>
      </div>
    </template>
    <template v-else>
      <md-popup
        ref="popup"
        v-model="isKeyboardShow"
        position="bottom"
        @show="$emit('show')"
        @hide="$emit('hide')"
        :has-mask="false"
      >
        <div class="md-number-keyboard_wrapper">
          <div class="md-number-keyboard_slot" v-if="$slots.default">
            <slot></slot>
          </div>
          <md-number-keyboard-container
            ref="keyborad"
            :type="type"
            :disorder="disorder"
            :ok-text="okText"
            :is-view="isView"
            :hide-dot="hideDot"
            :text-render="textRender"
            @enter="$_onEnter"
            @delete="$_onDelete"
            @confirm="$_onConfirm"
            @hide="isKeyboardShow = false"
            @touchmove.native.prevent
          ></md-number-keyboard-container>
        </div>
      </md-popup>
    </template>
  </div>
</template>

<script>
import {Device} from '@mand-mobile/platform-runtime/lib/module'
import Popup from '../popup'
import Keyborad from './board'

export default {
  name: 'md-number-keyboard',

  components: {
    'md-popup': Popup,
    'md-number-keyboard-container': Keyborad,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      // simple, professional
      type: String,
      default: 'professional',
    },
    isView: {
      type: Boolean,
      default: false,
    },
    hideDot: {
      type: Boolean,
      default: false,
    },
    disorder: {
      type: Boolean,
      default: false,
    },
    isHideConfirm: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
      default: '确定',
    },
    textRender: {
      type: Function,
      default: () => {},
    },
    isVibrate: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isKeyboardShow: false,
    }
  },

  watch: {
    value(val) {
      this.isKeyboardShow = val
    },
    isKeyboardShow(val) {
      this.$emit('input', val)
    },
  },

  mounted() {
    if (this.value) {
      this.isKeyboardShow = this.value
    }
  },

  methods: {
    $_vibrate() {
      this.isVibrate && Device().vibrate()
    },

    $_onEnter(val) {
      this.$_vibrate()
      this.$emit('enter', val)
    },
    $_onDelete() {
      this.$_vibrate()
      this.$emit('delete')
    },
    $_onConfirm() {
      this.$_vibrate()
      this.$emit('confirm')
      if (this.isHideConfirm) {
        this.hide()
      }
    },

    // MARK: public methods
    show() {
      /* istanbul ignore next */
      this.isKeyboardShow = true
    },
    hide() {
      /* istanbul ignore next */
      this.isKeyboardShow = false
    },
  },
}

</script>

<style lang="stylus">
.md-number-keyboard
  .md-popup
    z-index md-number-keyboard-zindex
  .md-popup_box
    padding-top 1px
  &_wrapper
    padding-bottom constant(safe-area-inset-bottom)
    padding-bottom env(safe-area-inset-bottom)
    background-color md-color-bg-base
</style>
