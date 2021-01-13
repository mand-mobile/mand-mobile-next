export default {
  props: {
    content: {
      type: String,
      default: '',
    },
    spacing: {
      type: [String, Number],
      default: '60px',
    },
    repeatX: {
      type: Boolean,
      default: true,
    },
    repeatY: {
      type: Boolean,
      default: true,
    },
    rotate: {
      type: [String, Number],
      default: -30,
    },
    opacity: {
      type: [String, Number],
      default: 0.3,
    },
    color: {
      type: String,
      default: '#858B9C',
    },
    fontSize: {
      type: Number,
      default: 14,
    },
    styles: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
