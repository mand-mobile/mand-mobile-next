<template>
  <div class="md-example-child md-example-child-icon md-example-child-icon-0">
    <div
      class="md-example-item"
      v-for="(icon, index) in iconList"
      :key="icon"
    >
      <md-icon
        :name="icon.split('/')[0]"
        :size="size(index)"
      ></md-icon>
      <p class="icon-name">{{ icon }}</p>
    </div>
  </div>
</template>

<script>
import Icon from '../../../icon'

export default {
  name: 'icon-demo',
  /* DELETE */
  title: '字体图标',
  titleEnUS: 'Icon Font',
  align: 'center',
  background: '#fff',
  /* DELETE */
  components: {
    'md-icon': Icon,
  },
  data() {
    return {
      iconList: [
        'rectangle',
        'right',
        'wrong',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrow-down',
        'invisible',
        'visible',
        'service',
        'setting',
        'close',
        'refresh',
        'edit',
        'sort',
        'info',
        'question',
        'security',
        'rmb',
        'wait',
        'check',
        'checked/success',
        'check-disabled',
        'clear/fail',
        'warn',
        'info-solid',
        'scan',
        'share',
        'back',
        'card-bag',
        'message',
        'order',
        'balance',
        'coupon',
        'address-book',
        'mobile-phone',
        'calendar',
        'home',
        'discovery',
        'switch',
        'time',
        'search',
        'user',
        'camera',
        'clock',
        'delete',
        'profession',
        'id-card',
        'authentication',
        'location',
        'filter',
        'motor-vehicle',
        'phone',
        'volumn',
      ],
    }
  },
  methods: {
    size() {
      return 'lg'
    },
  },
}
// #region ignore
export const metaInfo = {
  hideCode: true,
  'zh-CN': {
    title: '字体图标',
  },
  'en-US': {
    title: 'Icon Font',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-example-child-icon
  padding 0 32px
  display flex
  flex-wrap wrap
  justify-content center
  align-items center
  .md-example-item
    margin-bottom 16px
    width 30%
  .icon-name
    font-size 24px
</style>
