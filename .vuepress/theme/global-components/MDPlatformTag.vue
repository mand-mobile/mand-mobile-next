<template>
  <div class="md-doc-platform-tag small">
    <template v-for="(item, key) in platformsList">
      <a-tooltip v-if="item" :key="key">
        <template slot="title">{{`${tipPrefix}${transName(item)}`}}</template>
        <em class="md-doc-platform-tag_item">{{transName(item)}}</em>
      </a-tooltip>
    </template>
  </div>
</template>

<script>
import Tooltip from 'ant-design-vue/lib/tooltip'
import 'ant-design-vue/lib/tooltip/style/index.css'

export default {
  props: {
    platforms: {
      type: [Array, String],
      default () {
        return ['web', 'uni']
      }
    },
    web: {
      type: Boolean,
      default: false
    },
    uni: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [Tooltip.name]: Tooltip,
  },
  computed: {
    platformsList () {
      if (this.web) {
        return ['web']
      }
      if (this.uni) {
        return ['uni']
      }
      return typeof this.platforms === 'string' ? [this.platforms] : this.platforms
    },
    tipPrefix () {
      return this.platformsList.length > 1 ? '支持' : '仅支持'
    }
  },
  methods: {
    transName (name) {
      switch (name) {
        case 'web':
          return 'Webapp'
        case 'uni':
          return 'Uniapp'
        default:
          return name
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-platform-tag
  display inline-flex
  &_item
    display flex
    align-items center
    border solid 1px #2f86f6
    border-radius 2em
    font-style normal
    color #2f86f6
    &:not(:last-child)
      margin-right 5px
  &.large .md-doc-platform-tag_item
    height 2em !important
    padding 0 .6em !important
    font-size 14px !important
  &.small .md-doc-platform-tag_item
    height 1.8em
    padding 0 .4em
    font-size 12px
</style>