import DialogOptions from './dialog'
// #ifdef H5
import DialogFactory from '../../platform/web/component/dialog'
// #endif
// #ifdef MP
import DialogFactory from '../../platform/uniapp/component/dialog'
// #endif

export default DialogFactory(DialogOptions)
