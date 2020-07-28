<template>
  <div class="md-number-keyboard-container" :class="type">
    <div class="keyboard-number">
      <ul class="keyboard-number-list">
        <md-number-key
          class="keyboard-number-item"
          v-for="(n, index) in keyNumberListNumber"
          :key="index"
          :value="n"
          @press="$_onNumberKeyClick"
        ></md-number-key>
        <template v-if="type === 'professional'">
          <md-number-key
            class="keyboard-number-item"
            v-if="!hideDot"
            :value="dotText"
            @press="$_onNumberKeyClick"
          ></md-number-key>
          <md-number-key
            class="keyboard-number-item"
            :class="[{'large-item': hideDot}]"
            :value="keyNumberList[9]"
            @press="$_onNumberKeyClick"
          ></md-number-key>
          <li class="keyboard-number-item" v-if="isView"></li>
          <md-number-key
            v-else
            custom-class="keyboard-number-item slidedown"
            class="keyboard-number-item slidedown"
            no-touch
            no-prevent
            @press="$_onSlideDoneClick"
          ></md-number-key>
        </template>
        <template v-else>
          <li class="keyboard-number-item no-bg"></li>
          <md-number-key
            custom-class="keyboard-number-item"
            class="keyboard-number-item"
            :value="keyNumberList[9]"
            @press="$_onNumberKeyClick"
          ></md-number-key>
          <md-number-key
            custom-class="keyboard-number-item no-bg delete"
            class="keyboard-number-item no-bg delete"
            @press="$_onDeleteClick"
          ></md-number-key>
        </template>
      </ul>
    </div>
    <div class="keyboard-operate" v-if="type === 'professional'">
      <ul class="keyboard-operate-list">
        <md-number-key
          custom-class="keyboard-operate-item delete"
          @press="$_onDeleteClick"
        ></md-number-key>
        <md-number-key
          custom-class="keyboard-operate-item confirm"
          :value="okText"
          no-touch
          no-prevent
          @press="$_onConfirmeClick"
        ></md-number-key>
      </ul>
    </div>
  </div>
</template>

<script>// import { noop } from '@mand-mobile/shared/lib/util'
import Key from './key'

export default {
  name: 'md-number-keyboard-container',

  components: {
    'md-number-key': Key,
  },

  props: {
    type: {
      // simple, professional
      type: String,
      default: 'professional',
    },
    disorder: {
      type: Boolean,
      default: false,
    },
    hideDot: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
      default: '确定',
    },
    isView: {
      type: Boolean,
      default: false,
    },
    textRender: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      keyNumberList: [],
    }
  },

  computed: {
    dotText() {
      return (this.textRender && this.textRender('.')) || '.'
    },
    keyNumberListNumber() {
      return this.keyNumberList.slice(0, 9)
    },
  },

  created() {
    this.$_generateKeyNumber()
  },

  methods: {
    // MARK: private methods
    $_generateKeyNumber() {
      const baseStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      const baseStackTmp = [...baseStack]
      /* istanbul ignore next */
      this.keyNumberList = baseStack.map(item => {
        const val = this.disorder ? baseStackTmp.splice(parseInt(Math.random() * baseStackTmp.length), 1)[0] || 0 : item
        return (this.textRender && this.textRender(val)) || val
      })
    },

    // MARK: events handler, 如 $_onButtonClick
    $_onNumberKeyClick(val) {
      this.$emit('enter', val)
    },
    $_onDeleteClick() {
      this.$emit('delete')
    },
    $_onConfirmeClick() {
      this.$emit('confirm')
    },
    $_onSlideDoneClick() {
      this.$emit('hide')
    },
  },
}
</script>

<style lang="stylus">
.md-number-keyboard-container
  position relative
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  display flex
  width md-number-keyboard-width
  height md-number-keyboard-height
  hairline(top, md-number-keyboard-key-border-color)
  .keyboard-number, .keyboard-operate
    display flex
  .keyboard-number
    flex 3
    background md-number-keyboard-bg
    .keyboard-number-list
      // float left
      width 100%
      display flex
      flex-wrap wrap
      .keyboard-number-item
        position relative
        // float left
        width 33.3%
        flex 1 1 33.3%
        height md-number-keyboard-key-height
        padding-top 5px
        hairline(right, md-number-keyboard-key-border-color)
        hairline(top, md-number-keyboard-key-border-color)
        text-align center
        line-height md-number-keyboard-key-height
        font-size md-number-keyboard-key-font-size
        font-weight md-number-keyboard-key-font-weight
        font-family md-font-family-number
        color md-number-keyboard-key-color
        transition background .3s
        background md-number-keyboard-key-bg
        box-sizing border-box
        &.no-bg
          background transparent
        &:nth-of-type(-n+3)
          remove-hairline(top)
        &:nth-of-type(3n)
          width 33.4%
        &.delete
          background url(~@mand-mobile/shared/lib/images/keyboard-del.png) center no-repeat
          background-size 46px
        &.slidedown
          background md-number-keyboard-key-bg url(~@mand-mobile/shared/lib/images/keyboard-hide.png) center no-repeat
          background-size 54px
        &.large-item
          width 66.7%
          flex 1 1 66.7%
        &:active, &.active
          background-color md-number-keyboard-key-bg-tap
        &:before, &:after
          pointer-events none
  .keyboard-operate
    flex 1
    .keyboard-operate-list
      position relative
      // float left
      width 100%
      height 100%
      display flex
      flex-direction column
      .keyboard-operate-item
        position relative
        // float left
        width 100%
        background md-number-keyboard-key-bg
        transition background .3s
        &.delete
          flex 1
          display flex
          align-items center
          justify-content center
          height 214px
          background md-number-keyboard-key-bg url(~@mand-mobile/shared/lib/images/keyboard-del.png) center no-repeat
          background-size 42px
          &:active
            background-color md-number-keyboard-key-bg-tap
        &.confirm
          padding-top 5px
          color md-number-keyboard-key-confirm-color
          font-size md-font-caption-large
          background md-number-keyboard-key-confirm-bg
          display flex
          flex 1
          height 214px
          align-items center
          justify-content center
          &:active
            background-color md-number-keyboard-key-confirm-bg-tap
</style>
