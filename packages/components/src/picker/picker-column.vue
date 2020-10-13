<template>
  <div
    class="md-picker-column"
    :class="{'md-multiple': columnLength >= 5}"
    :style="{
      height: `${style.indicatorHeight + 2 * style.maskerHeight}px`
    }"
  >
    <div class="md-picker-column_container">
      <!-- <p style="position:absolute;top:0;">{{transformStyle[0]}}</p> -->
      <div class="md-picker-column_masker md-picker-column_masker--top" :style="{ height: `${style.maskerHeight}px` }"></div>
      <div class="md-picker-column_masker md-picker-column_masker--bottom" :style="{ height: `${style.maskerHeight}px` }"></div>
      <div
        class="md-picker-column_list"
        :style="{visibility: isInitialed ? 'visible' : 'hidden'}"
      >
        <template v-for="(column, i) in columnValues">
          <div class="md-picker-column_wrapper" :key="i">
            <ul
              class="md-picker-column_wheel"
              :style="transformStyle[i] || ''"
            >
              <template v-for="(item, j) in column">
                <li
                  class="md-picker-column_item"
                  :class="{
                    'md-active': j === activedIndexs[i],
                    'md-disabled': $_isColumnIndexInvalid(i, j)
                  }"
                  :style="{
                    'height': `${style.indicatorHeight}px`,
                    'line-height': `${style.indicatorHeight}px`
                  }"
                  :key="j"
                  v-text="item[labelKey]"
                  >
                </li>
              </template>
            </ul>
          </div>
        </template>
        <template v-if="columnLength">
          <template v-for="n in (columnLength - columnValues.length)">
            <div class="md-picker-column_wrapper" :key="n">
              <ul
                class="md-picker-column_wheel"
                :style="transformStyle[n + columnValues.length - 1] || ''"
              ></ul>
            </div>
          </template>
        </template>
      </div>
      <div class="md-picker-column_hooks">
        <template v-if="columnLength">
          <div
            class="md-picker-column_hooks_item"
            v-for="(item, k) in colsCount"
            :key="k"
            @touchstart.prevent.stop="$_onColumnTouchStart($event, k)"
            @mousedown.prevent.stop="$_onColumnTouchStart($event, k, true)"
            @touchmove.prevent.stop="$_onColumnTouchMove($event, k)"
            @mousemove.prevent.stop="$_onColumnTouchMove($event, k, true)"
            @touchend.prevent.stop="$_onColumnTouchEnd($event, k)"
            @mouseup.prevent.stop="$_onColumnTouchEnd($event, k, true)"
            @mouseleave.prevent.stop="$_onColumnTouchEnd($event, k, true)"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// import Scroller from '../_util/scroller'
// import {render} from '../_util/render'
import Scroller from '@mand-mobile/scroller'
import WheelScroller from '@mand-mobile/scroller/lib/wheel'
import {Dom, Device} from '@mand-mobile/platform-runtime/lib/module'
import {noop, traverse, inArray, inBrowser, extend, warn} from '@mand-mobile/shared/lib/util'
import pickerMixin from './mixins'

const API_LIST = [
  'getColumnContext',
  'getColumnValue',
  'getColumnValues',
  'getColumnIndex',
  'getColumnIndexs',
  // 'getColumnIndexByDefault',
  'setColumnValues',
  'refresh',
  'inheritPickerApi',
]

export default {
  name: 'md-picker-column',

  mixins: [pickerMixin],

  props: {
    data: {
      type: Array,
      default() {
        /* istanbul ignore next */
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
        /* istanbul ignore next */
        return []
      },
    },
    defaultIndex: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    invalidIndex: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    // lineHeight: {
    //   type: Number,
    //   default: 45,
    // },
    // keepIndex: {
    //   type: Boolean,
    //   default: false,
    // },
  },

  data() {
    return {
      columnValues: [],
      columnRect: [],
      wheels: [],
      transformStyle: [],
      activedIndexs: [],
      activedWheels: [],
      selectedIndexs: [],
      isInitialed: false,
      isScrollInitialed: false,
      isScrolling: false,
      isMouseDown: false,
    }
  },

  computed: {
    dpr() {
      return inBrowser ? Device().device.pixelRatio : 1
    },
    style() {
      return {
        maskerHeight: (this.lineHeight * 2 + 10) * this.dpr,
        indicatorHeight: this.lineHeight * this.dpr,
      }
    },
    columnLength() {
      return this.cols || 1
    },
    colsCount() {
      // uniapp traverses from 0
      return Array(this.columnLength).fill('')
    },
  },

  watch: {
    data: {
      handler(val) {
        this.columnValues = extend([], val)
      },
      deep: true,
    },
  },

  created() {
    this.columnValues = extend([], this.data)
  },

  destroyed() {
    this.$_destoryColumnScroller()
  },

  methods: {
    // MARK: private methods
    async $_initColumns(startIndex = 0) {
      this.$_initColumnsIndex()

      let promises = []
      for (let index = startIndex, len = this.columnLength; index < len; index++) {
        promises.push(this.$_initColumnScroller(index))
        // const wheel = await this.$_initColumnScroller(index)
        // this.$set(this.wheels, index, wheel)
        // this.$_resetScrollingPosition(index)
      }

      Promise.all(promises).then(() => {
        if (!this.isInitialed) {
          this.isInitialed = true
          this.$emit('initialed')
        }
      })

      this.isScrollInitialed = true
    },

    // initial scroller for column by index
    async $_initColumnScroller(index = 0) {
      const $MDDom = Dom.bind(this)
      const wrapper = $MDDom().querySelectorAll('.md-picker-column_hooks_item')[index]
      const content = $MDDom().querySelectorAll('.md-picker-column_wheel')[index]
      const columnData = this.columnValues[index]
      const columnRect = await this.$_getColumnRect({wrapper, content}, index)
      const columnItemHeight = this.style.indicatorHeight

      /* istanbul ignore if */
      if (!columnData || !columnRect) {
        return
      }

      // only content height will change
      columnRect.content.height = columnData.length * columnItemHeight

      const scroller = new Scroller(wrapper.element, content.element, {
        swipeTime: 1500,
        probeType: 3,
      })
      scroller.setDimensions(columnRect.wrapper, columnRect.content)

      const wheel = new WheelScroller(scroller, {
        items: columnData,
        // itemLength: columnData.length,
        invalidIndex: this.invalidIndex[index],
      })

      // wheel.scroller.on('translate', (point, styles) => {
      //   this.$_onColumnTranslating(styles, index)
      // })
      wheel.scroller.on('translate', this.$_onColumnTranslating.bind(this, index))
      wheel.scroller.on('scroll', this.$_onColumnScrolling.bind(this, index))
      wheel.scroller.on('scrollStart', () => {
        if (wheel.scroller.scrollable.y) {
          this.$_toggleColumnScroller(index, false)
        }
      })
      wheel.scroller.on('scrollEnd', () => {
        this.$_toggleColumnScroller(index, true)
        this.$_onColumnScrollEnd(index, wheel.getSelectedIndex())
      })

      this.$set(this.wheels, index, wheel)
      this.$_resetScrollingPosition(index)

      return wheel
    },
    async $_getColumnRect(nodeRef, index) {
      const columnRect = this.columnRect[index]
      const firstColumnRect = this.columnRect[0]
      let wrapperRect, contentRect

      if (!columnRect && nodeRef.wrapper && nodeRef.content) {
        if (!firstColumnRect) {
          wrapperRect = await nodeRef.wrapper.getBoundingClientRect()
          contentRect = await nodeRef.content.getBoundingClientRect()
        } else {
          wrapperRect = firstColumnRect.wrapper
          contentRect = firstColumnRect.content
        }
        this.$set(this.columnRect, index, {
          wrapper: wrapperRect,
          content: contentRect,
        })
      }

      return this.columnRect[index]
    },
    $_destoryColumnScroller() {
      this.wheels.forEach(wheel => {
        wheel.scroller.destroy()
      })
    },
    $_toggleColumnScroller(index, enable) {
      if (this.wheels.length <= 1) {
        return
      }
      this.wheels.forEach((wheel, i) => {
        if (i !== index && !wheel.scroller.pending) {
          if (!enable) {
            wheel.scroller.disable()
          } else {
            wheel.scroller.enable()
          }
        }
      })
      // for (let i = 0, len = this.wheels.length; i < len; i++) {
      //   const wheel = this.$_getWheel(i, 'toggleColumnsScroller')
      //   if (wheel) {
      //     if (wheel.scroller.enabled) {
      //       wheel.scroller.disable()
      //     } else {
      //       wheel.scroller.enable()
      //     }
      //   }
      // }
    },

    // each column scroll to active item by defaultIndex
    $_initColumnsIndex() {
      // initial index only refresh all columns
      if (this.isInitialed) {
        return
      }

      const data = this.columnValues
      const defaultValue = this.defaultValue
      const defaultIndex = this.defaultIndex

      this.$_getColumnIndexByDefault(data, defaultIndex, defaultValue, (columnIndex, itemIndex) => {
        this.$set(this.selectedIndexs, columnIndex, itemIndex)
      })
    },
    $_getColumnIndexByDefault(data, defaultIndex = [], defaultValue = [], fn = noop) {
      /* istanbul ignore if */
      if (!data) {
        return
      }

      traverse(data, (item, level, indexs) => {
        const columnIndex = indexs[0]
        const itemIndex = indexs[1]
        let itemDefaultIndex = defaultIndex[columnIndex]
        const itemDefaultValue = defaultValue[columnIndex]

        /*
         * given a default itemIndex when both defaultIndex & defaultValue are undefined
         * avoid activieIndexs failing to initialize
         */
        if (itemDefaultIndex === undefined && itemDefaultValue === undefined) {
          itemDefaultIndex = 0
        }

        // get initial itemIndex of each columnIndex by defaultIndex or defaultValue
        if (
          (itemDefaultIndex !== undefined && itemIndex === itemDefaultIndex) ||
          (itemDefaultValue !== undefined &&
            (item.value === itemDefaultValue || item[this.labelKey] === itemDefaultValue))
        ) {
          fn(columnIndex, itemIndex)
          return 2
        }
      })
    },
    $_isColumnIndexActive(columnIndex, itemIndex) {
      const activeIndex = this.selectedIndexs[columnIndex]
      return activeIndex === itemIndex
    },
    $_isColumnIndexInvalid(columnIndex, itemIndex) {
      const invalidIndex = this.invalidIndex[columnIndex]
      return inArray(invalidIndex, itemIndex)
    },
    $_resetScrollingPosition(columnIndex) {
      const wheel = this.$_getWheel(columnIndex)
      const columnValue = this.columnValues[columnIndex] || []

      let cacheColumnSelectedIndex = this.selectedIndexs[columnIndex] || 0

      if (!wheel) {
        return
      }

      if (cacheColumnSelectedIndex > columnValue.length - 1) {
        cacheColumnSelectedIndex = columnValue.length - 1
      }

      wheel.wheelTo(cacheColumnSelectedIndex)
      this.$set(this.selectedIndexs, columnIndex, cacheColumnSelectedIndex)
    },
    $_getWheel(index, pos) {
      const wheel = this.wheels[index]

      /* istanbul ignore if */
      if (!wheel) {
        pos && warn(`${pos}: wheel of column ${index} is undefined`)
        return
      }

      return wheel
    },

    // MARK: events handler
    $_onColumnTouchStart(event, index, isMouse) {
      const wheel = this.$_getWheel(index, 'touchstart')

      /* istanbul ignore if */
      if (!wheel) {
        return
      }

      this.isMouseDown = !!isMouse
      this.activedWheels[index] = true

      wheel && wheel.scroller.handleStart(event)
    },
    $_onColumnTouchMove(event, index, isMouse) {
      const wheel = this.$_getWheel(index, 'touchmove')

      /* istanbul ignore if */
      if (!wheel || (isMouse && !this.isMouseDown)) {
        return
      }

      this.isMouseDown = !!isMouse

      wheel && wheel.scroller.handleMove(event)
    },
    $_onColumnTouchEnd(event, index, isMouse) {
      const wheel = this.$_getWheel(index, 'touchend')

      /* istanbul ignore if */
      if (!wheel || (isMouse && !this.isMouseDown)) {
        return
      }

      this.isMouseDown = !isMouse

      wheel && wheel.scroller.handleEnd(event)
    },
    $_onColumnTranslating(index, point, styles) {
      let styleContent = ''
      for (const key in styles) {
        if (styles.hasOwnProperty(key)) {
          styleContent += `${key}:${styles[key]};`
        }
      }
      styleContent += `margin-top:${this.style.maskerHeight}px;`
      this.$set(this.transformStyle, index, styleContent)
    },
    $_onColumnScrolling(index, point) {
      const wheel = this.$_getWheel(index)
      const curActivedIndex = this.activedIndexs[index]
      const activedIndex = wheel.findNearestValidWheel(point.y).index

      if (curActivedIndex !== activedIndex) {
        this.$set(this.activedIndexs, index, activedIndex)
        if (this.isVibrate && this.activedWheels[index]) {
          Device().vibrate()
        }
      }
    },
    $_onColumnScrollEnd(columnIndex, itemIndex) {
      if (this.selectedIndexs[columnIndex] === itemIndex) {
        return
      }
      this.activedWheels[columnIndex] = false
      /* istanbul ignore next */
      this.$set(this.selectedIndexs, columnIndex, itemIndex)
      /* istanbul ignore next */
      this.$emit('change', columnIndex, itemIndex, this.getColumnValue(columnIndex))
    },

    // MARK: public methods
    inheritPickerApi(instance, blacklist = []) {
      traverse(API_LIST, api => {
        /* istanbul ignore if */
        if (!instance) {
          return 2
        } else if (~blacklist.indexOf(api)) {
          return 1
        }

        const fn = this[api]

        /* istanbul ignore else */
        if (fn) {
          instance[api] = fn
        } else {
          warn(`inheritPickerApi: Api method [${api}] is undefined`)
        }
      })
    },
    getColumnValue(index = 0) {
      const activeValues = this.getColumnValues()
      return activeValues[index]
    },
    getColumnValues() {
      const data = this.columnValues
      const activeIndexs = this.selectedIndexs
      let activeValues = []

      data.forEach((item, index) => {
        activeValues[index] = item[activeIndexs[index]]
      })

      return activeValues
    },
    getColumnIndex(index = 0) {
      return this.selectedIndexs[index]
    },
    getColumnIndexs() {
      return this.selectedIndexs
    },
    getColumnContext() {
      return this
    },
    // getColumnIndexByDefault(data, defaultIndex = [], defaultValue = [], fn = noop) {
    //   /* istanbul ignore next */
    //   this.$_getColumnIndexByDefault(data, defaultIndex, defaultValue, fn)
    // },
    setColumnIndex(columnIndex, itemIndex) {
      const wheel = this.$_getWheel(columnIndex, 'setColumnIndex')
      wheel && wheel.wheelTo(itemIndex, 300)
    },
    setColumnValues(index, values, callback = noop) {
      /* istanbul ignore if */
      if (index === undefined || values === undefined) {
        return
      }

      // reset active index
      if (!this.keepIndex) {
        this.$set(this.selectedIndexs, index, 0)
      }

      this.$set(this.columnValues, index, values)
      this.$nextTick(callback.bind(this, this))
    },
    refresh(callback, startIndex = 0) {
      setTimeout(() => {
        if (!startIndex) {
          this.isInitialed = false
        }
        this.$_initColumns(startIndex)
        callback && callback(this)
      }, 0)
    },
  },
}

</script>

<style lang="stylus">
.md-picker-column
  position relative
  width 100%
  padding 0 md-picker-padding-h
  background md-color-bg-inverse
  box-sizing border-box
  transform translate3d(0, 0, 0)
  &.md-multiple
    .md-picker-column_item
      font-size md-picker-font-size-small !important

.md-picker-column_container
  position relative
  height 100%

.md-picker-column_masker
  position absolute !important
  z-index 2
  left 0
  right 0
  transform translate3d(0, 0, 0)

  &--top
    top 0
    // background -webkit-gradient(linear,left bottom,left top,from(hsla(0, 0%,100%,.2)),to(hsla(0,0%,100%,1)))
    // hairline(bottom, picker-border-color, 0, 3px)
    border-bottom solid 1px md-picker-border-color
  &--bottom
    bottom 0
    // bottom constant(safe-area-inset-bottom)
    // background -webkit-gradient(linear,left top,left bottom,from(hsla(0, 0%,100%,.2)),to(hsla(0,0%,100%,1)))
    // hairline(top, picker-border-color, 0, 3px)
    border-top solid 1px md-picker-border-color

.md-picker-column_hooks
  display flex
  position absolute
  z-index 3
  absolute-pos()
  // padding 0 md-picker-padding-h

.md-picker-column_hooks_item
  display flex
  flex 1
  height 100%

.md-picker-column_list
  display flex
  height 100%
  // padding 0 picker-padding-h

.md-picker-column_wrapper
  position relative
  display flex
  flex 1
  clearfix()
  overflow hidden
  .md-picker-column_wheel
    position absolute
    top 0
    left 0
    width 100%
    transform-origin left top
    box-sizing border-box
    transform translate3d(0, 0, 0)
    .md-picker-column_item
      float left
      width 100%
      padding 0 md-h-gap-sm
      box-sizing border-box
      color md-picker-color
      font-size md-picker-font-size
      text-align center
      // white-space nowrap
      word-ellipsis()
      &.md-active
        color md-picker-color-active
        font-weight md-picker-font-weight-active
      &.md-disabled
        opacity md-picker-disabled-opacity
</style>
