import popupMixin from '../../popup/mixins'
import popupTitleBarMixin from '../../popup/mixins/title-bar'

export default {
  props: {
    ...popupMixin.props,
    ...popupTitleBarMixin.props,
    labelKey: {
      type: String,
      default: 'label',
    },
    childrenKey: {
      type: String,
      default: 'children',
    },
    isVibrate: {
      type: Boolean,
      default: false,
    },
    okText: {
      default: '确认',
    },
    cancelText: {
      default: '取消',
    },
    lineHeight: {
      type: Number,
      default: 45
    },
    keepIndex: {
      type: Boolean,
      default: false,
    },
    isImmediateInit: {
      type: Boolean,
      default: true,
    },
  },
}
