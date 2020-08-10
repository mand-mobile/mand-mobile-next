<template>
  <div
    class="md-selector"
    :class="{
      'md-selector--normal': !isCheck,
      'md-selector--check': isCheck
    }"
  >
    <md-popup
      v-model="isSelectorShow"
      position="bottom"
      :mask-closable="maskClosable"
      is-inner
      @show="$_onSelectorShow"
      @hide="$_onSelectorHide"
      @maskClick="$_onSelectorCancel"
    >
      <md-popup-title-bar
        v-if="!hideTitleBar || isNeedConfirm"
        :title="title"
        :describe="describe"
        :ok-text="okText"
        :cancel-text="normalizedCancelText"
        :only-close="!isCheck && !isNeedConfirm && !normalizedCancelText"
        @confirm="$_onSelectorConfirm"
        @cancel="$_onSelectorCancel"
      ></md-popup-title-bar>
      <div class="md-selector_container">
        <md-scroll-view
          class="md-scroll-view"
          ref="scroll"
          :scrolling-x="false"
          :styles="{
            maxHeight: `${maxHeight}`,
            minHeight: `${minHeight}`
          }"
        >
          <slot name="header"></slot>
          <!-- audio-list with single select -->
          <div class="md-selector_list">
            <template v-if="!multi">
              <md-radio-list
                ref="radio"
                :key="radioKey"
                :value="defaultValue"
                :options="data"
                :is-slot-scope="hasSlot"
                :is-title-active="!isCheck"
                :icon="icon"
                :icon-disabled="iconDisabled"
                :icon-inverse="iconInverse"
                :icon-position="iconPosition"
                :icon-size="iconSize"
                :icon-svg="iconSvg"
                :align-center="!isCheck"
                @change="$_onSelectorChoose"
              >
                <template #default="{ option, index, selected }">
                  <slot :option="option" :index="index" :selected="selected"/>
                </template>
              </md-radio-list>
            </template>
            <!-- check-list with multi select -->
            <template v-else>
              <md-check-list
                ref="check"
                :key="checkKey"
                v-model="multiDefaultValue"
                :options="data"
                :is-slot-scope="hasSlot"
                :is-title-active="!isCheck"
                :icon="icon"
                :icon-disabled="iconDisabled"
                :icon-inverse="iconInverse"
                :icon-position="iconPosition"
                :icon-size="iconSize"
                :icon-svg="iconSvg"
              >
                <template slot-scope="{ option, index, selected }">
                  <slot :option="option" :index="index" :selected="selected"></slot>
                </template>
              </md-check-list>
            </template>
          </div>
          <slot name="footer"></slot>
        </md-scroll-view>
      </div>
    </md-popup>
  </div>
</template>

<script>
import Icon from '../icon'
import Popup from '../popup'
import PopupTitlebar from '../popup/title-bar'
import popupMixin from '../popup/mixins'
import popupTitleBarMixin from '../popup/mixins/title-bar'
import RadioList from '../radio/list'
import radioMixin from '../radio/mixins'
import CheckList from '../check/list'
import ScrollView from '../scroll-view'

export default {
  name: 'md-selector',

  mixins: [popupMixin, popupTitleBarMixin, radioMixin],

  components: {
    'md-icon': Icon,
    'md-radio-list': RadioList,
    'md-check-list': CheckList,
    'md-popup': Popup,
    'md-popup-title-bar': PopupTitlebar,
    'md-scroll-view': ScrollView,
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    defaultValue: {
      default: '',
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto',
    },
    minHeight: {
      type: [Number, String],
      default: 'auto',
    },
    normalized: {
      default: '',
    },
    iconPosition: {
      default: 'right',
    },
    multi: {
      type: Boolean,
      default: false,
    },
    hideTitleBar: {
      type: Boolean,
      default: false,
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // title: {
    //   type: String,
    //   default: '',
    // },
    // describe: {
    //   type: String,
    //   default: '',
    // },
    // okText: {
    //   type: String,
    //   default: '',
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
    // icon: {
    //   type: String,
    //   default: 'checked',
    // },
    // iconInverse: {
    //   type: String,
    //   default: 'check',
    // },
    // iconDisabled: {
    //   type: String,
    //   default: 'check-disabled',
    // },
    // iconSvg: {
    //   type: Boolean,
    //   default: false,
    // },
    // iconSize: {
    //   type: String,
    //   default: 'md',
    // },
    // iconPosition: {
    //   type: String,
    //   default: 'left',
    // },
  },

  data() {
    return {
      isSelectorShow: this.value,
      radioKey: Date.now(),
      checkKey: Date.now() + 1,
      activeIndex: -1,
      tmpActiveIndex: -1,
      multiDefaultValue: [],
    }
  },

  computed: {
    isNeedConfirm() {
      return this.okText !== ''
    },
    hasSlot() {
      return !!this.$scopedSlots.default
    },
    normalizedCancelText() {
      return this.cancelText || (this.okText ? '取消' : '')
    },
  },

  watch: {
    value(val) {
      this.isSelectorShow = val
    },
    isSelectorShow(val) {
      this.$emit('input', val)
    },
    defaultValue: {
      handler(val) {
        if (!this.multi || val === '') {
          return
        }

        this.multiDefaultValue = !Array.isArray(val) ? [val] : val
      },
      immediate: true,
    },
  },

  methods: {
    // MARK: private methods
    $_setScroller() {
      this.$refs.scroll.reflowScroller()
    },
    // MARK: events handler
    $_onSelectorConfirm() {
      if (this.multi) {
        this.$emit('confirm', this.multiDefaultValue.slice())
        this.isSelectorShow = false
        return
      }

      if (this.tmpActiveIndex > -1) {
        this.activeIndex = this.tmpActiveIndex
        this.isSelectorShow = false
        this.$emit('confirm', this.data[this.activeIndex])
      }
    },
    $_onSelectorCancel() {
      this.isSelectorShow = false
      this.tmpActiveIndex = this.activeIndex

      if (this.tmpActiveIndex !== -1) {
        this.$refs.radio.selectByIndex(this.tmpActiveIndex)
      } else {
        // reset radio
        this.radioKey = Date.now()
        this.checkKey = Date.now() + 1
      }

      this.$emit('cancel')
    },
    $_onSelectorChoose(item, index) {
      this.tmpActiveIndex = index
      if (!this.isNeedConfirm) {
        this.activeIndex = index
        this.isSelectorShow = false
      }

      this.$emit('choose', item)
    },
    $_onSelectorShow() {
      /* istanbul ignore next  */
      this.$_setScroller()
      this.$emit('show')
    },
    $_onSelectorHide() {
      /* istanbul ignore next  */
      this.$emit('hide')
    },
  },
}

</script>

<style lang="stylus">
.md-selector
  .md-popup
    z-index md-selector-zindex
  // .md-popup-title-bar .md-popup-cancel
  //   .md-icon
  //     align-self flex-start
  .md-selector_container
    background-color #FFF
  // .md-radio-item
  //   padding-left h-gap-sl
  //   padding-right h-gap-sl
  //   transition background-color .3s
    // .md-cell-item-body.multilines .md-cell-item-title
    //   font-weight font-weight-normal
    // &.is-selected
    //   .md-cell-item-title
    //     color color-primary
    // &:active
    //   background-color color-bg-tap
  .md-selector_list
    padding 0 md-h-gap-sl
  &.md-selector--check
    .md-radio-item--selected
      .md-cell-item_title
        color inherit
  // .md-check-item
  //   padding-left md-h-gap-sl
  //   padding-right md-h-gap-sl


.md-selector_container
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)
  overflow hidden

// .md-selector
//   &.is-normal
//     .md-radio-item
//       text-align center
//       .md-cell-item-left,
//       .md-cell-item-right
//         display none
</style>
