// import transition from './components/transition'
// import scrollView from './components/scroll-view'
import {Dom, Device} from './module'

const install = function (Vue) {
  if (!Vue || install.installed) {
    return
  }

  // Vue.component('mdTransitionPrivate', transition)
  // Vue.component('mdScrollViewPrivate', scrollView)

  Vue.prototype.$MDDom = Dom
  Vue.prototype.$MDDevice = Device
  // Vue.prototype.$MDCanvas = Canvas
}

export default {
  install
}