<template>
  <div class="md-doc-platform-tag">
    <template v-for="(item, key) in platforms">
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
      type: Array,
      default () {
        return ['web', 'uni']
      }
    }
  },
  components: {
    [Tooltip.name]: Tooltip,
  },
  computed: {
    tipPrefix () {
      return this.platforms.length > 1 ? '支持' : '仅支持'
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
  display flex
  &_item
    display flex
    align-items center
    height 2em
    padding 0 .6em
    border solid 1px $accentColor
    border-radius 2em
    font-size .8em
    font-style normal
    color $accentColor
    &:not(:last-child)
      margin-right 5px
</style>