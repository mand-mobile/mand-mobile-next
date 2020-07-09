<template>
  <div class="md-date-picker-view" :class="[`md-date-picke-${type}`]">
    <md-picker-view
      ref="pickerView"
      class="md-date-picker"
      :data="columnData"
      :cols="columnLength"
      :default-value="columnDataDefault"
      :line-height="lineHeight"
      :keep-index="keepIndex"
      :is-immediate-init="isImmediateInit"
      @initialed="$emit('initialed')"
      @change="$_onPickerChange"
    ></md-picker-view>
  </div>
</template>

<script>
import {createProxyApiMixin} from '@mand-mobile/shared/lib/mixin/proxy'
import PickerView from '../picker/picker-view'
import pickerMixin from '../picker/mixins'
import datePickerMixin, {TYPE_FORMAT, TYPE_FORMAT_INVERSE, TYPE_METHODS} from './mixin'
import {
  transformDate,
  toArray,
  warn
} from '@mand-mobile/shared/lib/util'

export default {
  name: 'md-date-picker-view',

  mixins: [
    createProxyApiMixin({
      pickerView: [
        'getColumnContext',
        'getColumnValue',
        'getColumnValues',
        'getColumnIndex',
        'getColumnIndexs',
        'setColumnValues',
        'refresh'
      ]
    }), 
    pickerMixin,
    datePickerMixin
  ],

  components: {
    'md-picker-view': PickerView
  },

  data () {
    return {
      currentDateIns: new Date(),
      columnData: [],
      oldColumnData: null,
      columnDataDefault: [],
      columnDataGenerator: [],
    }
  },

  computed: {
    columnLength () {
      return this.columnData.length || 1
    },
    currentYear () {
      return this.currentDateIns.getFullYear()
    },
    currentMonth () {
      return this.currentDateIns.getMonth() + 1
    },
    currentDate () {
      return this.currentDateIns.getDate()
    },
    currentHours () {
      return this.currentDateIns.getHours()
    },
    currentMinutes () {
      return this.currentDateIns.getMinutes()
    },
    defaultDateIns () {
      return transformDate(this.defaultDate)
    },
    minDateIns () {
      return transformDate(this.minDate)
    },
    maxDateIns () {
      return transformDate(this.maxDate)
    }
  },

  watch: {
    defaultDate () {
      this.$_initPickerColumn()
    },
    minDate () {
      this.$_initPickerColumn()
    },
    maxDate () {
      this.$_initPickerColumn()
    }
  },

  mounted () {
    this.$_initPicker()
  },

  methods: {
    // MARK: private methods
    $_initPicker () {
      // this.$refs.pickerView.inheritPickerApi(this)
      this.$_initPickerColumn()
    },
    $_initPickerColumn () {
      this.$_resetPickerColumn()
      this.$_initColumnDataGenerator()
      this.$_initColumnData(0, this.columnDataDefault)
    },
    $_resetPickerColumn() {
      this.oldColumnData = null
      this.columnData = []
      this.columnDataDefault = []
      this.columnDataGenerator = []
    },
    $_initColumnData (columnIndex, defaultDate = [], isSetColumn = true) {
      const picker = this.$refs.pickerView
      const columnData = this.columnData
      const columnDataGenerator = this.columnDataGenerator
      for (let i = columnIndex, len = columnDataGenerator.length; i < len; i++) {
        // Collect parameters for columnDataGenerator
        const columnDataGeneratorParams = []
        const generator = columnDataGenerator[i]
        for (let j = 0; j < i; j++) {
          const _generator = columnDataGenerator[j]
          if (defaultDate[j] && _generator) {
            columnDataGeneratorParams.push({
              type: _generator.type,
              value: defaultDate[j]
            })
            continue
          }

          const itemIndex = picker.getColumnIndex(j) || 0
          /* istanbul ignore else */
          if (columnData[j]) {
            columnDataGeneratorParams.push(columnData[j][itemIndex])
          } else {
            columnDataGeneratorParams.push('')
            warn(`DatePicker columnData of index ${j} is void`)
          }
        }

        // Generator colume data with columnDataGeneratorParams
        const curColumnData = generator ? generator.apply(this, columnDataGeneratorParams) : ''
      
        // store column date
        this.$set(columnData, i, curColumnData)

        // set picker column data & refresh picker
        isSetColumn && picker.setColumnValues(i, curColumnData)
      }
      
      isSetColumn && picker.refresh(null, columnIndex)
    },
    $_initColumnDataGenerator () {
      this.$_generateYearData.type = 'Year'
      this.$_generateMonthData.type = 'Month'
      this.$_generateDateData.type = 'Date'
      this.$_generateHourData.type = 'Hour'
      this.$_generateMinuteData.type = 'Minute'
    
      const defaultDate = this.$_getDefaultDate()     
      switch (this.type) {
        case 'date':
          this.$_initColumnDataGeneratorForDate(defaultDate)
          break
        case 'time':
          this.$_initColumnDataGeneratorForTime(defaultDate)
          break
        case 'datetime':
          this.$_initColumnDataGeneratorForDate(defaultDate)
          this.$_initColumnDataGeneratorForTime(defaultDate)
          break
        default:
          this.$_initColumnDataGeneratorForCustom(defaultDate)
          break
      }
    },
    $_initColumnDataGeneratorForDate (defaultDate) {
      this.columnDataGenerator = this.columnDataGenerator.concat([
        this.$_generateYearData,
        this.$_generateMonthData,
        this.$_generateDateData
      ])

      this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([
        defaultDate.getFullYear(),
        defaultDate.getMonth() + 1,
        defaultDate.getDate()
      ]) : []
    },
    $_initColumnDataGeneratorForTime (defaultDate) {
      this.columnDataGenerator = this.columnDataGenerator.concat([
        this.$_generateHourData,
        this.$_generateMinuteData
      ])
      this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([
        defaultDate.getHours(),
        defaultDate.getMinutes()
      ]) : []
    },
    $_initColumnDataGeneratorForCustom (defaultDate) {
      this.customTypes.forEach(type => {
        type = TYPE_FORMAT[type] || type
        this.columnDataGenerator.push(this[`$_generate${type}Data`])

        if (defaultDate) {
          let value = defaultDate[TYPE_METHODS[type]]()
          
          if (type === 'Month') {
            value += 1
          }

          this.columnDataDefault.push(value)
        }
      })
    },
    $_getDefaultDate () {
      const defaultDate = this.defaultDateIns
      const minDate = this.minDateIns
      const maxDate = this.maxDateIns

      if (!defaultDate) {
        return defaultDate
      }

      if (minDate && defaultDate.getTime() < minDate.getTime()) {
        return minDate
      }

      if (maxDate && defaultDate.getTime() > maxDate.getTime()) {
        return maxDate
      }

      return defaultDate
    },
    $_getGeneratorArguments (args) {
      const defaultArguments = {
        Year: this.currentYear,
        Month: this.currentMonth,
        Date: this.currentDate,
        Hour: this.currentHours,
        Minute: this.currentMinutes
      }
      args.map(item => {
        item && (defaultArguments[item.type] = item.value)
      })
      return defaultArguments
    },
    $_generateYearData () {
      const start = this.minDateIns ? this.minDateIns.getFullYear() : this.currentYear - 20
      const end = this.maxDateIns ? this.maxDateIns.getFullYear() : this.currentYear + 20
      /* istanbul ignore if */
      if (start > end) {
        warn('MinDate Year should be earlier than MaxDate')
        return
      }
      return this.$_generateData(start, end, 'Year', this.unitText[0], 1)
    },
    $_generateMonthData () {
      const args = this.$_getGeneratorArguments(toArray(arguments))
      let start, end

      if (this.$_isDateTimeEqual(this.minDateIns, args.Year)) {
        start = this.minDateIns.getMonth() + 1
      } else {
        start = 1
      }

      if (this.$_isDateTimeEqual(this.maxDateIns, args.Year)) {
        end = this.maxDateIns.getMonth() + 1
      } else {
        end = 12
      }
      return this.$_generateData(start, end, 'Month', this.unitText[1] || '', 1, arguments)
    },
    $_generateDateData () {
      const args = this.$_getGeneratorArguments(toArray(arguments))
      
      let start, end

      if (this.$_isDateTimeEqual(this.minDateIns, args.Year, args.Month)) {
        start = this.minDateIns.getDate()
      } else {
        start = 1
      }

      if (this.$_isDateTimeEqual(this.maxDateIns, args.Year, args.Month)) {
        end = this.maxDateIns.getDate()
      } else {
        end = new Date(args.Year, args.Month, 0).getDate()
      }

      const dateData = this.$_generateData(start, end, 'Date', this.unitText[2] || '', 1, arguments)

      if (this.$_isDateTimeEqual(this.currentDateIns, args.Year, args.Month) && 
          this.currentDate >= start && this.currentDate <= end &&
          this.todayText) {
        const currentDateIndex = this.currentDate - start
        const currentDate = dateData[currentDateIndex].text
        dateData[currentDateIndex].text = this.todayText.replace('&', currentDate)
      }

      return dateData
    },
    $_generateHourData () {
      const args = this.$_getGeneratorArguments(toArray(arguments))
      let start, end

      if (this.$_isDateTimeEqual(this.minDateIns, args.Year, args.Month, args.Date)) {
        start = this.minDateIns.getHours()
      } else {
        start = 0
      }

      if (this.$_isDateTimeEqual(this.maxDateIns, args.Year, args.Month, args.Date)) {
          end = this.maxDateIns.getHours()
      } else {
        end = 23
      }

      /* istanbul ignore if */
      if (end < start) {
        end = 23
      }
      /* istanbul ignore if */
      if (start > end) {
        warn('MinDate Hour should be earlier than MaxDate')
        return
      }
  
      return this.$_generateData(start, end, 'Hour', this.unitText[3] || '', 1, arguments)
    },
    $_generateMinuteData () {
      const args = this.$_getGeneratorArguments(toArray(arguments))
      let start, end

      if (this.$_isDateTimeEqual(this.minDateIns, args.Year, args.Month, args.Date, args.Hour)) {
        start = this.minDateIns.getMinutes()
      } else {
        start = 0
      }

      if (this.$_isDateTimeEqual(this.maxDateIns, args.Year, args.Month, args.Date, args.Hour)) {
          end = this.maxDateIns.getMinutes()
      } else {
        end = 59
      }

      return this.$_generateData(start, end, 'Minute', this.unitText[4] || '', this.minuteStep, arguments)
    },
    $_generateData (from, to, type, unit, step = 1, args = []) {
      let count = from
      let text
      const data = []
      const defaultArgs = toArray(args).map(item => {
        return typeof item === 'object' ? item.value : item
      })

      while (count <= to) {
        this.textRender 
        && (text = this.textRender.apply(this, [
            TYPE_FORMAT_INVERSE[type],
            ...defaultArgs,
            count
           ]))
        data.push({
          text: text || `${count}${unit}`,
          value: count,
          typeFormat: TYPE_FORMAT_INVERSE[type] || type,
          type
        })
        count += step
      }

      return data
    },
    /**
     * Determine whether year, month, date, etc of 
     * the current date are equal to the given value
     * @params Date
     * @params year, month, date ...
     */
    $_isDateTimeEqual () {
      const methods = Object.keys(TYPE_METHODS).map(key => {
        return TYPE_METHODS[key]
      })
      const args = toArray(arguments)
      const date = args[0]

      let res = true
      if (!date) {
        return res = false
      }

      for (let i = 1; i < args.length; i++) {
        const methodName = methods[i - 1]
        const curVal = date[methodName]() + Number(methodName === 'getMonth')
        const targetVal = +args[i]

        if (curVal !== targetVal) {
          res = false
          break
        }
      }

      return res
    },

    // MARK: events handler
    $_onPickerChange (columnIndex, itemIndex, value) {
      this.$emit('change', columnIndex, itemIndex, value)

      if (columnIndex < this.columnData.length - 1) {
        this.$_initColumnData(columnIndex + 1)
      }
    },

    getFormatDate (format = 'yyyy-MM-dd hh:mm') {
      const columnValues = this.$refs.pickerView.getColumnValues()

      columnValues.forEach(item => {
        /* istanbul ignore if */
        if (!item) {
          return
        }

        let value = item.value

        if (value < 10) {
          value = '0' + value
        }
        
        format = format.replace('HH', 'hh') // deal with HH as hh
        format = format.replace(item.type, value)
        format = format.replace(TYPE_FORMAT_INVERSE[item.type], value)
      })

      return format
    }
  }
}
</script>

<style lang="stylus">
.md-date-picker
  .column-item
    font-size date-picker-font-size !important
    overflow visible !important
  // &.datetime .column-item
  //   font-size date-time-picker-font-size !important
</style>
