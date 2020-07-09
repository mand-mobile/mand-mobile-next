import { toObject } from '@mand-mobile/shared/lib/util'

// yyyy-MM-dd hh:mm:ss => Year-Month-Date Hour:Minute
export const TYPE_FORMAT = {
  'yyyy': 'Year',
  'MM': 'Month',
  'dd': 'Date',
  'HH': 'Hour',
  'hh': 'Hour',
  'mm': 'Minute'
}

export const TYPE_FORMAT_INVERSE = toObject(
  Object.keys(TYPE_FORMAT).map(item => {
    return {
      [TYPE_FORMAT[item]]: item
    }
  })
)

export const TYPE_METHODS = {
  'Year': 'getFullYear',
  'Month': 'getMonth',
  'Date': 'getDate',
  'Hour': 'getHours',
  'Minute': 'getMinutes'
}

export default {
  props: {
    type: { // date, time, datetime， custom
      type: String,
      default: 'date'
    },
    customTypes: { // yyyy, MM, dd, hh, mm
      type: Array,
      default () {
        return []
      },
      validator (val) {
        let res = true
        val.forEach(type => {
          type = TYPE_FORMAT[type] || type
          /* istanbul ignore if */
          if (!(type in TYPE_METHODS)) {
            return (res = false)
          }
        })
        return res
      }
    },
    minDate: {
      type: [Date, String]
    },
    maxDate: {
      type: [Date, String]
    },
    defaultDate: {
      type: [Date, String]
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    unitText: {
      type: Array,
      default () {
        return ['年', '月', '日', '时', '分']
      }
    },
    todayText: {
      type: String,
      default: ''
    },
    textRender: {
      type: [Function, String],
      default: ''
    },
  }
}