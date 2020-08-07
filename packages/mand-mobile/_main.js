import '@mand-mobile/shared/lib/style/global.styl'
// import {transformCamelCase, warn} from './_util'

// example: import Button from '@mand-mobile/components/src/button'

import ActionBar from '@mand-mobile/components/src/action-bar'

import ActionSheet from '@mand-mobile/components/src/action-sheet'

import ActivityIndicator from '@mand-mobile/components/src/activity-indicator'

import Agree from '@mand-mobile/components/src/agree'

//  import Amount from '@mand-mobile/components/src/amount'

import Bill from '@mand-mobile/components/src/bill'

import Button from '@mand-mobile/components/src/button'

import Captcha from '@mand-mobile/components/src/captcha'

import Cashier from '@mand-mobile/components/src/cashier'

import CellItem from '@mand-mobile/components/src/cell-item'

import Chart from '@mand-mobile/components/src/chart'

import Check from '@mand-mobile/components/src/check'

import CheckBase from '@mand-mobile/components/src/check-base'

import CheckBox from '@mand-mobile/components/src/check-box'

import CheckGroup from '@mand-mobile/components/src/check-group'

import CheckList from '@mand-mobile/components/src/check-list'

import Codebox from '@mand-mobile/components/src/codebox'

//  import DatePicker from '@mand-mobile/components/src/date-picker'

import DetailItem from '@mand-mobile/components/src/detail-item'

import Dialog from '@mand-mobile/components/src/dialog'

import DropMenu from '@mand-mobile/components/src/drop-menu'

import Field from '@mand-mobile/components/src/field'

import FieldItem from '@mand-mobile/components/src/field-item'

import Icon from '@mand-mobile/components/src/icon'

import ImageReader from '@mand-mobile/components/src/image-reader'

import ImageViewer from '@mand-mobile/components/src/image-viewer'

import InputItem from '@mand-mobile/components/src/input-item'

import Landscape from '@mand-mobile/components/src/landscape'

import NoticeBar from '@mand-mobile/components/src/notice-bar'

import NumberKeyboard from '@mand-mobile/components/src/number-keyboard'

//  import Picker from '@mand-mobile/components/src/picker'

import Popup from '@mand-mobile/components/src/popup'

import PopupTitleBar from '@mand-mobile/components/src/popup-title-bar'

import Progress from '@mand-mobile/components/src/progress'

import Radio from '@mand-mobile/components/src/radio'

import RadioBox from '@mand-mobile/components/src/radio-box'

import RadioGroup from '@mand-mobile/components/src/radio-group'

import RadioList from '@mand-mobile/components/src/radio-list'

import ResultPage from '@mand-mobile/components/src/result-page'

import Ruler from '@mand-mobile/components/src/ruler'

//  import ScrollView from '@mand-mobile/components/src/scroll-view'

//  import ScrollViewMore from '@mand-mobile/components/src/scroll-view-more'

//  import ScrollViewRefresh from '@mand-mobile/components/src/scroll-view-refresh'

//  import Selector from '@mand-mobile/components/src/selector'

import Skeleton from '@mand-mobile/components/src/skeleton'

import Slider from '@mand-mobile/components/src/slider'

import Stepper from '@mand-mobile/components/src/stepper'

import Steps from '@mand-mobile/components/src/steps'

import Swiper from '@mand-mobile/components/src/swiper'

import SwiperItem from '@mand-mobile/components/src/swiper-item'

import Switch from '@mand-mobile/components/src/switch'

//  import TabBar from '@mand-mobile/components/src/tab-bar'

import TabPane from '@mand-mobile/components/src/tab-pane'

//  import TabPicker from '@mand-mobile/components/src/tab-picker'

//  import Tabs from '@mand-mobile/components/src/tabs'

import Tag from '@mand-mobile/components/src/tag'

import TextareaItem from '@mand-mobile/components/src/textarea-item'

import Tip from '@mand-mobile/components/src/tip'

import Toast from '@mand-mobile/components/src/toast'

import Transition from '@mand-mobile/components/src/transition'

import WaterMark from '@mand-mobile/components/src/water-mark'

warn(
  'You are using a whole package of mand-mobile, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  'warn',
)

/* global MAN_VERSION */
const version = /* @echo MAN_VERSION */ MAN_VERSION

/**
 * example const components = {
 *    Button,
 *    Icon,
 * }
 */
export const components = {
  ActionBar,

  ActionSheet,

  ActivityIndicator,

  Agree,

  // Amount,

  Bill,

  Button,

  Captcha,

  Cashier,

  CellItem,

  Chart,

  Check,

  CheckBase,

  CheckBox,

  CheckGroup,

  CheckList,

  Codebox,

  // DatePicker,

  DetailItem,

  Dialog,

  DropMenu,

  Field,

  FieldItem,

  Icon,

  ImageReader,

  ImageViewer,

  InputItem,

  Landscape,

  NoticeBar,

  NumberKeyboard,

  // Picker,

  Popup,

  PopupTitleBar,

  Progress,

  Radio,

  RadioBox,

  RadioGroup,

  RadioList,

  ResultPage,

  Ruler,

  // ScrollView,

  // ScrollViewMore,

  // ScrollViewRefresh,

  // Selector,

  Skeleton,

  Slider,

  Stepper,

  Steps,

  Swiper,

  SwiperItem,

  Switch,

  // TabBar,

  TabPane,

  // TabPicker,

  // Tabs,

  Tag,

  TextareaItem,

  Tip,

  Toast,

  Transition,

  WaterMark,
}

// Define plugin installation method
const install = function(Vue) {
  if (!Vue || install.installed) {
    return
  }

  // Register global components
  const componentsNames = Object.keys(components)
  componentsNames.forEach(name => {
    const component = components[name]
    if (component.name) {
      Vue.component(component.name, component) // kebab-case
      Vue.component(transformCamelCase(`-${component.name}`), component) // PascalCase
    }
  })

  // Mount to prototype
  // @fixme 为全局注入单例模式的相关组件
  // Vue.prototype.$toast = Toast
  // Vue.prototype.$dialog = Dialog
  // Vue.prototype.$actionsheet = ActionSheet
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/**
 * @example
 * export {
    install,
    version,
    Button,
    Icon,
  }
 */
export {
  install,
  version,
  ActionBar,
  ActionSheet,
  ActivityIndicator,
  Agree,
  // Amount,

  Bill,
  Button,
  Captcha,
  Cashier,
  CellItem,
  Chart,
  Check,
  CheckBase,
  CheckBox,
  CheckGroup,
  CheckList,
  Codebox,
  // DatePicker,

  DetailItem,
  Dialog,
  DropMenu,
  Field,
  FieldItem,
  Icon,
  ImageReader,
  ImageViewer,
  InputItem,
  Landscape,
  NoticeBar,
  NumberKeyboard,
  // Picker,

  Popup,
  PopupTitleBar,
  Progress,
  Radio,
  RadioBox,
  RadioGroup,
  RadioList,
  ResultPage,
  Ruler,
  // ScrollView,

  // ScrollViewMore,

  // ScrollViewRefresh,

  // Selector,

  Skeleton,
  Slider,
  Stepper,
  Steps,
  Swiper,
  SwiperItem,
  Switch,
  // TabBar,

  TabPane,
  // TabPicker,

  // Tabs,

  Tag,
  TextareaItem,
  Tip,
  Toast,
  Transition,
  WaterMark,
}

/**
 * @example
 * export default {
    install,
    version,
    Button,
    Icon,
  }
 */
export default {
  install,
  version,

  ActionBar,

  ActionSheet,

  ActivityIndicator,

  Agree,

  // Amount,

  Bill,

  Button,

  Captcha,

  Cashier,

  CellItem,

  Chart,

  Check,

  CheckBase,

  CheckBox,

  CheckGroup,

  CheckList,

  Codebox,

  // DatePicker,

  DetailItem,

  Dialog,

  DropMenu,

  Field,

  FieldItem,

  Icon,

  ImageReader,

  ImageViewer,

  InputItem,

  Landscape,

  NoticeBar,

  NumberKeyboard,

  // Picker,

  Popup,

  PopupTitleBar,

  Progress,

  Radio,

  RadioBox,

  RadioGroup,

  RadioList,

  ResultPage,

  Ruler,

  // ScrollView,

  // ScrollViewMore,

  // ScrollViewRefresh,

  // Selector,

  Skeleton,

  Slider,

  Stepper,

  Steps,

  Swiper,

  SwiperItem,

  Switch,

  // TabBar,

  TabPane,

  // TabPicker,

  // Tabs,

  Tag,

  TextareaItem,

  Tip,

  Toast,

  Transition,

  WaterMark,
}
