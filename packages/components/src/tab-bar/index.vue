<template>
  <nav class="md-tab-bar">
    <div class="md-tab-bar-inner">
      <template v-if="scrollable">
        <div class="md-tab-bar-start" v-show="maskStartShown"></div>
        <div class="md-tab-bar-end" v-show="maskEndShown"></div>
      </template>
      <md-scroll-view
        ref="scroller"
        :scrolling-x="scrollable"
        :scrolling-y="false"
        :bouncing="scrollable"
        :key="scrollerTmpKey"
        @scroll="$_onScroll"
      >
         <div class="md-tab-bar-list" :style="{width: contentW + 'px'}" :class="[justify]">
          <div
            class="md-tab-bar-item"
            :class="{
              'is-active': currentName === item.name,
              'is-disabled': !!item.disabled,
              'divided': hasDivide
            }"
            v-for="(item, index) in items"
            :key="item.name"
            @click="$_onClick(item, index)"
          >
            <slot
              name="item"
              :item="item"
              :items="items"
              :index="index"
              :currentName="currentName"
            >{{ item.label }}</slot>
          </div>
        </div>
        <div
          class="md-tab-bar-ink"
          :class="{
            'is-disabled': currentTab && currentTab.disabled
          }"
          v-if="hasInk"
          :style="{
            width: inkWidth + 'px',
            transform: 'translate3d(' + inkPos + 'px, 0, 0)',
          }"
        ></div>
      </md-scroll-view>
    </div>
  </nav>
</template>

<script>
import ScrollView from '../scroll-view'
import {root, debounce} from '@mand-mobile/shared/lib/util'

export default {
  name: 'md-tab-bar',

  components: {
    'md-scroll-view': ScrollView,
  },

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    hasInk: {
      type: Boolean,
      default: true,
    },
    hasDivide: {
      type: Boolean,
      default: false,
    },
    inkLength: {
      type: Number,
      default: 80,
    },
    immediate: {
      type: Boolean,
      default: false,
    },
    justify: {
      type: String,
      default: 'space-between',
    },
  },

  data() {
    return {
      currentName: '',
      wrapperRect: null,
      wrapperW: 0,
      contentW: 0,
      inkWidth: 0,
      inkPos: 0,
      scrollerTmpKey: Date.now(),
      maskStartShown: false,
      maskEndShown: true,
    }
  },

  computed: {
    scrollable() {
      return this.contentW > this.wrapperW
    },
    currentIndex() {
      for (let i = 0, len = this.items.length; i < len; i++) {
        if (this.items[i].name === this.currentName) {
          return i
        }
      }
    },
    currentTab() {
      if (this.currentIndex) {
        return this.items[this.currentIndex]
      }
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val !== this.currentName) {
          this.currentName = val
        }
      },
    },
    items() {
      /* istanbul ignore next */
      this.$nextTick(function() {
        this.reflow()
      })
    },
    currentIndex() {
      this.$nextTick(function() {
        this.reflow()
      })
    },
    scrollable() {
      /* istanbul ignore next */
      this.scrollerTmpKey = Date.now()
    },
  },

  created() {
    if (this.currentName === '' && this.items.length) {
      this.currentName = this.items[0].name
      this.$emit('change', this.items[0], 0, 0)
    }
    this.reflow = debounce(this.reflow, 50)
  },
  mounted() {
    this.$_resizeEnterBehavior()
  },
  activated() {
    /* istanbul ignore next */
    this.$_resizeEnterBehavior()
  },
  deactivated() {
    /* istanbul ignore next */
    this.$_resizeLeaveBehavior()
  },
  beforeDestroy() {
    this.$_resizeLeaveBehavior()
  },

  methods: {
    // MARK: private events
    $_onScroll({scrollLeft}) /* istanbul ignore next */ {
      scrollLeft = Math.abs(scrollLeft)

      if (scrollLeft > 0) {
        this.maskStartShown = true
      } else {
        this.maskStartShown = false
      }
      
      const {wrapperW, contentW} = this.$refs.scroller.getSizes()

      if (scrollLeft >= contentW - wrapperW) {
        this.maskEndShown = false
      } else {
        this.maskEndShown = true
      }
    },
    $_onClick(item, index) {
      if (item.disabled || this.$refs.scroller.pending) {
        return
      }
      this.$emit('change', item, index, this.currentIndex)
      this.currentName = item.name
      this.$emit('input', item.name)
    },
    $_resizeEnterBehavior() {
      root.addEventListener('resize', this.reflow.bind(this, true))
      this.reflow()
      /* istanbul ignore next */
      if (this.immediate) {
        this.$nextTick(() => {
          this.$emit('change', this.items[this.currentIndex], this.currentIndex)
        })
      }
    },
    $_resizeLeaveBehavior() {
      root.removeEventListener('resize', this.reflow)
    },
    // MARK: public methods
    async reflow() {
      /* istanbul ignore next */
      if (!this.items || this.items.length === 0) {
        return
      }

      const scroller = this.$refs.scroller
      const wrapper = this.$MDDom().querySelector('.md-tab-bar-inner')
      const items = this.$MDDom().querySelectorAll('.md-tab-bar-item')
      
      // if (force) {
      this.wrapperRect = await wrapper.getBoundingClientRect()
      // }

      const wrapperRect = this.wrapperRect || {}
      this.wrapperW = wrapperRect.width
      
      let contentWidth = 0
      let itemsRect = []


      for (let i = 0, len = this.items.length; i < len; i++) {
        const itemRect = await items[i].getBoundingClientRect()
        contentWidth += itemRect.width
        itemsRect.push(itemRect)
      }

      this.contentW = contentWidth
      scroller.reflowScroller()
      this.$nextTick(async () => {
        /* istanbul ignore next */
        if (!items || !items[this.currentIndex]) {
          return
        }

        const target = items[this.currentIndex]
        const targetRect = itemsRect[this.currentIndex]
        const scrollOffsets = scroller.getOffsets()
        const scrollLeft = Math.abs(scrollOffsets.left)
        
        this.inkWidth = targetRect.width * this.inkLength / 100
        this.inkPos = (targetRect.left - wrapperRect.left) + (targetRect.width - this.inkWidth) / 2 + scrollLeft

        const hasPrevTarget = !(this.currentIndex - 1 < 0)
        const hasNextTarget = !(this.currentIndex + 1 > this.items.length - 1)
        const prevTargetRect = itemsRect[this.currentIndex - 1]
        const nextTargetRect = itemsRect[this.currentIndex + 1]

        if (!hasPrevTarget) {
          scroller.scrollTo(0, 0, true)
          return
        }
        /* istanbul ignore next */
        if (!hasNextTarget) {
          scroller.scrollTo(-(this.contentW - this.wrapperW), 0, true)
          return
        }

        /* istanbul ignore next */
        if (prevTargetRect && prevTargetRect.left < wrapperRect.left) {
          const offsetLeft = prevTargetRect.left - wrapperRect.left + scrollLeft
          this.$refs.scroller.scrollTo(-offsetLeft, 0, true)
        } else if (nextTargetRect && nextTargetRect.right > wrapperRect.right) {
          const offsetLeft = nextTargetRect.left - wrapperRect.left + scrollLeft
          this.$refs.scroller.scrollTo(-(offsetLeft + nextTargetRect.width - this.wrapperW), 0, true)
        }
      })
    },
  },
}

</script>

<style lang="stylus">
.md-tab-bar
  position relative
  padding-left tab-offset
  padding-right tab-offset
  background-color tab-bg

.md-tab-bar-inner
  position relative
  width 100%
  // line-height 0

.md-tab-bar-list
  display flex
  justify-content space-between
  min-width 100%
  &.flex-start
    justify-content flex-start
    .md-tab-bar-item
      flex none
      margin 0 0
      padding 0 30px
      font-size font-caption-normal

.md-tab-bar-item
  flex auto
  flex-shrink 0
  position relative
  display inline-flex
  align-items center
  justify-content center
  color tab-text-color
  font-size tab-font-size
  font-weight tab-font-weight
  min-height tab-height
  padding 0 tab-item-gap
  margin 0 auto
  box-sizing border-box
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  &.is-active
    color tab-active-color
  &.is-disabled
    color tab-disabled-color
  &:last-of-type:after
    display none
  &.divided:after
    content: ""
    position absolute
    top 50%
    right 0
    width 1px
    height 50%
    border-left solid 1px color-border-base
    transform translate(50%, -50%)

.md-tab-bar-ink
  position absolute
  bottom 0
  left 0
  display block
  height tab-ink-height
  background-color tab-active-color
  transition all 300ms
  &.is-disabled
    background-color tab-disabled-color

.md-tab-bar-start,
.md-tab-bar-end
  position absolute
  top 0
  left 0
  width 14px
  height tab-height
  overflow hidden
  &::after
    content ''
    display block
    position absolute
    left -14px
    top 50%
    width 14px
    if tab-height is a 'unit'
      margin-top 0 - tab-height * 0.4
      height tab-height * 0.8
    else
      margin-top "calc(0 - %s * 0.4)" % tab-height
      height "calc(%s * 0.8)" % tab-height
    border-radius 50%
    box-shadow: -1px 0 12px 0 rgba(0,0,0,0.2)
.md-tab-bar-end
  left auto
  right 0
  transform rotate(180deg)

.md-tab-bar
  .md-scroll-view
    display block
  .md-scroll-view-container
    min-width 100%
</style>
