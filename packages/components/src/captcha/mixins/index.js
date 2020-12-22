export default {
  props: {
    isView: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    brief: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [Number, String],
      default: 4,
    },
    mask: {
      type: Boolean,
      default: false,
    },
    system: {
      type: Boolean,
      default: false,
    },
    autoSend: {
      type: Boolean,
      default: true,
    },
    autoCountdown: {
      type: Boolean,
      default: true,
    },
    count: {
      type: Number,
      default: 60,
    },
    countNormalText: {
      type: String,
      default: '发送验证码',
    },
    countActiveText: {
      type: String,
      default: '{$1}秒后重发',
    },
  },
}
