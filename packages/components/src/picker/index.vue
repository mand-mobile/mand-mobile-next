<template>
  <div class="md-picker">
    <md-popup
      ref="popup"
      class="inner-popup"
      v-model="isPickerShow"
      position="bottom"
      :mask-closable="maskClosable"
      @beforeShow="$_onPickerBeforeShow"
      @show="$_onPickerShow"
      @hide="$_onPickerHide"
      @maskClick="$_onPickerCancel"
    >
      <md-popup-title-bar
        :title="title"
        :describe="describe"
        :ok-text="okText"
        :cancel-text="cancelText"
        @confirm="$_onPickerConfirm"
        @cancel="$_onPickerCancel"
      ></md-popup-title-bar>
      <md-picker-view
        ref="pickerView"
        :data="data"
        :label-key="labelKey"
        :children-key="childrenKey"
        :default-index="cacheSelectedIndexs || defaultIndex"
        :default-value="cacheSelectedIndexs ? [] : defaultValue"
        :invalid-index="invalidIndex"
        :line-height="lineHeight"
        :keep-index="keepIndex"
        :is-cascade="isCascade"
        :is-immediate-init="false"
        :is-vibrate="isVibrate"
        :cols="cols"
        @initialed="$_onPickerInitialed"
        @change="$_onPickerChange"
      ></md-picker-view>
    </md-popup>
  </div>
</template>

<script>
import {createProxyApiMixin} from '@mand-mobile/shared/lib/mixin/proxy'
import {extend} from '@mand-mobile/shared/lib/util'
import Popup from '../popup'
import PopTitleBar from '../popup/title-bar'
import PickerView from './picker-view'
import pickerMixin from './mixins'

export default {
  name: 'md-picker',

  mixins: [
    createProxyApiMixin({
      pickerView: [
        'getColumnContext',
        'getColumnValue',
        'getColumnValues',
        'getColumnIndex',
        'getColumnIndexs',
        'setColumnValues',
      ],
    }),
    pickerMixin,
  ],

  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopTitleBar,
    'md-picker-view': PickerView,
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    cols: {
      type: Number,
      default: 1,
    },
    defaultValue: {
      type: Array,
      default() {
        return []
      },
    },
    defaultIndex: {
      type: Array,
      default() {
        return []
      },
    },
    invalidIndex: {
      type: Array,
      default() {
        return []
      },
    },
    isCascade: {
      type: Boolean,
      default: false,
    },

    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // isView: {
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
    //   default: '确认',
    // },
    // cancelText: {
    //   type: String,
    //   default: '取消',
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
    // lineHeight: {
    //   type: Boolean,
    // },
    // keepIndex: {
    //   type: Boolean,
    //   default: false,
    // },
  },

  data() {
    return {
      isPickerShow: false,
      cacheSelectedIndexs: null,
    }
  },

  watch: {
    value(val) {
      this.isPickerShow = val
      val && this.$_initPicker()
    },
    isPickerShow(val) {
      if (!val) {
        this.$emit('input', val)
      }
    },
  },

  mounted() {
    this.$_initPicker()
  },

  methods: {
    // MARK: events handler
    $_initPicker() {
      if (this.value) {
        this.isPickerShow = this.value
      }

      // mark initial selectedIndexs as snapshoot
      setTimeout(() => {
        this.$_cacheSelectedIndex()
      }, 0)
    },
    $_cacheSelectedIndex() {
      this.cacheSelectedIndexs = extend([], this.getColumnContext().selectedIndexs)
    },

    $_onPickerConfirm() {
      const pickerColumn = this.getColumnContext()
      const columnValues = pickerColumn.getColumnValues()
      // const columnIndexs = pickerColumn.getColumnIndexs()
      const isScrolling = pickerColumn.wheels.some(wheel => {
        return wheel.scroller.pending
      })
      if (!isScrolling) {
        this.isPickerShow = false
        // this.cacheSelectedIndexs = extend([], columnIndexs)
        this.$emit('confirm', columnValues)
      }
    },
    $_onPickerInitialed() {
      this.$emit('initialed')
    },
    $_onPickerCancel() {
      this.isPickerShow = false
      this.$emit('cancel')

      // reset picker by snapshot
      this.$nextTick(() => {
        this.$refs.pickerView.refresh()
      })
    },
    $_onPickerChange(columnIndex, itemIndex, values) {
      this.$emit('change', columnIndex, itemIndex, values)
    },
    $_onPickerBeforeShow() {
      const pickerColumn = this.getColumnContext()
      /* istanbul ignore next */
      if (!pickerColumn.isScrollInitialed) {
        setTimeout(() => {
          pickerColumn.refresh()
        }, 0)
      }
    },
    $_onPickerHide() {
      this.$emit('hide')
    },
    $_onPickerShow() {
      this.$emit('show')
    },

    refresh() {
      /**
       * Manual call 'column.refresh' only when picker is show,
       * otherwise 'column.refresh' will be called at popup's 'onBerforeShow' automatically
      */
      if (this.isPickerShow) {
        const pickerColumn = this.getColumnContext()
        pickerColumn.refresh.apply(pickerColumn, arguments)
      }
    },
  },
}

</script>

<style lang="stylus">
.md-picker
  width 100%
  .md-popup
    z-index md-picker-zindex
</style>
