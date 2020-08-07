<template>
  <div class="md-picker-view">
    <md-picker-column
      ref="pickerColumn"
      :data="columnData || data"
      :label-key="labelKey"
      :children-key="childrenKey"
      :default-value="defaultValue"
      :default-index="defaultIndex"
      :invalid-index="invalidIndex"
      :line-height="lineHeight"
      :keep-index="keepIndex"
      :is-vibrate="isVibrate"
      :cols="cols"
      @initialed="$_onPickerInitialed"
      @change="$_onPickerChange"
    ></md-picker-column>
  </div>
</template>

<script>
import {createProxyApiMixin} from '@mand-mobile/shared/lib/mixin/proxy'
import {compareObjects, cloneJSON, debounce, inBrowser} from '@mand-mobile/shared/lib/util'

import PickerColumn from './picker-column'
import pickerMixin from './mixins'
import cascadePicker from './cascade'

export default {
  name: 'md-picker-view',

  mixins: [
    createProxyApiMixin({
      pickerColumn: [
        'getColumnContext',
        'getColumnValue',
        'getColumnValues',
        'getColumnIndex',
        'getColumnIndexs',
        'setColumnValues',
        'setColumnIndex',
      ],
    }),
    pickerMixin,
  ],

  components: {
    'md-picker-column': PickerColumn,
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
  },

  data() {
    return {
      columnData: null,
      isDataOptimized: false,
    }
  },

  computed: {
    isScrollInitialed() {
      return this.$refs.pickerColumn && this.$refs.pickerColumn.isScrollInitialed
    },
  },

  watch: {
    data: {
      handler(val, oldVal) {
        if (!compareObjects(val, oldVal)) {
          this.isDataOptimized = false
          this.refresh()
        }
      },
      deep: true,
      immediate: true,
    },
    defaultIndex: {
      handler(val, oldVal) {
        if (!compareObjects(val, oldVal)) {
          this.refresh()
        }
      },
      deep: true,
    },
  },

  created() {
    this.refresh = debounce(this.refresh, 10)
  },
  mounted() {
    this.isImmediateInit &&
      this.$nextTick(() => {
        this.$refs.pickerColumn.refresh()
      })
  },

  methods: {
    // MARK: events handler
    $_initPickerColumn() {
      /* istanbul ignore if */
      if (!this.isCascade) {
        return
      }

      // data size needs to be optimized in miniapp to reduce the communication cost
      if (!this.isDataOptimized && !inBrowser) {
        this.columnData = [this.$_optimizePickerData(cloneJSON(this.data)[0])]
        this.isDataOptimized = true
      }

      // const defaultIndexOfFirstColumn = defaultIndex[0] || 0
      this.$nextTick(() => {
        cascadePicker(this.$refs.pickerColumn, {
          currentLevel: -1,
          maxLevel: this.cols,
          values: this.columnData || this.data || [],
          childrenKey: this.childrenKey,
          defaultIndex: this.defaultIndex,
          defaultValue: this.defaultValue,
        })
      })
    },
    $_optimizePickerData(data, path = []) {
      if (data) {
        data = cloneJSON(data)
      } else {
        return
      }

      // removing redundant "children" data carried by each column data
      const childrenKey = this.childrenKey
      return data.map((item, index) => {
        if (item && Array.isArray(item[childrenKey])) {
          delete item[childrenKey]
          Object.defineProperty(item, childrenKey, {
            get: () => {
              const _path = [...path, index]
              let _data = this.$_findPickerData(_path)
              if (_path.length < this.cols - 1) {
                _data = this.$_optimizePickerData(_data, _path)
              }
              return _data
            },
          })
          // item = new Proxy(item, {
          //   get: (target, prop) => {
          //     if (prop === childrenKey) {
          //       const _path = [...path, index]
          //       let _data = this.$_findPickerData(_path)
          //       if (_path.length < this.cols - 1) {
          //         _data = this.$_optimizePickerData(_data, _path)
          //       }
          //       return _data
          //     }
          //     return target[prop]
          //   }
          // })
        }
        return item
      })
    },
    $_findPickerData(path = []) {
      const childrenKey = this.childrenKey
      let level = 0
      let data = this.data[0]

      while (data && level < path.length) {
        const index = path[level]
        data = data[index] && data[index][childrenKey]
        level++
      }

      return data
    },

    $_onPickerConfirm() {
      const pickerColumn = this.$refs.pickerColumn
      const columnValues = pickerColumn.getColumnValues()
      let isScrolling = false

      // TODO
      pickerColumn.wheels.forEach(wheel => {
        /* istanbul ignore next */
        if (wheel.scroller.pending) {
          isScrolling = true
          return false
        }
      })

      if (!isScrolling) {
        this.isPickerShow = false
        this.$emit('confirm', columnValues)
      }
    },
    $_onPickerInitialed() {
      this.$emit('initialed')
    },
    $_onPickerChange(columnIndex, itemIndex, values) {
      /* istanbul ignore next */
      if (this.isCascade && values) {
        const pickerColumn = this.$refs.pickerColumn
        cascadePicker(pickerColumn, {
          currentLevel: columnIndex,
          maxLevel: this.cols,
          values,
          childrenKey: this.childrenKey,
          complete: () => {
            // reinitiate columns after the changing column
            pickerColumn.refresh(null, columnIndex + 1)
          },
        })
      }
      /* istanbul ignore next */
      this.$emit('change', columnIndex, itemIndex, values)
    },

    refresh() {
      const pickerColumn = this.$refs.pickerColumn
      this.$_initPickerColumn()
      if (pickerColumn && pickerColumn.refresh) {
        this.$nextTick(() => {
          pickerColumn.isScrollInitialed = false
          pickerColumn.refresh.apply(pickerColumn, arguments)
        })
      }
    },
  },
}

</script>
